using System.Web.Security;

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
         
            //users
            if (!context.Users.Any())
            {
                var adminUserName = "admin";
                MembershipCreateStatus Status;
                Membership.CreateUser(adminUserName, "1234", "admin@admin.com", null, null, true, out Status);

                var adminUser = context.Users.Single(u => u.Email == adminUserName);
                adminUser.Active = true;
                context.SaveChanges();
            }
        }
    }
}
