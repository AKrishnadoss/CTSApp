using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.Data.Entities
{
    public class TeacherAssignment
    {
        [Key]
        public int TeacherId { get; set; }
        public int CalendarYearId { get; set; }
        public string CalendarYear { get; set; }
        public string CTSGrade { get; set; }
    }
}
