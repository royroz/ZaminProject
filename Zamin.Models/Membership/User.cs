using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Zamin.Models.Membership;

namespace Zamin.Models.Membership
{
    public class User
    {
        public  int Id { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool Active { get; set; }

  



    }

}
