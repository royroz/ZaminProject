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
        public JsonResult GetCategories()
        {
            var categories = UOW.CategoryRepository.GetCategories();
            var webModels = categories.Select(AutoMapper.Mapper.Map<CourseCategory, CourseCategoryWebModel>);
            return Json(webModels, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveCategory(CourseCategoryWebModel category)
        {
            var success = -1;
            //if success == -1 
            success = category.Id == 0 ? UOW.CategoryRepository.CreateCategory(category) : UOW.CategoryRepository.UpdateCategory(category);
            return new JsonResult()
            {
                Data = new
                {
                    Success = success != -1,
                    Id = success
                }
            };

        }

        [HttpPost]
        public JsonResult DeleteCategory(int categoryId)
        {
            var success = UOW.CategoryRepository.DeleteCategory(categoryId);
            return Json(success);
        }

    }
}