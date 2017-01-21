using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Muzisc4Biz.Enums;
using Muzisc4Biz.Models;

namespace Music4Biz.Web.Controllers
{
    public class ServicesController : BaseController
    {
        // GET: Services
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetAllServices()
        {
            var data = UOW.SpecialServicesRepository.GetActiveServices();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SaveService(SpecialService service)
        {
            var success = UOW.SpecialServicesRepository.AddService(service);
            return Json(success);
        }

        public JsonResult DeleteService(int serviceId)
        {
            var success = UOW.SpecialServicesRepository.DeleteService(serviceId);
            return Json(success);
        }
        public ActionResult AddServiceToClient(int id)
        {
            return View();
        }

        [HttpPost]
        public JsonResult AddServiceToClient(int clientId, int serviceId, decimal price)
        {
            var success = UOW.ClientsRepository.AddServiceToClient(clientId, serviceId,price );
            return Json(success);
        }

        [HttpPost]
        public JsonResult ServiceCheckPayment(int clientId, decimal price,int serviceId, List<Check> checks)
        {
            var success = UOW.ClientsRepository.AddChecks(clientId, checks, PaymentFor.Service);
            var totalPrice = checks.Sum(c => c.Sum);
            UOW.ClientsRepository.AddPaymentForService(clientId, serviceId, totalPrice, PaymentType.Check);
            if (success)
            {
                success = UOW.ClientsRepository.AddServiceToClient(clientId, serviceId, totalPrice);
            }
            return Json(success);
        }

    }
}