﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using Zamin.Models.Membership;
using Zamin.Repositories;
using Zamin.Repositories.CFMembership;
using Zamin.Repositories.Users;
using Zamin.Models;

namespace Zamin.Repositories.Users
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
            return DataContext.Users.SingleOrDefault(u => u.Username == userName);
        }

        public User GetUserById(int userId)
        {
            return
                DataContext.Users.FirstOrDefault(u => u.UserId == userId);
        }

        public bool IsWebsiteUserExsist(string userName, string password)
        {
            return
                DataContext.WebsiteUsers.Any(u => u.Email == userName && Crypto.HashPassword(password) == u.Password);
        }

        public bool IsEmailExists(string email)
        {
            return DataContext.Users.Any(u => u.Email == email);
        }
        public bool AddOrUpdateUser(WebsiteUser user)
        {
            DataContext.WebsiteUsers.Add(user);
            return Save();
        }
    }
}
