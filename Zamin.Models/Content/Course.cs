using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Zamin.Models.General;

namespace Zamin.Models.Content
{
    public class Course
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        public string Description { get; set; }

        public int CourseCategoryId { get; set; }

        [ForeignKey("CourseCategoryId")]
        public CourseCategory CourseCategory { get; set; }

        private ICollection<Lesson> _lessons;
        public ICollection<Lesson> Lessons
        {
            get { return _lessons ?? (_lessons = new List<Lesson>()); }
            set { _lessons = value; }
        }
        public bool IsAuthorizedContent { get; set; }

        private ICollection<Tag> _tags;
        public ICollection<Tag> Tags
        {
            get { return _tags ?? (_tags = new List<Tag>()); }
            set { _tags = value; }
        }
        public int NumOfLikes { get; set; }

        public string ImageFileName { get; set; }

        public bool Active { get; set; }
    }

}
