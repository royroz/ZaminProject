using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Music4Biz.Enums;
using Music4Biz.Repositories.CfMembership;

namespace Music4Biz.Web.Attributes
{
    public class AdministratorAttribute : AuthorizeAttribute
    {
        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            if (httpContext == null)
                throw new ArgumentNullException("httpContext");
            var rp = new CodeFirstRoleProvider();
            return rp.IsUserInRole(HttpContext.Current.User.Identity.Name, RoleNames.Administrator.ToString());
        }
    }
}