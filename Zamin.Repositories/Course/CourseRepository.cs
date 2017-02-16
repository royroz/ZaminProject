using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using Zamin.Enums;
using Zamin.Helpers;
using Zamin.Models.Content;
using Zamin.WebModels;


namespace Zamin.Repositories
{
    public class CourseRepository : RepositoryBase<DataContext>, ICourseRepository
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
            return DataContext.Course.Include(c=>c.CourseCategory).Where(c=>c.Active).ToList();
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
            dbModel.Active = true;
            FileHelper.SaveFile(course.ImageFile, DirectoriesEnum.Courses, fileName);

            DataContext.Course.Add(dbModel);
            return Save();
        }

        public bool DeleteCourse(int courseId)
        {
            var course = DataContext.Course.FirstOrDefault(c => c.Id == courseId);
            if (course == null) return false;
            course.Active = false;
            return Save();
        }
    }
}