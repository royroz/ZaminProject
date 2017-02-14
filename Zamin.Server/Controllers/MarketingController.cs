using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Zamin.Server.Controllers
{
    public class MarketingController : BaseController
    {
        public JsonResult SendPushNotificationToClients(int userType, string message, string title)
        {
            var appUsers = UOW.UsersRepository.GetUsersToSendPush(franchiseId);
            var success = true;
            foreach (var user in appUsers)
            {
                success = Helpers.PushHelper.SendSingle(user.PushToken, message, title);
            }
            return Json(success);
        }

        public JsonResult SendAppLinkToCustomer(int franchiseId, string phoneNumber)
        {
            var appInstalationLink = UOW.FranchiseRepository.GetAppInstalationLink(franchiseId);


            var success = Helpers.SmsHelper.SendAppLink(franchiseId, phoneNumber, appInstalationLink);
            return Json(success);
        }
    }
}