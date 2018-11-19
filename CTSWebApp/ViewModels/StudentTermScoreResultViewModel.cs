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
        public int? Attendance { get; set; }
        public int? Homework { get; set; }
        public int? Reading { get; set; }
        public int? Writing { get; set; }
        public int? Speaking { get; set; }
        public int? Behavior { get; set; }
        public int? Quiz { get; set; }
        public decimal? InternalScore { get; set; }
        [Required]
        public decimal? TermScore { get; set; }
        [Required]
        public decimal? TotalScore { get; set; }
        [MinLength(0)]
        [MaxLength(100, ErrorMessage = "Notes cannot exceed 100 characters")]
        public string Notes { get; set; }
        public int TermNo { get; set; }
        public string DataFreeze { get; set; }
    }
}
