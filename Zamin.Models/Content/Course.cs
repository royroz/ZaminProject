using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Zamin.Models.Content
{
    public class Course
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        public string Description { get; set; }
        private ICollection<Lesson> _lessons;
        public ICollection<Lesson> Lessons
        {
            get { return _lessons ?? (_lessons = new List<Lesson>()); }
            set { _lessons = value; }
        }
        public bool IsAuthorizedContent { get; set; }

    }

}
