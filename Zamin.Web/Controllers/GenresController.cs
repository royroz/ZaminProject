using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Music4Biz.Models;
using Music4Biz.Web.Attributes;
using Music4Biz.WebModels;

namespace Music4Biz.Web.Controllers
{
    [Authorize]
    [Administrator]
    public class GenresController : BaseController
    {
        //
        // GET: /Genres/
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetAllGenres()
        {
            var genres = UOW.GenreRepository.GetAllGenres().ToList().OrderBy(g => g.Name);
            var genresWeb = genres.Select(AutoMapper.Mapper.Map<Genre, GenreWebModel>);
            return Json(genresWeb, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult CreateGenre(string genreName, HttpPostedFileBase largeImageFile, HttpPostedFileBase smallImageFile)
        {
            var largeImageFullPath = string.Empty;
            var smallImageFullPath = string.Empty;
            CheckDirectories();
            if (largeImageFile != null && largeImageFile.ContentLength > 0)
            {
                var largeFileName = genreName + "_L" + Path.GetExtension(largeImageFile.FileName).ToLower();
                var largeDirectoryPath = "/Content/Images/Genres";
                var largePath = Path.Combine(Server.MapPath(string.Format("~{0}", largeDirectoryPath)), largeFileName);
                largeImageFile.SaveAs(largePath);

                largeImageFullPath = largeDirectoryPath + '/' + largeFileName;  
            }

            if (smallImageFile != null && smallImageFile.ContentLength > 0)
            {
                var smallFileName = genreName + "_S" + Path.GetExtension(smallImageFile.FileName).ToLower();
                var smallDirectoryPath = "/Content/Images/Genres";
                var smallPath = Path.Combine(Server.MapPath(string.Format("~{0}", smallDirectoryPath)), smallFileName);
                smallImageFile.SaveAs(smallPath);

                smallImageFullPath = smallDirectoryPath + '/' + smallFileName;
            }

            var result = UOW.GenreRepository.CreateGenre(genreName, largeImageFullPath, smallImageFullPath);
            return Json(result.Success);
        }

        [HttpPost]
        public JsonResult UpdateGenre(int id, string name, HttpPostedFileBase largeImageFile, HttpPostedFileBase smallImageFile)
        {
            var largeImageFullPath = string.Empty;
            var smallImageFullPath = string.Empty;
            CheckDirectories();

            if (largeImageFile != null && largeImageFile.ContentLength > 0)
            {
                var largeFileName = name + "_L" + Path.GetExtension(largeImageFile.FileName).ToLower();
                var largeDirectoryPath = "/Content/Images/Genres";
                var largePath = Path.Combine(Server.MapPath(string.Format("~{0}", largeDirectoryPath)), largeFileName);
                
                largeImageFile.SaveAs(largePath);

                largeImageFullPath = largeDirectoryPath + '/' + largeFileName;                
            }

            if (smallImageFile != null && smallImageFile.ContentLength > 0)
            {
                var smallFileName = name + "_S" + Path.GetExtension(smallImageFile.FileName).ToLower();
                var smallDirectoryPath = "/Content/Images/Genres";
                var smallPath = Path.Combine(Server.MapPath(string.Format("~{0}", smallDirectoryPath)), smallFileName);

                smallImageFile.SaveAs(smallPath);

                smallImageFullPath = smallDirectoryPath + '/' + smallFileName;
            }

            var result = UOW.GenreRepository.UpdateGenre(id, name, largeImageFullPath, smallImageFullPath);
            return Json(result.Success);

        }

        [HttpPost]
        public JsonResult RemoveGenre(Genre genre)
        {
            var result = UOW.GenreRepository.RemoveGenre(genre);
            return Json(result.Success);
        }

        private void CheckDirectories()
        {
            if (!Directory.Exists(Server.MapPath("~/Content")))
            {
                Directory.CreateDirectory(Server.MapPath("~/Content"));
            }
            if (!Directory.Exists(Server.MapPath("~/Content/Images")))
            {
                Directory.CreateDirectory(Server.MapPath("~/Content/Images"));
            }
            if (!Directory.Exists(Server.MapPath("~/Content/Images/Genres")))
            {
                Directory.CreateDirectory(Server.MapPath("~/Content/Images/Genres"));
            }
        }
    }
}