﻿using CTSWebApp.Data.Entities;
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
        IEnumerable<Teacher> GetAssignedTeacher(string grade, int weekId);
        IEnumerable<Teacher> GetAssignedTeacher(int teacherId, int weekId);
        IEnumerable<StudentEnrollment> GetAssignedStudents(int teacherID);
        IEnumerable<StudentWeekGrade> GetAssignedStudentsWeekGrade(int teacherID, int weekId, string gradeLevel);
        IEnumerable<StudentTermScore> GetAssignedStudentsTermScore(int teacherID, string gradeLevel, int termNo, int weekId);
        IEnumerable<CalendarWeek> GetMissingAttendanceWeeks(int teacherId);
    }
}
