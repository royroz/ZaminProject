using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Amazon.IdentityManagement.Model;
using Amazon.Route53Domains;
using CsvHelper;
using CsvHelper.Configuration;
using MailChimp.Types;
using Microsoft.Ajax.Utilities;
using Music4Biz.Models;
using Music4Biz.Repositories.CfMembership;
using Muzisc4Biz.Enums;
using Muzisc4Biz.Helpers;
using Muzisc4Biz.Models;
using Muzisc4Biz.WebModels.Clients;
using OperationStatus = Music4Biz.Models.OperationStatus;
using User = Music4Biz.Models.User;

namespace Music4Biz.Web.Controllers
{
    [Authorize]
    public class ClientsController : BaseController
    {

        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetAllClients()
        {
            var clients = UOW.ClientsRepository.GetAllClients();
            var data = clients.Select(AutoMapper.Mapper.Map<User, ClientIndexWebModel>).ToList();
            foreach (var license in data.SelectMany(item => item.Licenses))
            {
                license.LicensePriceListName = UOW.LicenceRepository.GetPriceListName(license.PriceListId);
            }
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteClient(int clientId)
        {
            var success = UOW.ClientsRepository.DeleteClient(clientId);
            return Json(success);
        }

        [HttpGet]
        public JsonResult GetClient(int clientId)
        {
            var client = UOW.ClientsRepository.GetClient(clientId);
            var data = AutoMapper.Mapper.Map<User, ClientIndexWebModel>(client);
            foreach (var license in data.Licenses)
            {
                license.LicensePriceListName = UOW.LicenceRepository.GetPriceListName(license.PriceListId);
            }
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Update(int? id)
        {
            return View();
        }
        public ActionResult Details(int id)
        {
            return View();
        }


        [HttpPost]
        public JsonResult Update(ClientIndexWebModel model)
        {
            var user = AutoMapper.Mapper.Map<ClientIndexWebModel, User>(model);
           var status = new OperationStatus() { Success = false };
            var licensePassword = Membership.GeneratePassword(8, 0);
            Random rnd = new Random();
            licensePassword = Regex.Replace(licensePassword, @"[^a-zA-Z0-9]", m => rnd.Next(0, 9).ToString());
            //create
            if (model.Id == 0)
            {
                if (UOW.UserRepository.CheckIfUserNameExists(model.Email))
                {
                    return new JsonResult()
                    {
                        Data = new
                        {
                            success = false,
                            emailExists = true
                        }
                    };
                }

                var clientRole = UOW.UserRepository.GetClientRole();
                user.Username = model.Email;
                user.Password = Crypto.HashPassword(model.Password);
                user.CreateDate = DateTime.Now;
                user.IsApproved = true;
                user.Roles.Add(clientRole);
                user.LicensePassword = licensePassword;

            }
            ///edit
            else
            {
                user.Id = model.Id;
            }

            status = UOW.UserRepository.AddOrUpdateUser(user);
            if (status.Success)
            {
                SetSuccessMessage();
            }
            else
            {
                SetErrorMessage();
            }

            return new JsonResult()
            {
                Data = new
                {
                    success = status.Success,
                    emailExists = false
                }
            };
        }
        [ValidateInput(false)] 
        public JsonResult EmailLicensesToClient(int clientId, string licenseHtmlTable)
        {
            var client = UOW.ClientsRepository.GetClient(clientId);

            var success = EmailHelper.SendClientLicensesEmail(licenseHtmlTable, client.Email, client.FullName);
            if (success)
            {
                SetSuccessMessage("המייל נשלח בהצלחה");
            }
            else
            {
                SetErrorMessage("אירעה שגיאה");
            }

            return Json(success);
            
        }

        public FileResult ExportClientsToCsv(ClientsFilter filter)
        {
            var clients = UOW.ClientsRepository.GetClientsByFilter(filter);
            var clientsWebModel = clients.Select(AutoMapper.Mapper.Map<User, ClientCsvModel>).ToList();

            var stream = new MemoryStream();
            var writer = new StreamWriter(stream, Encoding.UTF8);
            var csvConfig = new CsvConfiguration { Encoding = Encoding.UTF8 };
            var csv = new CsvWriter(writer, csvConfig);

            csv.WriteRecords(clientsWebModel);

            writer.Flush();
            stream.Position = 0;
            var fileName = "Clients.csv";
            return File(stream, "text/csv", fileName);
        }
    }
}