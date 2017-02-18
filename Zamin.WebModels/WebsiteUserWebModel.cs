using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Zamin.WebModels
{
   public class WebsiteUserWebModel
    {

        public int Id { get; set; }

        public string Name { get; set; }
     
        public bool IsAuthorizedContent { get; set; }

        public List<PosterWebModel> LikedPosters { get; set; }
        public List<CourseWebModel> LikedCourses { get; set; }

        //public List<LessonWebModel> LessonsWatched { get; set; }
        //public List<LessonWebModel> LikedLessons { get; set; }
        //public List<VideoWebModel> LikedVideo { get; set; }
        //public List<GalleryImageWebModel> LikedGalleryImages { get; set; }
        //public List<ArticleWebModel> LikedArticles { get; set; }
        //public List<ActivityWebModel> LikedActivities { get; set; }
        //public List<LessonPlanWebModel> LikedLessonPlans { get; set; }


       public string Email { get; set; }

       public string Password { get; set; }

       public string FirstName { get; set; }

       public string LastName { get; set; }

       public Boolean IsMale { get; set; }

       public string Phone { get; set; }

       public DateTime? BirthdayDate { get; set; }

       public int UserTypeId { get; set; }

       //[NotMapped]
       //public UserType UserType
       //{
       //    get { return (UserType)UserTypeId; }
       //    set { UserTypeId = (int)value; }
       //}
       public bool IsActive { get; set; }

      public DateTime? CreateDate { get; set; }
       public DateTime? LastLogin { get; set; }

      

    }
}
