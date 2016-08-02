using Zamin.Models.Membership;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Zamin.Models;
using Zamin.Models.Membership;
//using Zamin.Models.Membership;

namespace Zamin.Repositories.Users
{
    public interface IUsersRepository : IDisposable
    {
        User GetUser(string userName);
        User GetUserById(int userId);
    }
}
