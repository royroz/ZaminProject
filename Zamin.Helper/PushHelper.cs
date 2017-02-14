using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;

namespace Zamin.Helper
{
    public static class PushHelper
    {
        public static bool SendSingle(string deviceId, string message, string title)
        {
            try
            {
                var json = CreateMessage(deviceId, message, title);
                var success = Send(json);

                return success;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        private static bool Send(string json)
        {
            try
            {
                WebRequest tRequest = WebRequest.Create(Consts.PushNotificationConsts.FcmUrl);
                tRequest.Method = "post";
                tRequest.ContentType = "application/x-www-form-urlencoded;charset=UTF-8";
                tRequest.Headers.Add(string.Format("Authorization: key={0}", Consts.PushNotificationConsts.FcmServerApiKey));
                tRequest.Headers.Add(string.Format("Sender: id={0}", Consts.PushNotificationConsts.FcmSenderId));


                tRequest.ContentType = "application/json";

                Byte[] byteArray = Encoding.UTF8.GetBytes(json);

                tRequest.ContentLength = byteArray.Length;

                using (Stream dataStream = tRequest.GetRequestStream())
                {
                    dataStream.Write(byteArray, 0, byteArray.Length);

                    using (WebResponse tResponse = tRequest.GetResponse())
                    {
                        using (Stream dataStreamResponse = tResponse.GetResponseStream())
                        {
                            using (StreamReader tReader = new StreamReader(dataStreamResponse))
                            {
                                String sResponseFromServer = tReader.ReadToEnd();
                                return true;
                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                return false;
            }
        }


        private static string CreateMessage(string deviceId, string body, string title)
        {

            var data = new
            {
                to = deviceId,
                priority = "high",
                notification = new
                {
                    body,
                    title,
                    sound = "default",
                    click_action = "FCM_PLUGIN_ACTIVITY"
                },
                data = new
                {
                    body,
                    title,
                    sound = "default",
                    click_action = "FCM_PLUGIN_ACTIVITY"
                }
            };

            var serializer = new JavaScriptSerializer();
            var json = serializer.Serialize(data);
            return json;
        }

  

    }
}
