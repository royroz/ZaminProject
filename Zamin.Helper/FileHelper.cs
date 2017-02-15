using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Zamin.Enums;

namespace Zamin.Helpers
{
        public static class FileHelper
        {
            public static bool SaveFile(HttpPostedFileBase file, DirectoriesEnum directoriesEnum, string fileName, string newDirectoryName = null)
            {

                if (file == null || file.ContentLength == 0) { return false; }

                try
                {

                    var directoryName = GetDirectoryName(directoriesEnum);

                    if (!string.IsNullOrEmpty(newDirectoryName))
                    {
                        //Create directory for franchise Id
                        if (!Directory.Exists(directoryName + "/" + newDirectoryName))
                        {
                            Directory.CreateDirectory(directoryName + "/" + newDirectoryName);
                        }
                        directoryName = directoryName + "/" + newDirectoryName;
                    }

                    var path = Path.Combine(directoryName, fileName);
                    var imageBytes = new byte[file.InputStream.Length];
                    file.InputStream.Read(imageBytes, 0, imageBytes.Length);
                    file.SaveAs(path); //Replaces file if exists
                    return true;
                }
                catch (Exception e)
                {
                    return false;
                }
            }

            //public static List<string> GetFileFromFolder(string folder)
            //{
            //    if (Directory.Exists(Consts.GlobalConsts.ServerDirectory + folder))
            //    {
            //        var list = Directory.GetFiles(Consts.GlobalConsts.ServerDirectory + folder);
            //        var files = list.Select(item => item.Replace(Consts.GlobalConsts.ServerDirectory, Consts.GlobalConsts.ServerUrl)).ToList();
            //        return files;
            //    }
            //    return new List<string>();
            //}
            //public static void DeleteFile(string url)
            //{
            //    var fileToDelete = url.Replace(Consts.GlobalConsts.ServerUrl, Consts.GlobalConsts.ServerDirectory);
            //    File.Delete(fileToDelete);
            //}

            private static string GetDirectoryName(DirectoriesEnum directoriesEnum)
            {
                var directoryName = Consts.GlobalConsts.ServerDirectory;
                switch (directoriesEnum)
                {
                    case DirectoriesEnum.Courses:
                        directoryName += Consts.DirectoriesConsts.CoursesFolder;
                        break;
                    case DirectoriesEnum.Posters:
                        directoryName += Consts.DirectoriesConsts.PostersFolder;
                        break;
                }
                return directoryName;
            }


        }
    }
