﻿using System.Collections.Generic;
using CTSWebApp.Data.Entities;

namespace CTSWebApp.Data
{
    public interface ICTSDBRepository
    {
        //IEnumerable<object> CTSUsers { get; }

        IEnumerable<CTSUser> GetAllCTSUsers();
        IEnumerable<CTSUser> GetAllTeachers();
        CTSUser GetCTSUserById(int id);

        UserIdentity GetUserIdentity(string email, string password);
        IEnumerable<string> GetUserRoles(int ctsUserId);
        //UserIdentity ValidateUser(string email, string password);
        bool UpdatePassword(int ctsUserId, string email, byte[] hash, string hashedPassword);

        TeacherAssignment GetTeacherAssignment(int teacherID);
        IEnumerable<StudentEnrollment> GetAssignedStudents(int teacherID);
        IEnumerable<StudentWeekGrade> GetAssignedStudentsWeekGrade(int teacherId, int weekId);
        IEnumerable<StudentTermScore> GetAssignedStudentsTermScore(int teacherID, int termNo, int weekId);

        CTSUser SaveOrUpdate(CTSUser teacher);

        IEnumerable<Student> GetAllStudents(bool includeInActive = false);
        IEnumerable<CalendarWeek> GetCalendarWeeks(bool includeInActive = false);
        IEnumerable<CalendarWeek> GetCalendarTestWeeks(bool includeInActive = false);

        IEnumerable<Grade> GetGrades();
        IEnumerable<Teacher> GetAssignedTeacher(string grade, int weekId);
        IEnumerable<Teacher> GetAssignedTeacher(int teacherId, int weekId);

        StudentWeekGradeResult SaveStudentWeekGrades(IEnumerable<StudentWeekGrade> studentWeekGrades);
    }
}