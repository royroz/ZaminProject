using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Zamin.Models.General;
using Zamin.WebModels;

namespace Zamin.Server.Controllers
{
    public class CategoryController : BaseController
    {
        // GET: Category
        public ActionResult GetCategories()
        {
            var tags = UOW.CategoryRepository.GetCategories();
            var webModels = tags.Select(AutoMapper.Mapper.Map<CourseCategory, CourseCategoryWebModel>);
            return Json(webModels, JsonRequestBehavior.AllowGet);
        }
    }
}