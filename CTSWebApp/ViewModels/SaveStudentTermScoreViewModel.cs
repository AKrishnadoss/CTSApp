using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.ViewModels
{
    public class SaveStudentTermScoreViewModel
    {
        public string GradeLevel { get; set; }
        public IEnumerable<StudentTermScoreViewModel> StudentTermScoreViewModelList { get; set; }
    }
}
