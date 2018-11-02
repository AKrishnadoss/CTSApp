﻿using CTSWebApp.Data;
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

        public StudentWeekGradeResult SaveStudentWeekGrades(IEnumerable<StudentWeekGrade> studentWeekGrades)
        {
            // Do Business Logic Data validation
            if (studentWeekGrades == null || studentWeekGrades.Count() == 0 )
            {
                return new StudentWeekGradeResult(false, "No StudentWeekGrade found to update");
            }

            List<StudentWeekGradeError> errors = new List<StudentWeekGradeError>();
            foreach (StudentWeekGrade swg in studentWeekGrades)
            {
                StudentWeekGradeError error = ValidateStudentWeekGrade(swg);
                if (error != null)
                {
                    errors.Add(error);
                }
            }

            if (errors.Count() > 0 )
            {
                return new StudentWeekGradeResult(false, "Invalid data", errors);
            }
            return _ctsDBRepository.SaveStudentWeekGrades(studentWeekGrades);
        }

        private StudentWeekGradeError ValidateStudentWeekGrade(StudentWeekGrade swg)
        {
            StringBuilder builder = new StringBuilder();
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


            if (builder.Length > 0)
            {
                StudentWeekGradeError error = new StudentWeekGradeError(swg.StudentID, builder.ToString());
                return error;
            }
            return null;
        }
    }
}
