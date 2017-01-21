using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Music4Biz.Models;
using Music4Biz.Web.Attributes;

namespace Music4Biz.Web.Controllers
{
    [Authorize]
    [Administrator]
    public class PerformersController : BaseController
    {
        //
        // GET: /Performers/
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetAllPerformers()
        {
            var performers = UOW.PerformersRepository.GetAllPerformers().ToList().OrderBy(p=>p.Name);
            return Json(performers, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult CreatePerformer(string performerName)
        {
            var result = UOW.PerformersRepository.CreatePerformer(performerName);
            return Json(result.Success);
        }

        [HttpPost]
        public JsonResult RemovePerformer(Performer performer)
        {
            var result = UOW.PerformersRepository.RemovePerformer(performer);
            return Json(result.Success);
        }

        [HttpPost]
        public JsonResult UpdatePerformerName(Performer performer)
        {
            var result = UOW.PerformersRepository.UpdatePerformerName(performer);
            return Json(result);
        }

	}
}