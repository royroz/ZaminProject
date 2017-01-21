using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Data.Entity;
using System.Web.Http;
using Music4Biz.Web.App_Start;
using Music4Biz.Repositories;

namespace Music4Biz.Web
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<Repositories.Music4BizDataContext, Repositories.Migrations.Configuration>());


            AreaRegistration.RegisterAllAreas();
            GlobalFilters.Filters.Add(new EnableCorsAttribute());
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            WebApiConfig.Register(GlobalConfiguration.Configuration);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            AutoMapperConfig.BuildMap();
        }
    }
}
