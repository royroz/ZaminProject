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
    public class PublishersController : BaseController
    {
        //
        // GET: /Publishers/
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetAllPublishers()
        {
            var publishers = UOW.PublisherRepository.GetAllPublishers().ToList().OrderBy(p=>p.Name);
            return Json(publishers, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult CreatePublisher(string publisherName)
        {
            var result = UOW.PublisherRepository.CreatePublisher(publisherName);
            return Json(result.Success);
        }

        [HttpPost]
        public JsonResult RemovePublisher(Publisher publisher)
        {
            var result = UOW.PublisherRepository.RemovePublisher(publisher);
            return Json(result.Success);
        }

        [HttpPost]
        public JsonResult UpdatePublisherName(Publisher publisher)
        {
            var result = UOW.PublisherRepository.UpdatePublisher(publisher);
            return Json(result.Success);
        }
    }
}