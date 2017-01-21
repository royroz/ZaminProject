using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Muzisc4Biz.Enums;
using Muzisc4Biz.Models;
using Muzisc4Biz.WebModels;

namespace Music4Biz.Web.Controllers
{
    [Authorize]
    public class MetaDataController : BaseController
    {
        public JsonResult GetActiveSpecialServices()
        {
            var data = UOW.SpecialServicesRepository.GetActiveServices();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetLicenseTypes()
        {
            var data = (from LicenseTypes l in Enum.GetValues(typeof(LicenseTypes))
                        select new KeyValue()
                        {
                            Id = (int)l,
                            Name = l.ToString()
                        }).ToList();

            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPaymentTypes()
        {
            var data = (from PaymentType l in Enum.GetValues(typeof(PaymentType))
                        select new KeyValue()
                        {
                            Id = (int)l,
                            Name = l.ToString()
                        }).ToList();

            return Json(data, JsonRequestBehavior.AllowGet);
            
        }

        public JsonResult GetBanks()
        {
            var data = UOW.LicenceRepository.GetAllBanks();
            return Json(data, JsonRequestBehavior.AllowGet);
        }
    }
}