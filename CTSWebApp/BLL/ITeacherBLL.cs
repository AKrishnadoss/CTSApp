using CTSWebApp.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.BLL
{
    public interface ITeacherBLL
    {
        IEnumerable<CTSUser> GetAllTeachers();
        CTSUser GetCTSUserById(int id);
        TeacherAssignment GetTeacherAssignment(int teacherID);

        IEnumerable<StudentEnrollment> GetAssignedStudents(int teacherID);
        IEnumerable<StudentWeekGrade> GetAssignedStudentsWeekGrade(int teacherID, int weekId);
    }
}
