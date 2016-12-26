using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Zamin.Models.Membership;
using Zamin.Repositories;

namespace Zamin.Server.Controllers
{
    public class BaseController : Controller
    {
        private UnitOfWork _uow;

        protected UnitOfWork UOW
        {
            get { return _uow ?? (_uow = new UnitOfWork()); }
        }

        private User _currentUser;

        public User CurrentUser
        {
            get
            {
                if (User.Identity.IsAuthenticated)
                {
                    return _currentUser ??
                           (_currentUser = UOW.UsersRepository.GetUser(User.Identity.Name));
                }
                else
                    throw new Exception("");
            }

        }

        protected void UpdateUserData()
        {
            _currentUser = null;
        }
    }
}