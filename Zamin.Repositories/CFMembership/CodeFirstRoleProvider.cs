using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Security;
using Zamin.Models.Membership;



namespace Zamin.Repositories.CFMembership
{
    public class CodeFirstRoleProvider : RoleProvider
    {
        public override string ApplicationName
        {
            get { return this.GetType().Assembly.GetName().Name.ToString(); }
            set { this.ApplicationName = this.GetType().Assembly.GetName().Name.ToString(); }
        }

        public override bool RoleExists(string roleName)
        {
            if (string.IsNullOrEmpty(roleName))
            {
                return false;
            }
            using (DataContext Context = new DataContext())
            {
                Role role = null;
                role = Context.Roles.FirstOrDefault(Rl => Rl.RoleName == roleName);
                if (role != null)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        public override bool IsUserInRole(string username, string roleName)
        {
            if (string.IsNullOrEmpty(username))
            {
                return false;
            }
            if (string.IsNullOrEmpty(roleName))
            {
                return false;
            }
            using (DataContext Context = new DataContext())
            {
                User user = null;
                user = Context.Users.Include(u => u.Roles).FirstOrDefault(Usr => Usr.Username == username);
                if (user == null)
                {
                    return false;
                }
                Role role = Context.Roles.FirstOrDefault(Rl => Rl.RoleName == roleName);
                if (role == null)
                {
                    return false;
                }
                return user.Roles.Contains(role);
            }
        }

        public bool IsUserInRole(int userId, string roleName)
        {
            if (userId < 1) { return false; }
            if (string.IsNullOrEmpty(roleName)) { return false; }

            using (DataContext Context = new DataContext())
            {
                var user = Context.Users.Include(u => u.Roles).FirstOrDefault(Usr => Usr.UserId == userId);
                if (user == null) { return false; }

                var role = Context.Roles.FirstOrDefault(r => r.RoleName == roleName);
                if (role == null) { return false; }

                return user.Roles.Contains(role);
            }
        }

        public override string[] GetAllRoles()
        {
            using (DataContext Context = new DataContext())
            {
                return Context.Roles.Select(Rl => Rl.RoleName).ToArray();
            }
        }

        public override string[] GetUsersInRole(string roleName)
        {
            if (string.IsNullOrEmpty(roleName))
            {
                return null;
            }
            using (DataContext Context = new DataContext())
            {
                Role role = null;
                role = Context.Roles.FirstOrDefault(Rl => Rl.RoleName == roleName);
                if (role != null)
                {
                    return role.Users.Select(Usr => Usr.Username).ToArray();
                }
                else
                {
                    return null;
                }
            }
        }

        public override string[] GetRolesForUser(string username)
        {
            if (string.IsNullOrEmpty(username))
            {
                return null;
            }
            using (DataContext Context = new DataContext())
            {
                User User = null;
                User = Context.Users.FirstOrDefault(Usr => Usr.Username == username);
                if (User != null)
                {
                    return User.Roles.Select(Rl => Rl.RoleName).ToArray();
                }
                else
                {
                    return null;
                }
            }
        }

        public override string[] FindUsersInRole(string roleName, string usernameToMatch)
        {
            if (string.IsNullOrEmpty(roleName))
            {
                return null;
            }

            if (string.IsNullOrEmpty(usernameToMatch))
            {
                return null;
            }

            using (DataContext Context = new DataContext())
            {

                return (from Rl in Context.Roles
                        from Usr in Rl.Users
                        where Rl.RoleName == roleName && Usr.Username.Contains(usernameToMatch)
                        select Usr.Username).ToArray();
            }
        }

        public override void CreateRole(string roleName)
        {
            if (!string.IsNullOrEmpty(roleName))
            {
                using (DataContext Context = new DataContext())
                {
                    Role role = null;
                    role = Context.Roles.FirstOrDefault(Rl => Rl.RoleName == roleName);
                    if (role == null)
                    {
                        Role NewRole = new Role
                        {
                            RoleId = Guid.NewGuid(),
                            RoleName = roleName
                        };
                        Context.Roles.Add(NewRole);
                        Context.SaveChanges();
                    }
                }
            }
        }

        public override bool DeleteRole(string roleName, bool throwOnPopulatedRole)
        {
            if (string.IsNullOrEmpty(roleName))
            {
                return false;
            }
            using (DataContext Context = new DataContext())
            {
                Role role = null;
                role = Context.Roles.FirstOrDefault(Rl => Rl.RoleName == roleName);
                if (role == null)
                {
                    return false;
                }
                if (throwOnPopulatedRole)
                {
                    if (role.Users.Any())
                    {
                        return false;
                    }
                }
                else
                {
                    role.Users.Clear();
                }
                Context.Roles.Remove(role);
                Context.SaveChanges();
                return true;
            }
        }

        public override void AddUsersToRoles(string[] usernames, string[] roleNames)
        {
            using (var context = new DataContext())
            {
                var Users = context.Users.Include(u => u.Roles).Where(Usr => usernames.Contains(Usr.Username)).ToList();
                var Roles = context.Roles.Where(Rl => roleNames.Contains(Rl.RoleName)).ToList();
                foreach (var user in Users)
                {
                    foreach (var role in Roles)
                    {
                        if (!user.Roles.Contains(role))
                        {
                            user.Roles.Add(role);
                        }
                    }
                }
                context.SaveChanges();
            }
        }

        public bool AddUserToRole(int userId, string roleName)
        {
            var result = false;
            using (var context = new DataContext())
            {
                var user = context.Users.Include(u => u.Roles).SingleOrDefault(u => u.UserId == userId);
                var role = context.Roles.SingleOrDefault(r => r.RoleName == roleName);
                if (user == null || role == null) return false;
                if (user.Roles.Contains(role)) return false;
                user.Roles.Add(role);
                result = context.SaveChanges() > -1;
            }
            return result;
        }

        public override void RemoveUsersFromRoles(string[] usernames, string[] roleNames)
        {
            using (var context = new DataContext())
            {
                foreach (var username in usernames)
                {
                    var us = username;
                    var user = context.Users.Include(u => u.Roles).FirstOrDefault(U => U.Username == us);
                    if (user != null)
                    {
                        foreach (var role in roleNames.Select(rl => user.Roles.FirstOrDefault(R => R.RoleName == rl)).Where(role => role != null))
                        {
                            user.Roles.Remove(role);
                        }
                    }
                }
                context.SaveChanges();
            }
        }

        public bool RemoveUserFromRole(int userId, string roleName)
        {
            using (var context = new DataContext())
            {

                var user = context.Users.Include(u => u.Roles).FirstOrDefault(U => U.UserId == userId);
                if (user == null) { return false; }

                var role = context.Roles.SingleOrDefault(r => r.RoleName == roleName);
                if (role == null) { return false; }

                if (!user.Roles.Contains(role)) { return false; }

                user.Roles.Remove(role);

                return context.SaveChanges() > -1;

            }

        }
    }


}
