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
        public static string CategoriesFolder
        {
            get { return ConfigurationManager.AppSettings["categoriesFolder"]; }
        }

        public static string ItemsFolder
        {
            get { return ConfigurationManager.AppSettings["itemsFolder"]; }
        }

        public static string FranchiseFolder
        {
            get { return ConfigurationManager.AppSettings["franchiseFolder"]; }
        }

        public static string BranchesFolder
        {
            get { return ConfigurationManager.AppSettings["branchesFolder"]; }
        }

        public static string CombosFolder
        {
            get { return ConfigurationManager.AppSettings["combosFolder"]; }
        }

        public static string PizzasFolder
        {
            get { return ConfigurationManager.AppSettings["pizzasFolder"]; }
        }

        public static string ToppingsFolder
        {
            get { return ConfigurationManager.AppSettings["toppingsFolder"]; }
        }

        public static string QuarterToppingFolder
        {
            get { return ConfigurationManager.AppSettings["quarterToppingFolder"]; }
        }


        public static string FranchiseGalleryFolder
        {
            get { return ConfigurationManager.AppSettings["franchiseGalleryFolder"]; }
        }
        public static string FranchiseCoverFolder
        {
            get { return ConfigurationManager.AppSettings["franchiseCoverFolder"]; }
        }

        public static string FranchisePizzaCategoryFolder
        {
            get { return ConfigurationManager.AppSettings["franchisePizzaCategoryFolder"]; }
        }
    }
}