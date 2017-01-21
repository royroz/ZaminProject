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
    public class AtmospheresController : BaseController
    {
        //
        // GET: /Atmospheres/
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetAllAtmospheres()
        {
            var atmospheres = UOW.AtmospherRepository.GetAllAtmospheres().ToList().OrderBy(g=>g.Name);
            return Json(atmospheres, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult CreateAtmosphere(string atmosphereName)
        {
            var result = UOW.AtmospherRepository.CreateAtmosphere(atmosphereName);
            return Json(result.Success);
        }

        [HttpPost]
        public JsonResult RemoveAtmosphere(Atmosphere atmosphere)
        {
            var result = UOW.AtmospherRepository.RemoveAtmosphere(atmosphere);
            return Json(result.Success);
        }

        [HttpPost]
        public JsonResult UpdateAtmosphereName(Atmosphere atmosphere)
        {
            var result = UOW.AtmospherRepository.UpdateAtmosphereName(atmosphere);
            return Json(result.Success);
        }
	}
}