using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Zamin.Consts
{
    public static class DirectoriesConsts
    {
        public static string  PostersFolder
        {
            get { return ConfigurationManager.AppSettings["postersFolder"]; }
        }

        public static string CoursesFolder
        {
            get { return ConfigurationManager.AppSettings["coursesFolder"]; }
        }

    }
}