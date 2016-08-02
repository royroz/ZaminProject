using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using cys.Models.Membership;

namespace cys.Repositories.Users
{
    public class UsersRepository : RepositoryBase<DataContext>, IUsersRepository
    {
        public UsersRepository()
        {

        }

        public UsersRepository(DataContext dataContext)
            : base(dataContext)
        {

        }

        public User GetUser(string userName)
        {
            return DataContext.Users.Include(u => u.Roles).SingleOrDefault(u => u.Username == userName);
        }

        public User GetUserById(int userId)
        {
            return
                DataContext.Users.FirstOrDefault(u => u.UserId == userId);
        }
    }
}
