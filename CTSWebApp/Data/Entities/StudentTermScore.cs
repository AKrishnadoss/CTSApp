using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.Data.Entities
{
    public class StudentTermScore
    {
        [Key]
        public int ID { get; set; }
        [Key]
        public string StudentID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int CalendarWeekID { get; set; }
        public int TeacherID { get; set; }
        public short? Attendance { get; set; }
        public short? Homework { get; set; }
        public short? Reading { get; set; }
        public short? Writing { get; set; }
        public short? Speaking { get; set; }
        public short? Behavior { get; set; }
        public short? Quiz { get; set; }
        public short? Participation { get; set; }
        public decimal? InternalScore { get; set; }
        public decimal? TermScore { get; set; }
        public decimal? TotalScore { get; set; }
        public string Notes { get; set; }
        public int TermNo { get; set; }
        public string DataFreeze { get; set; }
    }
}
