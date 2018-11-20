using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.Data.Entities
{
    public class StudentErrorResult
    {
        public StudentErrorResult()
        {

        }

        public StudentErrorResult(bool result, string errorMessage)
        {
            this.Result = result;
            this.ErrorMessage = errorMessage;
            this.StudentErrors = null;
        }

        public StudentErrorResult(bool result, string errorMessage, List<StudentError> studentErrors)
        {
            this.Result = result;
            this.ErrorMessage = errorMessage;
            this.StudentErrors = studentErrors;
        }

        public bool Result { get; set; }
        public string ErrorMessage { get; set; }

        public List<StudentError> StudentErrors { get; set; }

       
    }

    public class StudentError
    {
        public StudentError()
        {

        }
        public StudentError(string studentID, string errorMessage)
        {
            this.StudentID = studentID;
            this.ErrorMessage = errorMessage;
        }

        public string StudentID { get; set; }
        public string ErrorMessage { get; set; }
    }
}
