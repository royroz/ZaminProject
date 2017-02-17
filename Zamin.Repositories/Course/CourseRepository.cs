using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using Zamin.Enums;
using Zamin.Helpers;
using Zamin.Models.Content;
using Zamin.Models.General;
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

        public List<Course> GetPosters()
        {
            return DataContext.Course.Include(c => c.CourseCategory).Where(c => c.Active).ToList();
        }

        public Course GetCourse(int courseId)
        {
            return DataContext.Course.Include(c => c.CourseCategory).Include(c => c.Tags).FirstOrDefault(c => c.Id == courseId);
        }

        public bool CreateCourse(CourseWebModel course)
        {
            var dbModel = AutoMapper.Mapper.Map<CourseWebModel, Course>(course);

            //Save tags
            if (course.Tags != null)
            {
                foreach (var tagWebModel in course.Tags)
                {
                    dbModel.Tags.Add(DataContext.Tags.First(t => t.Id == tagWebModel.Id));
                }
            }

            //Save image file
            var fileName = Guid.NewGuid() + ".png";
            dbModel.ImageFileName = fileName;
            dbModel.Active = true;
            FileHelper.SaveFile(course.ImageFile, DirectoriesEnum.Courses, fileName);

            DataContext.Course.Add(dbModel);
            return Save();
        }

        public bool UpdateCourse(CourseWebModel course)
        {
            var dbModel = DataContext.Course.Include(p => p.Tags).Include(p => p.CourseCategory).SingleOrDefault(c => c.Id == course.Id);
            if (dbModel == null) return false;
            AutoMapper.Mapper.Map(course, dbModel);


            //Save tags
            if (course.Tags != null && course.Tags.Count > 0)
            {
                foreach (var tagDb in dbModel.Tags.ToList())
                {
                    //Doesnt exist in webModel (removed by client)
                    if (!course.Tags.Any(t => t.Id == tagDb.Id))
                    {
                        dbModel.Tags.Remove(tagDb);
                    }
                }
                foreach (var tagWebModel in course.Tags.ToList())
                {
                    //Doesnt exist in db (added by client)
                    if (!dbModel.Tags.Any(t => t.Id == tagWebModel.Id))
                    {
                        dbModel.Tags.Add(DataContext.Tags.First(t => t.Id == tagWebModel.Id));
                    }
                }
            }
            else //All tags were deleted
            {
                foreach (var tag in dbModel.Tags.ToList())
                {
                    dbModel.Tags.Remove(tag);
                }
            }

            //Save image file
            if (course.ImageFile != null)
            {
                var fileName = Guid.NewGuid() + ".png";
                dbModel.ImageFileName = fileName;
                dbModel.Active = true;
                FileHelper.SaveFile(course.ImageFile, DirectoriesEnum.Courses, fileName);
            }
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