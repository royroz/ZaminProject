using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Zamin.Models
{
    public class WebsiteUser
    {
        public int Id { get; set; }

        public String Username { get; set; }

        public String Email { get; set; }

        public String Password { get; set; }

        public String FirstName { get; set; }
        public String LastName { get; set; }

        public String Phone { get; set; }
        

    }
}
