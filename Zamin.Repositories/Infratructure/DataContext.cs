using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Zamin.Models;
using Zamin.Models.Content;
using Zamin.Models.General;
using Zamin.Models.Membership;


namespace Zamin.Repositories
{
    public class DataContext : DbContext, IDisposedTracker
    {
        public bool IsDisposed { get; set; }


        public DbSet<User> Users { get; set; }
        public DbSet<WebsiteUser> WebsiteUsers { get; set; }
        public  DbSet<Course>Course { get; set; }
        public DbSet<Lesson> Lesson { get; set; }

        public DbSet<Tag> Tags { get; set; }

        public DbSet<CourseCategory> CourseCategories { get; set; }



        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }

}
