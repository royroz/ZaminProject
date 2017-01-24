using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Zamin.Models;
using Zamin.Repositories.CFMembership;

namespace Zamin.Server.Controllers
{
    public class AccountController : BaseController
    {
        [HttpPost]
        public JsonResult Login(string userName, string password)
        {
            var cfMembershipProvides = new CodeFirstMembershipProvider();
            var validateUser = cfMembershipProvides.ValidateUser(userName, password);
            if (!validateUser)
            {
                return new JsonResult()
                {
                    Data = new
                    {
                        Success = false
                    }
                };
            }

            FormsAuthentication.SetAuthCookie(userName, true);
            var user = UOW.UsersRepository.GetUser(userName);
            return new JsonResult()
            {
                Data = new
                {
                    Success = true,
                    Id = user.Id,
                    userName = user.Email,
                }
            };
        }

        public JsonResult WebsiteLogin(string userName, string password)
        {
            var exists = UOW.UsersRepository.IsWebsiteUserExsist(userName, password);
              return new JsonResult()
            {
                Data = new
                {
                    Success = true,
                    //UserId = user.UserId,
                    //userName = user.Username,
                }
            };
        }

        public JsonResult LogOff()
        {
            FormsAuthentication.SignOut();
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCurrentUserName()
        {
            if (!User.Identity.IsAuthenticated) return Json(string.Empty, JsonRequestBehavior.AllowGet);

            var userName = string.Format("{0} {1}", CurrentUser.FirstName, CurrentUser.LastName);
            if (string.IsNullOrWhiteSpace(userName))
            {
                userName = CurrentUser.Username;
            }
            return Json(userName, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SignUp(WebsiteUser websiteUser)
        {
            var isUserExists = UOW.UsersRepository.IsEmailExists(websiteUser.Email);
            if (isUserExists)
            {
                return new JsonResult()
                {
                    Data = new
                    {
                        message = "user name exists"
                    }
                };
            }



            websiteUser.Password = Crypto.HashPassword(websiteUser.Password);
            websiteUser.CreateDate = DateTime.Now;
            websiteUser.Active = true;



            UOW.UsersRepository.AddOrUpdateUser(websiteUser);
            FormsAuthentication.SetAuthCookie(websiteUser.Email, true);

            //create payment request
                                             
                return new JsonResult()
            {
                Data = new
                {
                    message = true,
                    userName = websiteUser.Email
                }
            };
        }


    }
}