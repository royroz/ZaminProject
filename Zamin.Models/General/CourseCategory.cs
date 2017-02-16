using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Zamin.Models.Content;

namespace Zamin.Models.General
{
    public class CourseCategory
    {
        public int Id { get; set; }
        public string CategoryName { get; set; }

        private ICollection<Course> _courses;
        public ICollection<Course> Courses
        {
            get { return _courses ?? (_courses = new List<Course>()); }
            set { _courses = value; }
        }
        public bool Active { get; set; }
    }
}
