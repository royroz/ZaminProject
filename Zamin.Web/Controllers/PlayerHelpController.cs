using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Music4Biz.Models;
using Music4Biz.Repositories;
using Music4Biz.Web.Attributes;

namespace Music4Biz.Web.Controllers
{
    [Authorize]
    [Administrator]
    public class PlayerHelpController : BaseController
    {
        // GET: PlayerHelp
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Save(PlayerHelpText playerHelp)
        {
            var success = UOW.PlayerRepository.SavePlayerHelp(playerHelp);

            if (success) SetSuccessMessage();
            else SetErrorMessage();

            return Json(success);
        }

        public JsonResult GetPlayerHelp()
        {
            var playerHelp = UOW.PlayerRepository.GetPlayerHelp();
            return Json(playerHelp, JsonRequestBehavior.AllowGet);
        }

    }
}