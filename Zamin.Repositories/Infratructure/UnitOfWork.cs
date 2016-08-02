using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Zamin.Repositories.Users;

//using Zamin.Repositories.Users;

namespace Zamin.Repositories
{
    public class UnitOfWork : UnitOfWorkBase<DataContext>
    {
        private IUsersRepository _usersRepository;
        public IUsersRepository UsersRepository
        {
            get { return _usersRepository ?? (_usersRepository = new UsersRepository(DataContext)); }
        }

      
    }
}
