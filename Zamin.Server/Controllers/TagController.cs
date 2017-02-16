using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Zamin.Models.General;
using Zamin.WebModels;

namespace Zamin.Server.Controllers
{
    public class TagController : BaseController
    {
        // GET: Tag
        public ActionResult GetTags()
        {
            var tags = UOW.TagRepository.GetTags();
            var webModels = tags.Select(AutoMapper.Mapper.Map<Tag, TagWebModel>);
            return Json(webModels, JsonRequestBehavior.AllowGet);
        }
    }
}