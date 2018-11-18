using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.Data.Entities
{
    public class StudentWeekGradeResult
    {
        public StudentWeekGradeResult()
        {

        }

        public StudentWeekGradeResult(bool result, string errorMessage)
        {
            this.Result = result;
            this.ErrorMessage = errorMessage;
            this.StudentWeekGradeErrors = null;
        }

        public StudentWeekGradeResult(bool result, string errorMessage, List<StudentWeekGradeError> studentWeekGradeErrors)
        {
            this.Result = result;
            this.ErrorMessage = errorMessage;
            this.StudentWeekGradeErrors = studentWeekGradeErrors;
        }

        public bool Result { get; set; }
        public string ErrorMessage { get; set; }

        public List<StudentWeekGradeError> StudentWeekGradeErrors { get; set; }

       
    }

    public class StudentWeekGradeError
    {
        public StudentWeekGradeError()
        {

        }
        public StudentWeekGradeError(string studentID, string errorMessage)
        {
            this.StudentID = studentID;
            this.ErrorMessage = errorMessage;
        }

        public string StudentID { get; set; }
        public string ErrorMessage { get; set; }
    }
}
