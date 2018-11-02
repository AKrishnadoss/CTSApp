using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.ViewModels
{
    public class StudentWeekGradeViewModel
    {
        public int ID { get; set; }
        [Required]
        public int StudentID { get; set; }
        [Required]
        public int CalendarWeekID { get; set; }
        [Required]
        public int TeacherID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Active { get; set; }
        public string CTSGrade { get; set; }
        public string CountyGrade { get; set; }
        public DateTime EnrollmentDate { get; set; }
        public DateTime? DateOfLeaving { get; set; }
        [Required]
        [RegularExpression("[YN]", ErrorMessage = "Attendance must be either 'Y' or 'N'")]
        [MaxLength(1, ErrorMessage = "Invalid attendance")]
        public string Attendance { get; set; }
        [Required]
        public short? Homework { get; set; }
        [Required]
        public short? Reading { get; set; }
        [Required]
        public short? Writing { get; set; }
        [Required]
        public short? Speaking { get; set; }
        [Required]
        public short? Behavior { get; set; }
        [Required]
        public short? Quiz { get; set; }

        [MinLength(0)]
        [MaxLength(100, ErrorMessage = "Notes cannot exceed 100 characters")]
        //[RegularExpression("[@#$%^&*(),?:{}|<>]", ErrorMessage = "Notes cannot contain special characters @#$%^&*(),?:{}|<>")]
        public string Notes { get; set; }
    }
}
