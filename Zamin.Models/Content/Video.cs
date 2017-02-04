using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Remoting.Metadata.W3cXsd2001;
using System.Text;
using System.Threading.Tasks;
using Zamin.Enums;
using Zamin.Models.General;

namespace Zamin.Models.Content
{
    public class Video
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }

        private ICollection<Tag> _tags;

        public ICollection<Tag> Tags
        {
            get { return _tags ?? (_tags = new List<Tag>()); }
            set { _tags = value; }
        }

        public string Titel { get; set; }
       
        public DateTime? CreateDate { get; set; }

        public string Description { get; set; }

        private ICollection<Lesson> _lessons;
        public ICollection<Lesson> Lessons
        {
            get { return _lessons ?? (_lessons = new List<Lesson>()); }
            set { _lessons = value; }
        }
        public int VideoTypeId { get; set; }

        [NotMapped]
        public VideoType VideoType
        {
            get { return (VideoType)VideoTypeId; }
            set { VideoTypeId = (int)value; }
        }

        public int NumOfLikes { get; set; }
        public int NumOfViews { get; set; }
        public bool IsAuthorizedContent { get; set; }

    }

}