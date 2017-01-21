using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.UI.WebControls;
using Music4Biz.Repositories;

namespace Music4Biz.Web.Controllers
{
    public class BaseApiController : ApiController
    {
        private Music4BizUnitOfWork _uow;

        protected Music4BizUnitOfWork UOW
        {
            get { return _uow ?? (_uow = new Music4BizUnitOfWork()); }
        }
    }
}