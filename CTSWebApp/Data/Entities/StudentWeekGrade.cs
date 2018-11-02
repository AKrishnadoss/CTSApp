using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.Data.Entities
{
    public class StudentWeekGrade
    {

        [Key]
        public int ID { get; set; }
        [Key]
        public int StudentID { get; set; }
        public int CalendarWeekID { get; set; }
        public int TeacherID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Active { get; set; }
        public string CTSGrade { get; set; }
        public string CountyGrade { get; set; }
        public DateTime EnrollmentDate { get; set; }
        public DateTime? DateOfLeaving { get; set; }
        public string Attendance { get; set; }
        public short? Homework { get; set; }
        public short? Reading { get; set; }
        public short? Writing { get; set; }
        public short? Speaking { get; set; }
        public short? Behavior { get; set; }
        public short? Quiz { get; set; }
        public short? Notes { get; set; }
    }
}
