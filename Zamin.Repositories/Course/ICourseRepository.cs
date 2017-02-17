using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Zamin.Models.Content;
using Zamin.WebModels;

namespace Zamin.Repositories
{
    public interface ICourseRepository : IDisposable
    {
        List<Course> GetPosters();
        Course GetCourse(int courseId);
        bool CreateCourse(CourseWebModel course);
        bool DeleteCourse(int courseId);
        bool UpdateCourse(CourseWebModel course);
    }
}
