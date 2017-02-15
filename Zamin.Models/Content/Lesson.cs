using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Zamin.Models.General;

namespace Zamin.Models.Content
{
    public class Lesson

    {
        [Key]
        public int Id { get; set; }
        public int CourseId { get; set; }

        [ForeignKey("CourseId")]
        public Course Course { get; set; }
        public string Name { get; set; }

        private ICollection<Tag> _tags;

        public ICollection<Tag> Tags
        {
            get { return _tags ?? (_tags = new List<Tag>()); }
            set { _tags = value; }
        }

        public string Description { get; set; }
        public string VideoUrl { get; set; }
        public bool IsAuthorizedContent { get; set; }
        public int NumOfLikes { get; set; }
        public int NumOfViews { get; set; }
    }
}
