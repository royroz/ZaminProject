using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Zamin.Models;
using Zamin.Models.Membership;


namespace Zamin.Repositories
{
   public class DataContext : DbContext, IDisposedTracker
    {
        public bool IsDisposed { get; set; }


       public DbSet<User> Users { get; set; }
       public DbSet<WebsiteUser> WebsiteUsers { get; set; }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }

}
