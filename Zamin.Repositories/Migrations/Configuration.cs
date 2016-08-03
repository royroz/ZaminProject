using System.Web.Security;
using Zamin.Enums;

namespace Zamin.Repositories.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

   public class Configuration : DbMigrationsConfiguration<Zamin.Repositories.DataContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(Zamin.Repositories.DataContext context)
        {
            //Roles

            if (!context.Roles.Any())
            {
                Roles.CreateRole(RolesEnum.Administrator.ToString());
                Roles.CreateRole(RolesEnum.Student.ToString());

            }


            //users
            if (!context.Users.Any())
            {
                var adminUserName = "admin";
                MembershipCreateStatus Status;
                Membership.CreateUser(adminUserName, "1234", "admin@admin.com", null, null, true, out Status);
                Roles.AddUserToRole(adminUserName, RolesEnum.Administrator.ToString());

                var adminUser = context.Users.Single(u => u.Username == adminUserName);
                adminUser.Active = true;
                context.SaveChanges();
            }
        }
    }
}
