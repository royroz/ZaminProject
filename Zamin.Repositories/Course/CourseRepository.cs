using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Zamin.Enums;
using Zamin.Helpers;
using Zamin.Models.Content;
using Zamin.WebModels;

namespace Zamin.Repositories
{
    class CourseRepository : RepositoryBase<DataContext>, ICourseRepository
    {
        public CourseRepository()
        {

        }

        public CourseRepository(DataContext dataContext)
            : base(dataContext)
        {

        }

        public List<Course> GetCourses()
        {
            return DataContext.Course.ToList();
        }

        public Course GetCourse(int courseId)
        {
            return DataContext.Course.FirstOrDefault(c => c.Id == courseId);
        }

        public bool CreateCourse(CourseWebModel course)
        {
            var dbModel = AutoMapper.Mapper.Map<CourseWebModel, Course>(course);

            //Save image file
            var fileName = Guid.NewGuid()+ ".png";
            dbModel.ImageFileName = fileName;
            FileHelper.SaveFile(course.ImageFile, DirectoriesEnum.Courses, fileName);

            DataContext.Course.Add(dbModel);
            return Save();
        }

        public bool DeleteCourse(int courseId)
        {
            var course = DataContext.Course.FirstOrDefault(c => c.Id == courseId);
            if (course == null) return false;
            DataContext.Course.Remove(course);
            return Save();
        }
    }
}