using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using MailChimp.Types;
using Music4Biz.Consts;
using Music4Biz.Enums;
using Music4Biz.SalesForceDal;
using Muzisc4Biz.Enums;
using Muzisc4Biz.Helpers;

namespace Music4Biz.Web.Controllers
{
    public class TranzilaController : BaseController
    {
        public void PaymentCallBack(string code, decimal sum, string response, int? priceListItem, string comments, string nickname, string licenseStart, string licenseEnd, string diskOnKey)
        {
            if (response != "000") return;

            var VATstr = Consts.GlobalConsts.VAT;

            var VAT = decimal.Parse(VATstr);


            var paymentRequest = UOW.LicenceRepository.GetPaymentRequestByGuid(code);
            if (paymentRequest == null) return;

            var success = false;
            var user = paymentRequest.User;
            user.DiskOnKey = diskOnKey == "true";

            if (sum != paymentRequest.Price * VAT) return;

            if (paymentRequest.LicensePurchaseAction == LicensePurchaseEnum.New && priceListItem.HasValue)
            {

                var password = user.LicensePassword;

                var numberOfLicenses = user.Licenses.Count;
                var licenseName = paymentRequest.User.Id.ToString();
                while (licenseName.Length < 6)
                {
                    licenseName = "0" + licenseName;
                }
                licenseName = "L" + licenseName + "-" + numberOfLicenses;
                var licenseId = UOW.LicenceRepository.CreateLicense(paymentRequest.UserId, licenseName, password, sum, priceListItem.Value, comments, nickname, licenseStart, licenseEnd);
                success = licenseId != -1;
                if (success)
                {
                    UOW.LicenceRepository.AddPayment(sum, user.Id, priceListItem.Value, licenseId);
                    EmailHelper.SendNewLicenseEmail(user.FullName, licenseName, password, user.Email);
                }
            }
            else if (paymentRequest.LicensePurchaseAction == LicensePurchaseEnum.Renew && paymentRequest.LicenseId.HasValue)
            {
                success = UOW.LicenceRepository.RenewLicense(paymentRequest.LicenseId.Value);
            }
            else if (paymentRequest.LicensePurchaseAction == LicensePurchaseEnum.Extend && paymentRequest.LicenseId.HasValue)
            {
                success = UOW.LicenceRepository.ExtendLicense(paymentRequest.LicenseId.Value);
            }

            if (success)
            {
                paymentRequest.Active = false;
                UOW.Save();
            }

        }


        public void ClientTokenCallBack(int clientId, string response, string ConfirmationCode, int expyear, int expmonth, string ccno, string TranzilaTK, int cardtype, int? licenseType, DateTime? licenseStart, DateTime? licenseEnd, int? serviceId, decimal price, int? businessSize, string nickname, string comments)
        {
            if (response != "000") return;
            var token = TranzilaTK.Replace(" ", "");
            var success = UOW.ClientsRepository.AddTokenToClient(clientId, expyear, expmonth, ccno, token, cardtype);
            if (price == -1 && businessSize.HasValue)
            {
                var priceListItem = UOW.LicenceRepository.GetPriceList(businessSize.Value);
                if (priceListItem == null) return;
                price = priceListItem.Price;
            }
            else if (price == -1 && !businessSize.HasValue)
            {
                return;
            }

            if (success)
            {
                success = UOW.ClientsRepository.PayWithToken(clientId, price);
                if (success)
                {
                    UOW.ClientsRepository.AddPaymentForLicense(clientId, LicenseTypes.Online, price, PaymentType.CreditCard);
                    if (serviceId.HasValue)
                    {
                        success = UOW.ClientsRepository.AddServiceToClient(clientId, serviceId.Value, price);
                    }
                    else if (businessSize.HasValue)
                    {
                        if (!licenseStart.HasValue)
                        {
                            licenseStart = DateTime.Now;
                        }
                        if (!licenseEnd.HasValue)
                        {
                            licenseEnd = licenseStart.Value.AddYears(1);
                        }
                        var user = UOW.UserRepository.GetUser(clientId);
                        var numberOfLicenses = user.Licenses.Count;
                        var licenseName = user.Id.ToString();
                        while (licenseName.Length < 6)
                        {
                            licenseName = "0" + licenseName;
                        }
                        licenseName = "L" + licenseName + "-" + numberOfLicenses;

                        success = UOW.ClientsRepository.AddLicenseToClient(clientId, LicenseTypes.Online, licenseStart.Value, licenseEnd.Value, businessSize.Value, price, licenseName, comments, nickname);
                        if (success)
                        {
                            EmailHelper.SendNewLicenseEmail(user.FullName, licenseName, user.LicensePassword, user.Email);
                        }
                    }
                }
            }
        }

        public RedirectResult TranzilaSuccess()
        {
            return Redirect("http://localhost:10629/Partials/tranzilaSuccessPage.html");
        }


        public RedirectResult TranzilaFailure()
        {
            return Redirect("http://localhost:10629/Partials/tranzilaFailurePage.html");
        }
        public ActionResult TranzilaSuccessPage()
        {
            return View();
        }
        public ActionResult TranzilaFailurePage()
        {
            return View();
        }
        private string GenerateLicenseName()
        {
            var licenseName = "";
            Random rnd = new Random();
            for (var i = 0; i < 4; i++)
            {
                var number = rnd.Next(0, 9);
                licenseName = licenseName + number.ToString();
            }

            licenseName = licenseName + "-";

            string st = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            for (var i = 0; i < 4; i++)
            {
                var letter = st[rnd.Next(0, st.Length)];
                licenseName = licenseName + letter;
            }
            return licenseName;
        }
    }
}