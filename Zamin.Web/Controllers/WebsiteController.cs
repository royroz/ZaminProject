using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Configuration;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.Security;
using System.Web.UI.WebControls;
using System.Web.WebPages;
using Amazon.CloudFormation.Model;
using Amazon.EC2;
using MailChimp.Types;
using Microsoft.Ajax.Utilities;
using Music4Biz.Consts;
using Music4Biz.Enums;
using Music4Biz.Models;
using Music4Biz.Repositories.CfMembership;
using Music4Biz.SalesForceDal;
using Music4Biz.Web.Models;
using Music4Biz.WebModels;
using Muzisc4Biz.Enums;
using Muzisc4Biz.Models;
using Muzisc4Biz.Models.SalesForce;
using Muzisc4Biz.WebModels;
using Muzisc4Biz.WebModels.Clients;
using Muzisc4Biz.WebModels.WebSite;
using SalesforceSharp;

namespace Music4Biz.Web.Controllers
{
    public class WebsiteController : BaseController
    {

        [System.Web.Mvc.HttpGet]
        public JsonResult GetPortfolios()
        {
            var portfolios = UOW.WebsiteRepository.GetAllActivePortfolios();
            var data = portfolios.Select(AutoMapper.Mapper.Map<PortfolioItem, PortfolioItemWebModel>).ToList();
            return Json(data, JsonRequestBehavior.AllowGet);

        }

        [System.Web.Mvc.HttpGet]
        public JsonResult GetPriceList()
        {
            var priceList = UOW.WebsiteRepository.GetPriceList();
            return Json(priceList, JsonRequestBehavior.AllowGet);
        }


        //------------------------------------------login, signup functions-------------------------------------
        [System.Web.Http.HttpGet]
        public JsonResult IsLogedIn()
        {
            var isLogedIn = false;
            var userName = "";

            if (User.Identity.IsAuthenticated)
            {
                isLogedIn = true;
                var user = UOW.UserRepository.GetUser(User.Identity.Name);
                if (user == null) isLogedIn = false;
                else userName = user.Username;
            }

            return new JsonResult()
            {
                Data = new
                {
                    isLogedIn = isLogedIn,
                    userName = userName
                },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };

        }

        public JsonResult Login(string userName, string password, bool rememberMe = true)
        {
            var cfMembershipProvider = new CodeFirstMembershipProvider();

            if (cfMembershipProvider.ValidateUser(userName, password))
            {
                FormsAuthentication.SetAuthCookie(userName, rememberMe);
                var user = UOW.UserRepository.GetUser(userName);
                if (user != null)
                {
                    return new JsonResult()
                    {
                        Data = new
                        {
                            success = true,
                            userName = user.Username
                        }
                    };
                }

            }

            return new JsonResult()
            {
                Data = new
                {
                    success = false,
                }
            };
        }

        public void Logout()
        {
            FormsAuthentication.SignOut();
        }

