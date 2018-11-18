using CTSWebApp.Data;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CTSWebApp.Data.Entities;

namespace CTSWebApp.BLL
{
    public class TeacherBLL : ITeacherBLL
    {
        private readonly ILogger<TeacherBLL> _logger;
        private readonly ICTSDBRepository _ctsDBRepository;

        public TeacherBLL(ICTSDBRepository ctsDBRepository,
            ILogger<TeacherBLL> logger)
        {
            _logger = logger;
            this._ctsDBRepository = ctsDBRepository;
        }

        public IEnumerable<CTSUser> GetAllTeachers()
        {
            return _ctsDBRepository.GetAllTeachers();
        }

        public CTSUser GetCTSUserById(int id)
        {
            CTSUser ctsUser = _ctsDBRepository.GetCTSUserById(id);
            if ( ctsUser != null && ctsUser.Teacher == "Y")
            {
                return ctsUser;
            }
            return null;
        }

        public TeacherAssignment GetTeacherAssignment(int teacherID)
        {
            return _ctsDBRepository.GetTeacherAssignment(teacherID);
        }

        public IEnumerable<Teacher> GetAssignedTeacher(string grade, int weekId)
        {
            return _ctsDBRepository.GetAssignedTeacher(grade, weekId);
        }

        public IEnumerable<Teacher> GetAssignedTeacher(int teacherId, int weekId)
        {
            return _ctsDBRepository.GetAssignedTeacher(teacherId, weekId);
        }

        public IEnumerable<StudentEnrollment> GetAssignedStudents(int teacherID)
        {
            return _ctsDBRepository.GetAssignedStudents(teacherID);
        }

        public IEnumerable<StudentWeekGrade> GetAssignedStudentsWeekGrade(int teacherID, int weekId)
        {
            return _ctsDBRepository.GetAssignedStudentsWeekGrade(teacherID, weekId);
        }

        public IEnumerable<StudentTermScore> GetAssignedStudentsTermScore(int teacherID, int weekId)
        {
            return _ctsDBRepository.GetAssignedStudentsTermScore(teacherID, weekId);
        }
    }
}
