using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.ViewModels
{
    public class SaveStudentWeekGradeViewModel
    {
        public string GradeLevel { get; set; }
        public IEnumerable<StudentWeekGradeViewModel> StudentWeekGradeViewModelList { get; set; }
    }
}
