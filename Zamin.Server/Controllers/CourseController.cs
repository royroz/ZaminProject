using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Zamin.Models.Content;
using Zamin.WebModels;

namespace Zamin.Server.Controllers
{
    public class CourseController : BaseController
    {

        public JsonResult GetCourses()
        {
            var course = UOW.CourseRepository.GetCourses();
            var webModels = course.Select(AutoMapper.Mapper.Map<Course, CourseWebModel>);
            return Json(webModels, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCourse(int courseId)
        {
            var course = UOW.CourseRepository.GetCourse(courseId);
            var webModel = AutoMapper.Mapper.Map<Course, CourseWebModel>(course);
            return Json(webModel, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult CreateCourse(CourseWebModel course)
        {
            var success = UOW.CourseRepository.CreateCourse(course);
            return Json(success);
        }

        [HttpPost]

        public JsonResult DeleteCourse(int courseId)
        {
            var success = UOW.CourseRepository.DeleteCourse(courseId);
            return Json(success);
        }
    }
}