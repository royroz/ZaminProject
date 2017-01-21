using Music4Biz.SalesForceDal;
using Muzisc4Biz.Models;
using Muzisc4Biz.Models.SalesForce;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using Music4Biz.Enums;

namespace Music4Biz.Web.Controllers
{
    public class SFappController : BaseController
    {
        // GET: SFapp
        public ActionResult Index()
        {
        //    string signedRequestParam = Request.Params["signed_request"];
        //    string payload = signedRequestParam.Split('.')[1];
        //    string expectedSignature = signedRequestParam.Split('.')[0];
        //    //  var Encoding = new UTF8Encoding();
        //    string base64 = payload.PadRight(payload.Length + (4 - payload.Length % 4) % 4, '=')
        //.Replace('-', '+').Replace('_', '/');
        //    string json = Encoding.UTF8.GetString(Convert.FromBase64String(base64));
        //    //TODO:Ceck the signedture
        //    var contextObj = JsonConvert.DeserializeObject<Music4Biz.SalesForceDal.Canvas.RootObject>(json).context;
        //    var licenceId = contextObj.environment.record.Id;
        //    var dal = new SalesForceData();
        //    var licence = dal.GetSalesForceLicense(licenceId);



            //return View(licence);
            return View();
        }

        public static decimal CalculatePackagePriceRatio(SalesForceLicense salesForceLicense, SalesForcePackage newSalSalesForcePackage)
        {
            var montheLeftForLicense = (salesForceLicense.Expiration.Value.Year - DateTime.Now.Year) * 12 +
                salesForceLicense.Expiration.Value.Month - DateTime.Now.Month;
            if (montheLeftForLicense < 0) montheLeftForLicense = 0;

            var oldPackagePriceForMonth = salesForceLicense.SalesForcePackage.Price__c / 12;

            var newPackagePriceForMonth = newSalSalesForcePackage.Price__c / 12;

            var priceRatio = (newPackagePriceForMonth - oldPackagePriceForMonth) * montheLeftForLicense;
            return Math.Floor(priceRatio);
        }

        //public JsonResult ExtendPackage(string licenseSalesForceId, string packageId , decimal discount)
        //{
        //    var dal = new SalesForceData();
        //    var client = dal.Authenticate();
        //    var salesForceLicense = dal.GetSalesForceLicense(licenseSalesForceId);

        //    var salesForcePackage = dal.GetSalesForcePackages(client).FirstOrDefault(s => s.Id == packageId);
        //    if (salesForceLicense == null || salesForcePackage == null) return Json(false, JsonRequestBehavior.AllowGet);

        //    var montheLeftForLicense = (salesForceLicense.Expiration.Value.Year - DateTime.Now.Year) * 12 +
        //                                salesForceLicense.Expiration.Value.Month - DateTime.Now.Month;
        //    if (montheLeftForLicense < 0) montheLeftForLicense = 0;
        //    var priceRatio = CalculatePackagePriceRatio(salesForceLicense, salesForcePackage) + salesForcePackage.Price__c;


        //    var user = UOW.UserRepository.GetUser(User.Identity.Name);

        //    var paymanetRequest = new PaymentRequest
        //    {
        //        Price = priceRatio,
        //        Guid = Guid.NewGuid().ToString(),
        //        UserId = user.Id,
        //        LicensePurchaseAction = salesForceLicense.SalesForcePackage.Id == salesForcePackage.Id ? LicensePurchaseEnum.Extend : LicensePurchaseEnum.UpgradeAndExtend,
        //        Active = true
        //    };

        //    var success = UOW.LicenceRepository.AddPaymanetRequest(paymanetRequest);

        //    return new JsonResult()
        //    {
        //        Data = new
        //        {
        //            message = success,
        //        }
        //    };


        //}

    }


}