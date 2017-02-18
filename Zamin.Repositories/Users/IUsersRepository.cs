using Zamin.Models.Membership;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Zamin.Models;
//using Zamin.Models.Membership;

namespace Zamin.Repositories
{
    public interface IUsersRepository : IDisposable
    {
        User GetUser(string userName);
        User GetUserById(int userId);

        bool IsWebsiteUserExsist(string userName, string password);
        bool IsEmailExists(string email);
        bool AddOrUpdateUser(WebsiteUser user);
    }
}
