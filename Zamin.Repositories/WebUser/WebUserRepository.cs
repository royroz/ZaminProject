using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using Zamin.Enums;
using Zamin.Helpers;
using Zamin.Models;
using Zamin.Models.Content;
using Zamin.Models.General;
using Zamin.WebModels;


namespace Zamin.Repositories
{
   public class WebUserRepository :RepositoryBase<DataContext> , IWebUserRepository
    {
       public WebUserRepository()
        {

        }

       public WebUserRepository(DataContext dataContext)
            : base(dataContext)
        {

        }
        public List<WebsiteUser> GetWebsiteUsers()
        {
            return DataContext.WebsiteUsers.Include(w=>w.LessonsWatched).Include(w=>w.LikedActivities).Include(w=>w.LikedArticles).Include(w=>w.LikedGalleryImages)
                .Include(w => w.LikedLessonPlans).Include(w => w.LikedLessons).Include(w => w.LikedVideo).Where(w=>w.IsActive).ToList();
        }

        public WebsiteUser GetWebsiteUser(int websiteUserId)
        {
            throw new NotImplementedException();
        }

        public bool CreateWebsiteUser(WebsiteUserWebModel websiteUser)
        {
            throw new NotImplementedException();
        }

        public bool DeleteWebsiteUser(int websiteUserId)
        {
            throw new NotImplementedException();
        }

        public bool UpdateWebsiteUser(WebsiteUserWebModel websiteUser)
        {
            throw new NotImplementedException();
        }
    }
}
