using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Zamin.Models.Content
{
    public class Lesson

    {
        [Key]
        public int Id { get; set; }
        public int CourseId { get; set; }

        [ForeignKey("CourseId")]
        public Course course { get; set; }
        public string Number { get; set; }

        public string Description { get; set; }
        public string Link { get; set; }
        public bool IsAuthorizedContent { get; set; }
    }
}
