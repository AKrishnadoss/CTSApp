using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.ViewModels
{
    public class StudentTermScoreResultViewModel
    {
        public bool DataFreeze { get; set; }
        public bool TermScoreEntryAllowed { get; set; }
        public IEnumerable<StudentTermScoreViewModel> StudentTermScores { get; set; }
    }

    public class StudentTermScoreViewModel
    {
        [Required]
        public int ID { get; set; }
        [Required]
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
        [Required]
        public decimal? TermScore { get; set; }
        public decimal? TotalScore { get; set; }
        [MinLength(0)]
        [MaxLength(100, ErrorMessage = "Notes cannot exceed 100 characters")]
        public string Notes { get; set; }
        public int TermNo { get; set; }
        public string DataFreeze { get; set; }
    }
}
