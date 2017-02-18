using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Zamin.Models;
using Zamin.WebModels;

namespace Zamin.Repositories 
{
    public interface IWebUserRepository: IDisposable
    {
        List<WebsiteUser> GetWebsiteUsers();

        WebsiteUser GetWebsiteUser(int websiteUserId);
        bool CreateWebsiteUser(WebsiteUserWebModel websiteUser);
        bool DeleteWebsiteUser(int websiteUserId);
        bool UpdateWebsiteUser(WebsiteUserWebModel websiteUser);
    }
}
