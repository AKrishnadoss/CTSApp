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
        StudentWeekGradeResult SaveStudentWeekGrades(IEnumerable<StudentWeekGrade> studentWeekGrades);
    }
}
