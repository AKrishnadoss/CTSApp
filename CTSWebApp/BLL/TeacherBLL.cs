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
        private readonly ICalendarBLL _calendarBLL;

        public TeacherBLL(ICTSDBRepository ctsDBRepository,
            ILogger<TeacherBLL> logger,
            ICalendarBLL calendarBLL)
        {
            _logger = logger;
            this._ctsDBRepository = ctsDBRepository;
            this._calendarBLL = calendarBLL;
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

        public IEnumerable<StudentWeekGrade> GetAssignedStudentsWeekGrade(int teacherID, int weekId, string gradeLevel)
        {
            return _ctsDBRepository.GetAssignedStudentsWeekGrade(teacherID, weekId, gradeLevel);
        }

        public IEnumerable<StudentTermScore> GetAssignedStudentsTermScore(int teacherID, string gradeLevel, int termNo, int weekId)
        {
            CalendarWeek cw = _calendarBLL.GetCurrentCalendarWeek(termNo);
            if (cw != null )
            {
                weekId = cw.ID;
            }
            return _ctsDBRepository.GetAssignedStudentsTermScore(teacherID, gradeLevel, termNo, weekId);
        }

        public IEnumerable<CalendarWeek> GetMissingAttendanceWeeks(int teacherId)
        {
            return _ctsDBRepository.GetMissingAttendanceWeeks(teacherId);
        }
    }
}
