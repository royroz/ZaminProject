using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;
using Music4Biz.Enums;
using Music4Biz.Models;
using Muzisc4Biz.Enums;
using Muzisc4Biz.Helpers;
using Muzisc4Biz.Models;

namespace Music4Biz.Web.Controllers
{
    public class LicensesController : BaseController
    {
        // GET: Licenses
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AddLicense(int id)
        {
            return View();
        }

        [HttpPost]
        public JsonResult LicensePayment(int clientId, decimal price, LicenseTypes? licenseType, DateTime? startDate, DateTime? endDate, int businessSizeId, string comments, string nickname)
        {
            var client = UOW.ClientsRepository.GetClient(clientId);
            if (client == null || (client.TranzilaToken == null && price > 0)) return Json(false);

            var licenseName = CreateLicenseName(client);
            if (!startDate.HasValue)
            {
                startDate = DateTime.Now;
            }
            if (!endDate.HasValue)
            {
                endDate = startDate.Value.AddYears(1);
            }
            if (!licenseType.HasValue)
            {
                licenseType = LicenseTypes.Online;
            }
            var success = false;
            if (price == 0)
            {
                success = UOW.ClientsRepository.AddLicenseToClient(clientId, licenseType.Value, startDate.Value, endDate.Value, businessSizeId, price, licenseName, comments, nickname);
            }
            //else
            //{
            //    success = UOW.ClientsRepository.PayWithToken(clientId, price);
            //    UOW.ClientsRepository.AddPaymentForLicense(clientId, licenseType.Value, price, PaymentType.CreditCard);
            //    if (success)
            //    {
            //        success = UOW.ClientsRepository.AddLicenseToClient(clientId, licenseType.Value, startDate.Value, endDate.Value, businessSizeId, price, licenseName, comments, nickname);
            //        if (success)
            //        {
            //            EmailHelper.SendNewLicenseEmail(client.FullName, licenseName, client.LicensePassword, client.Email);
            //        }
            //    }

            //}

            return Json(success);
        }

        [HttpPost]
        public JsonResult PurchaseLicensePaymentRequest(decimal sum, int userId)
        {
            var userCode = Guid.NewGuid().ToString();
            var paymentRequest = new PaymentRequest()
            {
                UserId = userId,
                Price = sum,
                Active = true,
                Added = DateTime.Now,
                LicensePurchaseAction = LicensePurchaseEnum.New,
                Guid = userCode
            };

            var success = UOW.LicenceRepository.AddPaymanetRequest(paymentRequest);

            return new JsonResult()
            {
                Data = new
                {
                    success,
                    userCode
                }
            };
        }

        [HttpPost]
        public JsonResult LicenseCheckPayment(int clientId, decimal price, LicenseTypes? licenseType, DateTime? startDate, DateTime? endDate, List<Check> checks, int businessSizeId, string comments, string nickname)
        {
            var success = UOW.ClientsRepository.AddChecks(clientId, checks, PaymentFor.License);
            var totalPrice = checks.Sum(c => c.Sum);

            if (!startDate.HasValue)
            {
                startDate = DateTime.Now;
            }
            if (!endDate.HasValue)
            {
                endDate = startDate.Value.AddYears(1);
            }
            if (!licenseType.HasValue)
            {
                licenseType = LicenseTypes.Online;
            }
            UOW.ClientsRepository.AddPaymentForLicense(clientId, licenseType.Value, totalPrice, PaymentType.Check);

            var client = UOW.ClientsRepository.GetClient(clientId);
            if (client == null) return Json(false);

            var licenseName = CreateLicenseName(client);

            if (success)
            {
                success = UOW.ClientsRepository.AddLicenseToClient(clientId, licenseType.Value, startDate.Value, endDate.Value, businessSizeId, price, licenseName, comments, nickname);
                if (success)
                {
                    EmailHelper.SendNewLicenseEmail(client.FullName, licenseName, client.LicensePassword, client.Email);
                }
            }
            return Json(success);
        }


        public JsonResult GetLicensePrices()
        {
            var prices = UOW.LicenceRepository.GetLicensePrices();
            return Json(prices, JsonRequestBehavior.AllowGet);
        }

        private string CreateLicenseName(User user)
        {
            var numberOfLicenses = user.Licenses.Count;
            var licenseName = user.Id.ToString();
            while (licenseName.Length < 6)
            {
                licenseName = "0" + licenseName;
            }
            licenseName = "L" + licenseName + "-" + numberOfLicenses;
            return licenseName;
        }

        public JsonResult RenewLicense(int licenseId)
        {
            var client = UOW.UserRepository.GetUser(User.Identity.Name);
            var license = UOW.LicenceRepository.GetLicense(licenseId);
            if (license == null || client == null) return Json(false);
            var success = UOW.ClientsRepository.PayWithToken(client.Id, license.PriceList.Price);

            if (success)
            {
                UOW.ClientsRepository.AddPaymentForLicense(client.Id, license.LicenseType, license.PriceList.Price, PaymentType.CreditCard);
                success = UOW.LicenceRepository.RenewLicense(licenseId);
            }
            return Json(success);
        }

        [AllowAnonymous]
        public JsonResult LicenseExpirationReminderMail(string key)
        {
            if (key != Consts.GlobalConsts.LicenseExpirationMailKey) return Json(false, JsonRequestBehavior.AllowGet); ;
            var licenses = UOW.LicenceRepository.GetLicenseAboutToExpire();
            var success = UOW.EmailRepository.SendLicenseExpirationReminderEmail(licenses);
            return Json(success, JsonRequestBehavior.AllowGet);
        }
    }
}