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
    public class BpmController : BaseController
    {
        // GET: Bpm
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetAllBpms()
        {
            var bpms = UOW.BpmRepository.GetAllBpms().ToList().OrderBy(g => g.Name);
            return Json(bpms, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult CreateBpm(Bpm bpm)
        {
            var result = UOW.BpmRepository.CreateBpm(bpm);
            return Json(result.Success);
        }

        [HttpPost]
        public JsonResult UpdateBpm(Bpm bpm)
        {
            var result = UOW.BpmRepository.UpdateBpm(bpm);
            return Json(result.Success);
        }

        [HttpPost]
        public JsonResult RemoveBpm(Bpm bpm)
        {
            var result = UOW.BpmRepository.RemoveBpm(bpm);
            return Json(result.Success);
        }

    }
}