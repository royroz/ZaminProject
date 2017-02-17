using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Zamin.Models.General;

namespace Zamin.Models.Content
{
   public class LessonPlan
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime? CreateDate { get; set; }
        private ICollection<Tag> _tags;

        public ICollection<Tag> Tags
        {
            get { return _tags ?? (_tags = new List<Tag>()); }
            set { _tags = value; }
        }
        private ICollection<Presentation> _presentations;

        public ICollection<Presentation> Presentations
        {
            get { return _presentations ?? (_presentations = new List<Presentation>()); }
            set { _presentations = value; }
        }
        private ICollection<WrittenLessonPlan> _writtenLessonPlans;

        public ICollection<WrittenLessonPlan> WrittenLessonPlans
        {
            get { return _writtenLessonPlans ?? (_writtenLessonPlans = new List<WrittenLessonPlan>()); }
            set { _writtenLessonPlans = value; }
        }
        public string Description { get; set; }
        public int NumOfLikes { get; set; }
        public int NumOfViews { get; set; }
        public int NumOfDownloads { get; set; }
        public bool IsAuthorizedContent { get; set; }
        public bool Active { get; set; }
    }
}
