using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Music4Biz.Repositories;

namespace Music4Biz.Web.Controllers
{
    public class BaseController : Controller
    {
        //
        // GET: /Base/
        private Music4BizUnitOfWork _uow;

        protected Music4BizUnitOfWork UOW
        {
            get { return _uow ?? (_uow = new Music4BizUnitOfWork()); }
        }

        protected void SetSuccessMessage(string message = "")
        {
            if (string.IsNullOrWhiteSpace(message))
            {
                message = Music4Biz.Resources.Global.successSavingData;
            }
            message = Url.Encode(message);
            Response.Cookies.Add(new HttpCookie("successmsg", message));
        }


        protected void SetErrorMessage(string message = "")
        {
            if (string.IsNullOrWhiteSpace(message))
            {
                message = Music4Biz.Resources.Global.problemSavingData;
            }
            message = Url.Encode(message);
            Response.Cookies.Add(new HttpCookie("errormsg", message));
        }
	}
}