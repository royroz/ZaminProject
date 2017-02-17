using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Zamin.Models.Content;
using Zamin.WebModels;

namespace Zamin.Server.Controllers
{
    public class PosterController : BaseController
    {
        // GET: Poster
        public JsonResult GetPosters()
        {
            var poster = UOW.PosterRepository.GetPosters();
            var webModels = poster.Select(AutoMapper.Mapper.Map<Poster, PosterWebModel>);
            return Json(webModels, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPoster(int posterId)
        {
            var poster = UOW.PosterRepository.GetPoster(posterId);
            var webModel = AutoMapper.Mapper.Map<Poster, PosterWebModel>(poster);
            return Json(webModel, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SavePoster(PosterWebModel poster)
        {
            var success = false;
            success = poster.Id == 0 ? UOW.PosterRepository.CreatePoster(poster) : UOW.PosterRepository.UpdatePoster(poster);

            return Json(success);
        }

        [HttpPost]

        public JsonResult DeletePoster(int posterId)
        {
            var success = UOW.PosterRepository.DeletePoster(posterId);
            return Json(success);
        }
    }
}