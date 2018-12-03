using CTSWebApp.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.BLL
{
    public interface IStudentBLL
    {
        IEnumerable<Student> GetAllStudents(bool includeInActive = false);
        StudentErrorResult SaveStudentWeekGrades(int ctsUserId, string gradeLevel, IEnumerable<StudentWeekGrade> studentWeekGrades);
        StudentErrorResult SaveStudentTermScores(int ctsUserId, IEnumerable<StudentTermScore> studentTermScores);
    }
}
