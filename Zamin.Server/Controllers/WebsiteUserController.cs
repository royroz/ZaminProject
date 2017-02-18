using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Zamin.Models;
using Zamin.WebModels;

namespace Zamin.Server.Controllers
{
    public class WebsiteUserController : BaseController
    {
        // GET: User
        public JsonResult GetAllWebsiteUsers()
        {
            var websiteUsers = UOW.WebUserRepository.GetWebsiteUsers();
            var webModels = websiteUsers.Select(AutoMapper.Mapper.Map<WebsiteUser, WebsiteUserWebModel>);
            return Json(webModels, JsonRequestBehavior.AllowGet); 


        }
    }
}