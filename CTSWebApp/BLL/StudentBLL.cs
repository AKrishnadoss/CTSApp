using CTSWebApp.Data;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CTSWebApp.Data.Entities;
using System.Text;

namespace CTSWebApp.BLL
{
    public class StudentBLL : IStudentBLL
    {
        private readonly ILogger<StudentBLL> _logger;
        private readonly ICTSDBRepository _ctsDBRepository;

        public StudentBLL(ICTSDBRepository ctsDBRepository,
            ILogger<StudentBLL> logger)
        {
            _logger = logger;
            this._ctsDBRepository = ctsDBRepository;
        }

        public IEnumerable<Student> GetAllStudents(bool includeInActive = false)
        {
            return _ctsDBRepository.GetAllStudents(includeInActive);
        }

        public StudentErrorResult SaveStudentWeekGrades(int ctsUserId, string gradeLevel, IEnumerable<StudentWeekGrade> studentWeekGrades)
        {
            // Do Business Logic Data validation
            if (studentWeekGrades == null || studentWeekGrades.Count() == 0 )
            {
                return new StudentErrorResult(false, "No StudentWeekGrade found to insert/update");
            }

            List<StudentError> errors = new List<StudentError>();
            foreach (StudentWeekGrade swg in studentWeekGrades)
            {
                StudentError error = ValidateStudentWeekGrade(gradeLevel, swg);
                if (error != null)
                {
                    errors.Add(error);
                }
            }

            if (errors.Count() > 0 )
            {
                return new StudentErrorResult(false, "Invalid data", errors);
            }
            return _ctsDBRepository.SaveStudentWeekGrades(ctsUserId, gradeLevel, studentWeekGrades);
        }

        public StudentErrorResult SaveStudentTermScores(int ctsUserId, string gradeLevel, IEnumerable<StudentTermScore> studentTermScores)
        {
            if (studentTermScores == null || studentTermScores.Count() == 0)
            {
                return new StudentErrorResult(false, "No StudentTermScore found to insert/update");
            }

            List<StudentError> errors = new List<StudentError>();
            foreach (StudentTermScore sts in studentTermScores)
            {
                StudentError error = ValidateStudentTermScore(sts);
                if (error != null)
                {
                    errors.Add(error);
                }
            }

            if (errors.Count() > 0)
            {
                return new StudentErrorResult(false, "Invalid data", errors);
            }
            return _ctsDBRepository.SaveStudentTermScores(ctsUserId, gradeLevel, studentTermScores);
        }

        private StudentError ValidateStudentWeekGrade(string gradeLevel, StudentWeekGrade swg)
        {
            StringBuilder builder = new StringBuilder();
            if ( swg.Attendance != 0 && swg.Attendance != 10)
            {
                builder.Append("Invalid Attendance: Attendance must be either 0 and 10.");
            }

            if (swg.Homework < 0 || swg.Homework > 10)
            {
                builder.Append("Invalid Homework: Homework must be between 0 and 10.");
            }

            if (swg.Reading < 0 || swg.Reading > 10)
            {
                builder.Append("Invalid Reading: Reading must be between 0 and 10.");
            }

            if (swg.Writing < 0 || swg.Writing > 10)
            {
                builder.Append("Invalid Writing: Writing must be between 0 and 10.");
            }

            if (swg.Speaking < 0 || swg.Speaking > 10)
            {
                builder.Append("Invalid Speaking: Speaking must be between 0 and 10.");
            }

            if (swg.Behavior < 0 || swg.Behavior > 10)
            {
                builder.Append("Invalid Behavior: Behavior must be between 0 and 10.");
            }

            if (swg.Quiz < 0 || swg.Quiz > 10)
            {
                builder.Append("Invalid Quiz: Quiz must be between 0 and 10.");
            }
            if ( !string.IsNullOrEmpty(swg.Notes) && swg.Notes.Length > 100 )
            {
                builder.Append("Invalid Notes: Notes cannot exceed 100 characters.");
            }

            if (builder.Length > 0)
            {
                StudentError error = new StudentError(swg.StudentID, builder.ToString());
                return error;
            }
            return null;
        }

        private StudentError ValidateStudentTermScore(StudentTermScore sts)
        {
            StringBuilder builder = new StringBuilder();
            if (sts.TermScore < 0 || sts.TermScore > 150)
            {
                builder.Append("Invalid TermScore: TermScore must be between 0 and 150.");
            }

            
            if (!string.IsNullOrEmpty(sts.Notes) && sts.Notes.Length > 100)
            {
                builder.Append("Invalid Notes: Notes cannot exceed 100 characters.");
            }

            if (builder.Length > 0)
            {
                StudentError error = new StudentError(sts.StudentID, builder.ToString());
                return error;
            }
            return null;
        }
    }
}
