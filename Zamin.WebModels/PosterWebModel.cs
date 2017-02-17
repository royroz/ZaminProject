using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Zamin.WebModels
{
    public class PosterWebModel
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Description { get; set; }

        public bool IsAuthorizedContent { get; set; }

        public int NumOfLikes { get; set; }

        public int NumOfViews { get; set; }

        public int NumOfDownloads { get; set; }

        public string ImageUrl { get; set; }

        public HttpPostedFileBase ImageFile { get; set; }

        public List<TagWebModel> Tags { get; set; }
    }
}
