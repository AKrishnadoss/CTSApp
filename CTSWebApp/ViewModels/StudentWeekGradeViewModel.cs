using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.ViewModels
{
    public class StudentWeekGradeViewModel
    {
        [Required]
        public int ID { get; set; }
        [Required]
        public string StudentID { get; set; }
        [Required]
        public int CalendarWeekID { get; set; }
        [Required]
        public int TeacherID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Active { get; set; }
        //public string CTSGrade { get; set; }
        //public string CountyGrade { get; set; }
        //public DateTime StartDate { get; set; }
        //public DateTime? EndDate { get; set; }
        [Required]
        public short? Attendance { get; set; }
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
        public string DataFreeze { get; set; }
    }
}
