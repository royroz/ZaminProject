﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.AccessControl;
using System.Text;
using System.Threading.Tasks;
using Zamin.Models.General;

namespace Zamin.Models.Content
{
   public class Article
    {
        public int Id { get; set; }
        public string ArticleName { get; set; }
        public string Subject { get; set; }
        public DateTime? CreateDate { get; set; }
        private ICollection<Tag> _tags;

        public ICollection<Tag> Tags
        {
            get { return _tags ?? (_tags = new List<Tag>()); }
            set { _tags = value; }
        }
        public string FileUrl { get; set; }
        public string Description { get; set; }
        public int NumOfLikes { get; set; }
       public int NumOfViews { get; set; }
        public int NumOfDownloads { get; set; }
        public bool IsAuthorizedContent { get; set; }

    }
}
