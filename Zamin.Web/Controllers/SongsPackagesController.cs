using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Music4Biz.Models;

namespace Music4Biz.Web.Controllers
{
    public class SongsPackagesController : BaseController
    {
        //
        // GET: /SongsPackages/
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetAllSongsPackages()
        {
            var packages = UOW.SongPackageRepository.GetAllSongsPackages();
            return Json(packages, JsonRequestBehavior.AllowGet);
        }
	}
}