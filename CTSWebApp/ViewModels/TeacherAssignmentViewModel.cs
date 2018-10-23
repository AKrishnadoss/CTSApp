using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.ViewModels
{
    public class TeacherAssignmentViewModel
    {
        public int TeacherId { get; set; }
        public int CalendarYearId { get; set; }
        public string CalendarYear { get; set; }
        public string CTSGrade { get; set; }
    }
}
