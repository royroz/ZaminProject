using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Zamin.Models.Membership
{
    public class User
    {
        [Key]
        public virtual int UserId { get; set; }

        public virtual String Username { get; set; }

        public virtual String Email { get; set; }

        public virtual String Password { get; set; }

        public virtual String FirstName { get; set; }
        public virtual String LastName { get; set; }

        public virtual String Phone { get; set; }

        public virtual String Title { get; set; }


        public bool Active { get; set; }


        public virtual Boolean IsApproved { get; set; }
        public virtual int PasswordFailuresSinceLastSuccess { get; set; }
        public virtual DateTime? LastPasswordFailureDate { get; set; }
        public virtual DateTime? LastActivityDate { get; set; }
        public virtual DateTime? LastLockoutDate { get; set; }
        public virtual DateTime? LastLoginDate { get; set; }
        public virtual String ConfirmationToken { get; set; }
        public virtual DateTime? CreateDate { get; set; }
        public virtual Boolean IsLockedOut { get; set; }
        public virtual DateTime? LastPasswordChangedDate { get; set; }
        public virtual String PasswordVerificationToken { get; set; }
        public virtual DateTime? PasswordVerificationTokenExpirationDate { get; set; }
        //------------------//
        public string ResetPasswordCode { get; set; }
        public DateTime? ResetPasswordExpirationDate { get; set; }
        //----------------//

        private ICollection<Role> _roles;
        public ICollection<Role> Roles
        {
            get { return _roles ?? (_roles = new Collection<Role>()); }
            set { _roles = value; }
        }


    }

}
