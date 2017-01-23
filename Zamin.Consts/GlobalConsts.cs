using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Zamin.Consts
{
    public static class GlobalConsts
    {
        public static string ServerUrl
        {
            get { return ConfigurationManager.AppSettings["serverUrl"]; }
        }
        public static string ServerDirectory
        {
            get { return ConfigurationManager.AppSettings["serverDirectory"]; }
        }

        //SMS consts

        public static int MinMinutesBetweenSms// Minimium time between two sms sending
        {
            get { return 30; }
        }

        public static int MaxLoginCodeTrials
        {
            get { return 5; }
        }

        public static int CodeExpirationMinutes
        {
            get { return 60; }
        }

        public static int AppUsersPerPage
        {
            get { return Int32.Parse(ConfigurationManager.AppSettings["appUsersPerPage"]); }
        }
    }
}
