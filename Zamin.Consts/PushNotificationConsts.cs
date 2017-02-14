using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Zamin.Consts
{
    public static class PushNotificationConsts
    {

        public static string FcmServerApiKey
        {
            get { return ConfigurationManager.AppSettings["fcmServerApiKey"]; }
        }

        public static string FcmSenderId
        {
            get { return ConfigurationManager.AppSettings["fcmSenderId"]; }
        }
        public static string FcmUrl
        {
            get { return ConfigurationManager.AppSettings["fcmUrl"]; }
        }

        public static string PushySecretApiKey
        {
            get { return ConfigurationManager.AppSettings["pushySecretApiKey"]; }
        }
    }
}