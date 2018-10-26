using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.ViewModels
{
    public class StudentViewModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DoB { get; set; }
        public string Email { get; set; }
        public string CTSGrade { get; set; }
        public string CountyGrade { get; set; }
        public int FamilyId { get; set; }
        public string Active { get; set; }
    }
}
