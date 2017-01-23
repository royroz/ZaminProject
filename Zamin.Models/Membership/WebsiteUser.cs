using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Zamin.Enums;
using Zamin.Models.Content;

namespace Zamin.Models
{
    public class WebsiteUser
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }

        public Boolean IsMale { get; set; }

        public string Phone { get; set; }

        public DateTime? BirthdayDate { get; set; }

        public int UserTypeId { get; set; }

        [NotMapped]
        public UserType UserType
        {
            get { return (UserType)UserTypeId; }
            set { UserTypeId = (int)value; }
        }
        public bool Active { get; set; }


        private ICollection<Lesson> _lessons;
        public ICollection<Lesson> LessonsWatched
        {
            get { return _lessons ?? (_lessons = new List<Lesson>()); }
            set { _lessons = value; }
        }
         
        public DateTime? CreateDate { get; set; }
        

    }
}
