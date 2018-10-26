using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.Data.Entities
{
    public class StudentEnrollment
    {
        [Key]
        public int ID { get; set; }
        public int StudentID { get; set; }
        public int CalendarYearID { get; set; }
        public int TeacherID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Active { get; set; }
        public string CTSGrade { get; set; }
        public string CountyGrade { get; set; }
        public DateTime EnrollmentDate { get; set; }
        public DateTime? DateOfLeaving { get; set; }
        public string Notes { get; set; }

    }
}