        public JsonResult ForgotPassword(string email, string location)
        {

            if (!UOW.UserRepository.IsEmailExists(email)) return null;

            var passwordResetCode = UOW.UserRepository.SetPasswordResetCodeToUser(email);
            var link = location + "#/resetPassword/" + passwordResetCode;

            var mandDrillApi = new MailChimp.MandrillApi(GlobalConsts.MandrilApiKey);
            var globalVerbs = new Mandrill.NameContentList<string>();
            globalVerbs.Add("RESETPASSWORDLINK", link);

            var message = new Mandrill.Messages.Message() { GlobalMergeVars = globalVerbs };
            message.To = new Mandrill.Messages.Recipient[1];
            message.To[0] = new Mandrill.Messages.Recipient(email, string.Empty);
            try
            {
                var result =
                    mandDrillApi.SendTemplate(MandrilTemlatesNames.ResetPassword, globalVerbs, message, false).First();
            }
            catch (Exception e)
            {
                return null;
            }
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ResetUserPassword(string resetCode, string password)
        {
            bool success = UOW.UserRepository.ResetUserPassword(resetCode, password);
            return Json(success);
        }

        [System.Web.Http.HttpGet]
        public JsonResult CheckIfResetCodeExists(string resetCode)
        {
            string result = UOW.UserRepository.CheckIfResetCodeExists(resetCode);

            return new JsonResult()
            {
                Data = new
                {
                    codeExists = result
                },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet

            };

        }
        public JsonResult SignUp(SignUpWebModel signUpWebModel)
        {
            var isUserExists = UOW.UserRepository.CheckIfUserNameExists(signUpWebModel.Email);
            if (isUserExists)
            {
                return new JsonResult()
                {
                    Data = new
                    {
                        message = "user name exists"
                    }
                };
            }

            var isBusinessNumberExist = UOW.UserRepository.CheckIfBusinessNumberExists(signUpWebModel.BusinessNumber);
            if (isBusinessNumberExist)
            {
                return new JsonResult()
                {
                    Data = new
                    {
                        message = "business number exists"
                    }
                };
            }

            var licensePassword = Membership.GeneratePassword(8, 0);
            Random rnd = new Random();
            licensePassword = Regex.Replace(licensePassword, @"[^a-zA-Z0-9]", m => rnd.Next(0, 9).ToString());

            var clientRole = UOW.UserRepository.GetClientRole();
            var user = new User()
            {
                Username = signUpWebModel.Email,
                BusinessName = signUpWebModel.BusinessName,
                BusinessNumber = signUpWebModel.BusinessNumber,
                CellPhone = signUpWebModel.CellPhone,
                Password = Crypto.HashPassword(signUpWebModel.Password),
                FirstName = signUpWebModel.FullName,
                Email = signUpWebModel.Email,
                Phone = signUpWebModel.Phone,
                LicensePassword = licensePassword,
                IsApproved = true,
                Address = signUpWebModel.Address
            };

            UOW.UserRepository.AddOrUpdateUser(user);
            user.Roles.Add(clientRole);
            UOW.Save();
            FormsAuthentication.SetAuthCookie(signUpWebModel.Email, true);

            //create payment request
            
            var paymanetRequest = new PaymentRequest
            {
                Price = signUpWebModel.PriceListItem.Price,
                Guid = Guid.NewGuid().ToString(),
                UserId = user.Id,
                LicenseId = null,
                LicensePurchaseAction = LicensePurchaseEnum.New,
                Active = true,
                Added = DateTime.Now,
            };

            UOW.LicenceRepository.AddPaymanetRequest(paymanetRequest);

            return new JsonResult()
            {
                Data = new
                {
                    message = true,
                    userName = signUpWebModel.Email
                }
            };
        }


        //------------------------------------------licenses functions-------------------------------------
        [System.Web.Http.Authorize]
        [System.Web.Http.HttpGet]
        public JsonResult GetUserLicensesData()
        {
            var user = UOW.UserRepository.GetUser(User.Identity.Name);
            if (user == null) return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                var licenses = UOW.LicenceRepository.GetUsersLicenses(user.Id);
                foreach (var license in licenses)
                {
                    if (license.EndDate < DateTime.Now)
                    {
                        license.Active = false;
                    }
                }
                var licensesWeb = licenses.Select(AutoMapper.Mapper.Map<License, LicenseWebModel>);

                return Json(licensesWeb, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult ExtendLicenseRequest(int priceListId, int licenseId)
        {
            var user = UOW.UserRepository.GetUser(User.Identity.Name);

            if (user == null) return new JsonResult()
            {
                Data = new
                {
                    message = false
                }
            };
            var priceListItem = UOW.LicenceRepository.GetPriceList(priceListId);
            if (priceListItem == null) return Json(false);

            var paymanetRequest = new PaymentRequest
            {
                Price = priceListItem.Price,
                Guid = Guid.NewGuid().ToString(),
                UserId = user.Id,
                LicenseId = licenseId,
                LicensePurchaseAction = LicensePurchaseEnum.Extend,
                Active = true,
                Added = DateTime.Now,
            };

            var success = UOW.LicenceRepository.AddPaymanetRequest(paymanetRequest);

            return new JsonResult()
            {
                Data = new
                {
                    success = success,
                    sum = priceListItem.Price
                }
            };
        }


        public JsonResult PurchaseLicenseRequest(int priceListId, bool renew, int? licenseId)
        {
            var user = UOW.UserRepository.GetUser(User.Identity.Name);

            if (user == null) return new JsonResult()
            {
                Data = new
                {
                    message = false
                }
            };

            var priceListItem = UOW.LicenceRepository.GetPriceList(priceListId);
            if (priceListItem == null) return Json(false);

            var actionType = LicensePurchaseEnum.New;
            if (renew)
            {
                actionType = LicensePurchaseEnum.Renew;
            }

            var paymanetRequest = new PaymentRequest
            {
                Price = priceListItem.Price,
                Guid = Guid.NewGuid().ToString(),
                UserId = user.Id,
                LicenseId = licenseId,
                LicensePurchaseAction = actionType,
                Active = true,
                Added = DateTime.Now,
            };

            var success = UOW.LicenceRepository.AddPaymanetRequest(paymanetRequest);

            return new JsonResult()
            {
                Data = new
                {
                    success = success,
                    sum = priceListItem.Price
                }
            };

        }



        //------------------------------------------other functions-------------------------------------
        [System.Web.Http.HttpGet]
        public JsonResult GetSongsFromBucket()
        {
            var songs = new List<List<SongWebModel>>();
            songs.Add(Helpers.S3Helper.GetSongsFromS3ByFolder(WebsiteConsts.WebsiteBucketName, WebsiteConsts.WebsitePlayerGenre1));
            songs.Add(Helpers.S3Helper.GetSongsFromS3ByFolder(WebsiteConsts.WebsiteBucketName, WebsiteConsts.WebsitePlayerGenre2));
            songs.Add(Helpers.S3Helper.GetSongsFromS3ByFolder(WebsiteConsts.WebsiteBucketName, WebsiteConsts.WebsitePlayerGenre3));
            songs.Add(Helpers.S3Helper.GetSongsFromS3ByFolder(WebsiteConsts.WebsiteBucketName, WebsiteConsts.WebsitePlayerGenre4));
            songs.Add(Helpers.S3Helper.GetSongsFromS3ByFolder(WebsiteConsts.WebsiteBucketName, WebsiteConsts.WebsitePlayerGenre5));
            songs.Add(Helpers.S3Helper.GetSongsFromS3ByFolder(WebsiteConsts.WebsiteBucketName, WebsiteConsts.WebsitePlayerGenre6));
            songs.Add(Helpers.S3Helper.GetSongsFromS3ByFolder(WebsiteConsts.WebsiteBucketName, WebsiteConsts.WebsitePlayerGenre7));


            var json = new JsonResult()
            {
                Data = new
                {
                    songs
                },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet

            };

            return json;
        }

        [System.Web.Http.HttpPost]
        public JsonResult ContactUs(string name, string email, string text)
        {
            if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(email))
            {
                return Json(false);
            }
            var status = UOW.LeadRepository.CreateLead(name, email, text);
            return Json(status.Success);
        }

        [System.Web.Http.HttpGet]
        public JsonResult GetUserCode()
        {

            var jsonFalse = new JsonResult()
            {
                Data = new
                {
                    success = false
                },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };

            var user = UOW.UserRepository.GetUser(User.Identity.Name);
            if (user == null) return jsonFalse;
            var paymentRequest = UOW.LicenceRepository.GetUserPaymentRequest(user);
            if (paymentRequest == null) return jsonFalse;

            return new JsonResult()
            {
                Data = new
                {
                    success = true,
                    userCode = paymentRequest.Guid,
                    email = user.Email,
                    company = user.BusinessName
                },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        [System.Web.Http.HttpGet]
        public JsonResult GetCurrentUser()
        {
            var jsonFalse = new JsonResult()
            {
                Data = new
                {
                    success = false
                },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
            var user = UOW.UserRepository.GetUser(User.Identity.Name);
            var userWebModel = AutoMapper.Mapper.Map<User, ClientIndexWebModel>(user);
            if (user == null) return jsonFalse;
            return new JsonResult()
            {
                Data = new
                {
                    success = true,
                    user = userWebModel
                },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        //public static decimal CalculatePackagePriceRatio(SalesForceLicense salesForceLicense, SalesForcePackage newSalSalesForcePackage)
        //{
        //    var montheLeftForLicense = (salesForceLicense.Expiration.Value.Year - DateTime.Now.Year) * 12 +
        //        salesForceLicense.Expiration.Value.Month - DateTime.Now.Month;
        //    if (montheLeftForLicense < 0) montheLeftForLicense = 0;

        //    var oldPackagePriceForMonth = salesForceLicense.SalesForcePackage.Price__c / 12;

        //    var newPackagePriceForMonth = newSalSalesForcePackage.Price__c / 12;

        //    var priceRatio = (newPackagePriceForMonth - oldPackagePriceForMonth) * montheLeftForLicense;
        //    return Math.Floor(priceRatio);
        //}

        //public static bool CanUserGetTrial(User user)
        //{
        //    var dal = new SalesForceData();
        //    var client = dal.Authenticate();


        //    var licenses = dal.GetSalesForceLicensesWithPackagesAndAccount(client);

        //    var result = licenses.All(l => l.Account__c != user.SalesForceId);

        //    return result;

        //}

        //public static bool GetTrialLicenseForUser(User user, SalesForceData dal, SalesforceClient client)
        //{
        //    var licenseName = user.Id.ToString();
        //    while (licenseName.Length < 6)
        //    {
        //        licenseName = "0" + licenseName;
        //    }
        //    licenseName = "L" + licenseName + "-1";

        //    if (!CanUserGetTrial(user)) return false;
        //    var password = Membership.GeneratePassword(8, 1);

        //    var account = dal.GetSalesForceAccounts(client).FirstOrDefault(a => a.Id == user.SalesForceId);
        //    var result = dal.CreateSalesForceLicense(licenseName, password, licenseName, user.SalesForceId,
        //        PackagesConsts.TrialPackage);
        //    if (result)
        //    {
        //        //send confirmation mail
        //        var mandDrillApi = new MailChimp.MandrillApi(GlobalConsts.MandrilApiKey);
        //        var globalVerbs = new Mandrill.NameContentList<string>();
        //        globalVerbs.Add("accountUsername", account.User_Name__c ?? string.Empty);
        //        globalVerbs.Add("username", licenseName);
        //        globalVerbs.Add("password", password);
        //        globalVerbs.Add("fromDate", DateTime.Now.Date.ToString("dd/MM/yyyy"));
        //        globalVerbs.Add("toDate", DateTime.Now.AddYears(1).Date.ToString("dd/MM/yyyy"));
        //        var message = new Mandrill.Messages.Message() { GlobalMergeVars = globalVerbs };
        //        message.To = new Mandrill.Messages.Recipient[1];
        //        message.To[0] = new Mandrill.Messages.Recipient(user.Email, string.Empty);
        //        try
        //        {
        //            mandDrillApi.SendTemplate(MandrilTemlatesNames.PurchaseLicense, globalVerbs, message, false).First();
        //        }
        //        catch (Exception e) { }
        //    }

        //    return result;
        //}


    }
}
