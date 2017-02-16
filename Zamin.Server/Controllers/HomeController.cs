using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Zamin.Server.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public RedirectResult Index()
        {
            return Redirect("Http://Zamin.muze.co.il/FrontClient/index.html");
        }
        public RedirectResult Admin()
        {
            return Redirect("Http://Zamin.muze.co.il/FrontAdmin/index.html");
        }
    }
}