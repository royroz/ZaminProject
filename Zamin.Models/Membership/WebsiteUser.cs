using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Zamin.Enums;
using Zamin.Models.Content;

namespace Zamin.Models
{
    public class WebsiteUser
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }

        public Boolean IsMale { get; set; }

        public string Phone { get; set; }

        public DateTime? BirthdayDate { get; set; }

        public int UserTypeId { get; set; }

        [NotMapped]
        public UserType UserType
        {
            get { return (UserType)UserTypeId; }
            set { UserTypeId = (int)value; }
        }
        public bool IsActive { get; set; }


        private ICollection<Lesson> _lessons;
        public ICollection<Lesson> LessonsWatched
        {
            get { return _lessons ?? (_lessons = new List<Lesson>()); }
            set { _lessons = value; }
        }
         
        public DateTime? CreateDate { get; set; }
        public DateTime? LastLogin { get; set; }
        
        //Likes
        private ICollection<Poster> _likedPosters;
        public ICollection<Poster> LikedPosters
        {
            get { return _likedPosters ?? (_likedPosters = new List<Poster>()); }
            set { _likedPosters = value; }
        }

        private ICollection<Lesson> _likedLessons;
        public ICollection<Lesson> LikedLessons
        {
            get { return _likedLessons ?? (_likedLessons = new List<Lesson>()); }
            set { _likedLessons = value; }
        }

        private ICollection<Course> _likedCourses;
        public ICollection<Course> LikedCourses
        {
            get { return _likedCourses ?? (_likedCourses = new List<Course>()); }
            set { _likedCourses = value; }
        }


        private ICollection<Video> _likedVideo;
        public ICollection<Video> LikedVideo
        {
            get { return _likedVideo ?? (_likedVideo = new List<Video>()); }
            set { _likedVideo = value; }
        }

        private ICollection<Article> _likedArticles;
        public ICollection<Article> LikedArticles
        {
            get { return _likedArticles ?? (_likedArticles = new List<Article>()); }
            set { _likedArticles = value; }
        }

        private ICollection<Activity> _likedActivities;
        public ICollection<Activity> LikedActivities
        {
            get { return _likedActivities ?? (_likedActivities = new List<Activity>()); }
            set { _likedActivities = value; }
        }

        private ICollection<GalleryImage> _likedGalleryImages;
        public ICollection<GalleryImage> LikedGalleryImages
        {
            get { return _likedGalleryImages ?? (_likedGalleryImages = new List<GalleryImage>()); }
            set { _likedGalleryImages = value; }
        }

        private ICollection<LessonPlan> _likedLessonPlans;
        public ICollection<LessonPlan> LikedLessonPlans
        {
            get { return _likedLessonPlans ?? (_likedLessonPlans = new List<LessonPlan>()); }
            set { _likedLessonPlans = value; }
        }

         
    }
}
