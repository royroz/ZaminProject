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
    public class NicknamesController : BaseController
    {
        //
        // GET: /Nicknames/
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetAllNicknames()
        {
            var nicknames = UOW.NicknameRepository.GetAllActiveNicknames().ToList().OrderBy(n=>n.Name);
            return Json(nicknames, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult CreateNickname(string name)
        {
            var result = UOW.NicknameRepository.CreateNickname(name);
            return Json(result.Success);
        }

        [HttpPost]
        public JsonResult RemoveNickname(Nickname nickname)
        {
            var result = UOW.NicknameRepository.RemoveNickname(nickname);
            return Json(result.Success);
        }

        [HttpPost]
        public JsonResult UpdateNicknameName(Nickname nickname)
        {
            var result = UOW.NicknameRepository.UpdateNicknameName(nickname);
            return Json(result.Success);
        }
	}
}