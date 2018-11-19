using Microsoft.Extensions.Logging;
using CTSWebApp.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace CTSWebApp.Data
{
    public class CTSDBRepository : ICTSDBRepository
    {
        private readonly CTSDBContext _dbContext;
        private readonly ILogger<CTSDBRepository> _logger;

        public CTSDBRepository(CTSDBContext dbContext, ILogger<CTSDBRepository> logger)
        {
            this._dbContext = dbContext;
            this._logger = logger;
        }

        public IEnumerable<CTSUser> GetAllCTSUsers()
        {
            _logger.LogInformation("CTSDBRepository.GetAllCTSUsers called");
            var results = _dbContext.CTSUsers
                .OrderBy(t => t.Id)
                .ToList();
            return results;
        }

        public IEnumerable<CTSUser> GetAllTeachers()
        {
            _logger.LogInformation("CTSDBRepository.GetAllTeachers called");

            string sql = "SELECT ID, FIRSTNAME, LASTNAME, EMAIL, PHONE, ACTIVE, GENDER, ADMIN, TEACHER, VOLUNTEER, "
                    + " FAMILYID, LOGONACCESS FROM CTSUSER WHERE TEACHER = 'Y'";

            var result = _dbContext.CTSUsers.FromSql(sql);
            if (result != null)
            {
                return result.ToList();
            }

            return null;
        }

        public CTSUser GetCTSUserById(int id)
        {
            _logger.LogInformation("CTSDBRepository.GetCTSUserById() Called");

            var result = _dbContext.CTSUsers
                .Where(t => t.Id == id)
                .FirstOrDefault();

            return result;
        }

        public CTSUser SaveOrUpdate(CTSUser teacher)
        {
            _logger.LogInformation("CTSDBRepository.SaveOrUpdate() Called");

            return teacher;
        }

        public UserIdentity GetUserIdentity(string email, string password)
        {
            _logger.LogInformation("CTSDBRepository.GetUserIdentity() called");
            List<SqlParameter> paramList = new List<SqlParameter>();
            paramList.Add(new SqlParameter
            {
                ParameterName = "@Email",
                SqlDbType = System.Data.SqlDbType.VarChar,
                SqlValue = email.ToLower()
            });

            paramList.Add(new SqlParameter
            {
                ParameterName = "@Result",
                SqlDbType = System.Data.SqlDbType.Int,
                Direction = System.Data.ParameterDirection.Output
            });

            paramList.Add(new SqlParameter
            {
                ParameterName = "@ErrorMessage",
                SqlDbType = System.Data.SqlDbType.VarChar,
                Direction = System.Data.ParameterDirection.Output,
                Size = 100
            });


            var result = _dbContext.UserIdentity.FromSql("EXEC VALIDATE_CTSUSERCRED @Email, @Result OUT, @ErrorMessage OUT", paramList.ToArray());
            UserIdentity userIdentity = null;
            if (result != null && result.ToList().Count > 0)
            {
                userIdentity = result.ToList()[0];
            }
            else {

                int returnCode = paramList[1].SqlValue != null ? int.Parse(paramList[1].SqlValue.ToString()) : 0;
                if (returnCode != 1)
                {
                    string errorMessage = paramList[2].SqlValue != null ? paramList[2].SqlValue.ToString() : "Error Occurred";
                    _logger.LogError("CTSDBRepository.GetUserIdentity() failed. Error Message = " + errorMessage);
                    return null;
                }
            }
            /*
            UserIdentity userIdentity = null;
            if (result != null && result.ToList().Count > 0)
            {
                userIdentity = result.ToList()[0];
            }
            */
            return userIdentity;
        }

        public IEnumerable<string> GetUserRoles(int ctsUserId)
        {
            List<string> roles = new List<string>();
            var ctsUser = _dbContext.CTSUsers.Where(user => user.Id == ctsUserId).FirstOrDefault();
            if (ctsUser != null)
            {
                StringBuilder builder = new StringBuilder();
                if (ctsUser.Admin == "Y")
                {
                    roles.Add("Admin");
                }

                if (ctsUser.Teacher == "Y")
                {
                    roles.Add("Teacher");
                }

                if (ctsUser.LeadTeacher == "Y")
                {
                    roles.Add("LeadTeacher");
                }

                if (ctsUser.SubTeacher == "Y")
                {
                    roles.Add("SubTeacher");
                }

                if (ctsUser.Volunteer == "Y")
                {
                    roles.Add("Volunteer");
                }
            }
            return roles;
        }

        public bool UpdatePassword(int ctsUserId, string email, byte[] hash, string hashedPassword)
        {
            SqlParameter[] sqlParams = new SqlParameter[7];

            sqlParams[0] = new SqlParameter();
            sqlParams[0].SqlDbType = System.Data.SqlDbType.Int;
            sqlParams[0].ParameterName = "@CTSUserID";
            sqlParams[0].Value = ctsUserId;

            sqlParams[1] = new SqlParameter();
            sqlParams[1].SqlDbType = System.Data.SqlDbType.VarChar;
            sqlParams[1].ParameterName = "@Password";
            sqlParams[1].Value = hashedPassword;

            sqlParams[2] = new SqlParameter();
            sqlParams[1].SqlDbType = System.Data.SqlDbType.VarChar;
            sqlParams[2].ParameterName = "@Hash";
            sqlParams[2].Value = Convert.ToBase64String(hash);

            sqlParams[3] = new SqlParameter();
            sqlParams[1].SqlDbType = System.Data.SqlDbType.VarChar;
            sqlParams[3].ParameterName = "@Locked";
            sqlParams[3].Value = "N";

            sqlParams[4] = new SqlParameter();
            sqlParams[4].SqlDbType = System.Data.SqlDbType.DateTime;
            sqlParams[4].ParameterName = "@LastLogin";
            sqlParams[4].Value = DateTime.Now;

            sqlParams[5] = new SqlParameter();
            sqlParams[5].SqlDbType = System.Data.SqlDbType.Int;
            sqlParams[5].ParameterName = "@Result";
            sqlParams[5].Direction = System.Data.ParameterDirection.Output;

            sqlParams[6] = new SqlParameter();
            sqlParams[1].SqlDbType = System.Data.SqlDbType.VarChar;
            sqlParams[6].ParameterName = "@Error";
            sqlParams[6].Size = 100;
            sqlParams[6].Direction = System.Data.ParameterDirection.Output;

            int rowsAffected = _dbContext.Database.ExecuteSqlCommand("EXEC SAVE_CTSUSERCRED @CTSUserID, @Password, @Hash, @Locked, @LastLogin, @Result OUT, @Error OUT", sqlParams.ToArray());
            int returnCode = sqlParams[5].SqlValue != null ? int.Parse(sqlParams[5].SqlValue.ToString()) : 0;
            if (returnCode != 1)
            {
                string errorMessage = sqlParams[6].SqlValue != null ? sqlParams[6].SqlValue.ToString() : "Error Occurred";
                _logger.LogError("CTSDBRepository.UpdatePassword() failed. Error Message = " + errorMessage);
                return false;
            }
            return true;
        }


        public TeacherAssignment GetTeacherAssignment(int teacherID)
        {
            _logger.LogInformation("CTSDBRepository.GetTeacherAssignment() called");

            List<SqlParameter> paramList = new List<SqlParameter>();
            paramList.Add(new SqlParameter
            {
                ParameterName = "@teacherId",
                SqlDbType = System.Data.SqlDbType.Int,
                SqlValue = teacherID
            });

            string sql = "SELECT CY.ID CalendarYearID, CY.CalendarYear CalendarYear, TA.TeacherID, TA.CTSGrade CTSGrade " +
                 " FROM TeacherAssignment TA JOIN CalendarYear CY ON TA.CalendarYearID = CY.ID " +
                " AND AND CY.ACTIVEYEAR = 'Y' AND TA.TeacherID = @teacherId";

            var result = _dbContext.TeacherAssignment.FromSql(sql, paramList.ToArray());
            if ( result != null && result.Count() > 0)
            {
                return result.ToList()[0];
            }

            return null;
        }

        public IEnumerable<StudentEnrollment> GetAssignedStudents(int teacherId)
        {
            _logger.LogInformation("CTSDBRepository.GetAssignedStudents() called");

            List<SqlParameter> paramList = new List<SqlParameter>();
            paramList.Add(new SqlParameter
            {
                ParameterName = "@teacherId",
                SqlDbType = System.Data.SqlDbType.Int,
                SqlValue = teacherId
            });


            string sql = "SELECT SE.ID ID, S.ID STUDENTID, SE.CALENDARYEARID, SE.TEACHERID, S.FIRSTNAME FIRSTNAME, S.LASTNAME LASTNAME, S.ACTIVE ACTIVE, "
                + " SE.CTSGRADE CTSGRADE, SE.COUNTYGRADE COUNTYGRADE, SE.ENROLLMENTDATE, SE.DATEOFLEAVING, SE.NOTES "
                + " FROM STUDENTENROLLMENT SE "
                + " JOIN STUDENT S ON S.ID = SE.STUDENTID "
                + " JOIN CALENDARYEAR CY ON CY.ID = SE.CALENDARYEARID AND "
                + " CY.ACTIVEYEAR = 'Y' AND "
                + " SE.TEACHERID = @teacherId ";

            var result = _dbContext.StudentEnrollment.FromSql(sql, paramList.ToArray());

            //var rr = _dbContext.Students
            //        .Include(s => s.StudentEnrollment);

            if (result != null)
            {
                return result.ToList();
            }

            return null;
        }


        public IEnumerable<Teacher> GetAssignedTeacher(string grade, int weekId)
        {
            /*string sql = "SELECT TA.TEACHERID ID, U.FIRSTNAME, U.LASTNAME, U.EMAIL, U.PHONE "
                        + "FROM CTSUSER U "
                        + "JOIN TEACHERASSIGNMENT TA ON U.ID = TA.TeacherID "
                        + "JOIN CALENDARYEAR CY ON CY.ID = TA.CalendarYearID "
                        + "AND CY.ACTIVEYEAR = 'Y' "
                        + "AND TA.CTSGRADE = @ctsGrade ";*/

            //Below query is for teacher drop down box population based on weekid and grade
            string sql = "SELECT TA.TEACHERID ID, U.FIRSTNAME, U.LASTNAME, U.EMAIL, U.PRIMARYPHONE, TA.CTSGRADE, TA.STARTDATE, TA.ENDDATE, CW.WEEKDATE "
                    + " FROM CTSUSER U "
                    + " JOIN TEACHERASSIGNMENT TA ON U.ID = TA.TeacherID "
                    + " JOIN CALENDARYEAR CY ON CY.ID = TA.CalendarYearID "
                    + " AND CY.ACTIVEYEAR = 'Y' "
                    + " JOIN CALENDARWEEK CW ON CY.ID = CW.CalendarYearID"
                    + " AND CW.ID = @weekId "
                    + " AND TA.StartDate <= CW.WeekDate "
                    + " AND (TA.ENDDATE IS NULL OR TA.ENDDATE >= CW.WEEKDATE) "
                    + " AND LOWER(TA.CTSGRADE) = @ctsGrade "
                    + " AND TA.Role IN('L','T') "
                    + " ORDER BY U.FirstName, U.LastName";


            List<SqlParameter> paramList = new List<SqlParameter>();
            paramList.Add(new SqlParameter
            {
                ParameterName = "@weekId",
                SqlDbType = System.Data.SqlDbType.Int,
                SqlValue = weekId
            });

            paramList.Add(new SqlParameter
            {
                ParameterName = "@ctsGrade",
                SqlDbType = System.Data.SqlDbType.VarChar,
                SqlValue = grade.ToLower()
            });

            var result = _dbContext.Teachers.FromSql(sql, paramList.ToArray());

            if (result != null)
            {
                return result.ToList();
            }
            return null;
        }

        public IEnumerable<Teacher> GetAssignedTeacher(int teacherId, int weekId)
        {

            //Below query is for teacher drop down box population based on weekid and grade
            //string sql = "SELECT TA.TEACHERID ID, U.FIRSTNAME, U.LASTNAME, U.EMAIL, U.PRIMARYPHONE, TA.CTSGRADE, TA.STARTDATE, TA.ENDDATE, CW.WEEKDATE "
            //        + " FROM CTSUSER U "
            //        + " JOIN TEACHERASSIGNMENT TA ON U.ID = TA.TeacherID "
            //        + " JOIN CALENDARYEAR CY ON CY.ID = TA.CalendarYearID "
            //        + " AND CY.ACTIVEYEAR = 'Y' "
            //        + " JOIN CALENDARWEEK CW ON CY.ID = CW.CalendarYearID"
            //        + " AND U.ID = @teacherId "
            //        + " AND CW.ID = @weekId "
            //        + " AND TA.StartDate <= CW.WeekDate "
            //        + " AND (TA.ENDDATE IS NULL OR TA.ENDDATE >= CW.WEEKDATE) "
            //        //+ " AND LOWER(TA.CTSGRADE) = @ctsGrade "
            //        + " AND TA.Role IN('L','T') "
            //        + " ORDER BY U.FirstName, U.LastName";

            List<SqlParameter> paramList = new List<SqlParameter>();

            paramList.Add(new SqlParameter
            {
                ParameterName = "@teacherId",
                SqlDbType = System.Data.SqlDbType.Int,
                SqlValue = teacherId
            });

            paramList.Add(new SqlParameter
            {
                ParameterName = "@weekId",
                SqlDbType = System.Data.SqlDbType.Int,
                SqlValue = weekId
            });

            paramList.Add(new SqlParameter
            {
                ParameterName = "@Result",
                SqlDbType = System.Data.SqlDbType.Int,
                Direction = System.Data.ParameterDirection.Output
            });

            paramList.Add(new SqlParameter
            {
                ParameterName = "@ErrorMessage",
                SqlDbType = System.Data.SqlDbType.VarChar,
                Direction = System.Data.ParameterDirection.Output,
                Size = 100
            });

            var result = _dbContext.Teachers.FromSql("EXEC SELECT_ASSIGNEDTEACHER @teacherId, @weekId, @Result OUT, @ErrorMessage OUT", paramList.ToArray());
            if (result != null && result.ToList().Count > 0)
            {
                return result.ToList();
            }
            else
            {

                int returnCode = paramList[1].SqlValue != null ? int.Parse(paramList[1].SqlValue.ToString()) : 0;
                if (returnCode != 1)
                {
                    string errorMessage = paramList[2].SqlValue != null ? paramList[2].SqlValue.ToString() : "Error Occurred";
                    _logger.LogError("CTSDBRepository.GetAssignedTeacher() failed. Error Message = " + errorMessage);
                }
            }

            return null;
        }


        public IEnumerable<StudentWeekGrade> GetAssignedStudentsWeekGrade(int teacherId, int weekId)
        {
            _logger.LogInformation("CTSDBRepository.GetAssignedStudentsWeekGrade() called");

            List<SqlParameter> paramList = new List<SqlParameter>();
            paramList.Add(new SqlParameter
            {
                ParameterName = "@teacherId",
                SqlDbType = System.Data.SqlDbType.Int,
                SqlValue = teacherId
            });

            paramList.Add(new SqlParameter
            {
                ParameterName = "@weekId",
                SqlDbType = System.Data.SqlDbType.Int,
                SqlValue = weekId
            });

            // Below query is for populating student week grade grid population based on teacher and week
            /*string sql = "SELECT ISNULL(SWG.ID,0) ID, S.STUDENTID STUDENTID, ISNULL(CW.ID,@weekId) AS CALENDARWEEKID, SE.TEACHERID, S.FIRSTNAME FIRSTNAME, S.LASTNAME LASTNAME, S.ACTIVE ACTIVE, "
                    + " SE.CTSGRADE CTSGRADE, SE.COUNTYGRADE COUNTYGRADE, SE.STARTDATE, SE.ENDDATE, "
                    + "ISNULL(SWG.ATTENDANCE,10) ATTENDANCE, ISNULL(SWG.HOMEWORK,10) HOMEWORK, ISNULL(SWG.READING,10) READING, ISNULL(SWG.WRITING,10) WRITING, ISNULL(SWG.SPEAKING,10) SPEAKING, ISNULL(SWG.BEHAVIOR,10) BEHAVIOR, ISNULL(SWG.QUIZ,10) QUIZ, SWG.NOTES "
                    + "FROM STUDENTENROLLMENT SE "
                    + "JOIN STUDENT S ON S.STUDENTID = SE.STUDENTID "
                    + "AND SE.TEACHERID = @teacherId "
                    + "LEFT OUTER JOIN STUDENTWEEKGRADE SWG ON SWG.StudentID = S.STUDENTID "
                    + "AND SWG.CalendarWeekID = @weekId "
                    + "LEFT OUTER JOIN CALENDARWEEK CW ON CW.ID = SWG.CalendarWeekID "
                    + "ORDER BY S.FIRSTNAME , S.LASTNAME";
            */

            string sql = "SELECT ISNULL(SWG.ID,0) ID, S.STUDENTID STUDENTID, ISNULL(CW.ID,1) AS CALENDARWEEKID, TSA.TEACHERID, S.FIRSTNAME FIRSTNAME, S.LASTNAME LASTNAME, S.ACTIVE ACTIVE, "
                + "ISNULL(SWG.ATTENDANCE,10) ATTENDANCE, ISNULL(SWG.HOMEWORK,10) HOMEWORK, ISNULL(SWG.READING,10) READING, ISNULL(SWG.WRITING,10) WRITING, ISNULL(SWG.SPEAKING,10) SPEAKING, "
                + "ISNULL(SWG.BEHAVIOR,10) BEHAVIOR, ISNULL(SWG.QUIZ,10) QUIZ, SWG.NOTES, ISNULL(CW.DATAFREEZE,'N') DATAFREEZE "
                + "FROM TEACHERSTUDENTASSIGNMENT TSA "
                + "JOIN STUDENT S ON S.StudentID = TSA.STUDENTID "
                + "AND TSA.TEACHERID = @teacherId "
                + "JOIN CALENDARYEAR CY ON CY.ID = TSA.CalendarYearID "
                + "AND CY.ActiveYear = 'Y' "
                + "JOIN CALENDARWEEK CW ON CY.ID = CW.CalendarYearID "
                + "AND CW.ID = @weekId "
                + "AND TSA.STARTDATE <= CW.WEEKDATE "
                + "AND (TSA.ENDDATE IS NULL OR TSA.ENDDATE >= CW.WEEKDATE) "
                + "LEFT JOIN STUDENTWEEKGRADE SWG ON SWG.STUDENTID = S.STUDENTID "
                + "AND SWG.CalendarWeekID = CW.ID ";

            var result = _dbContext.StudentWeekGrade.FromSql(sql, paramList.ToArray());

            if (result != null)
            {
                return result.ToList();
            }

            return null;
        }

        public IEnumerable<StudentTermScore> GetAssignedStudentsTermScore(int teacherID, int termNo, int weekId)
        {
            _logger.LogInformation("CTSDBRepository.GetAssignedStudentsTermScore() called");
            List<SqlParameter> paramList = new List<SqlParameter>();
            paramList.Add(new SqlParameter
            {
                ParameterName = "@teacherId",
                SqlDbType = System.Data.SqlDbType.Int,
                SqlValue = teacherID
            });

            paramList.Add(new SqlParameter
            {
                ParameterName = "@termNo",
                SqlDbType = System.Data.SqlDbType.Int,
                SqlValue = termNo
            });

            paramList.Add(new SqlParameter
            {
                ParameterName = "@weekId",
                SqlDbType = System.Data.SqlDbType.Int,
                SqlValue = weekId
            });

            paramList.Add(new SqlParameter
            {
                ParameterName = "@Result",
                SqlDbType = System.Data.SqlDbType.Int,
                Direction = System.Data.ParameterDirection.Output
            });

            paramList.Add(new SqlParameter
            {
                ParameterName = "@ErrorMessage",
                SqlDbType = System.Data.SqlDbType.VarChar,
                Direction = System.Data.ParameterDirection.Output,
                Size = 100
            });


            var result = _dbContext.StudentTermScore.FromSql("EXEC SELECT_STUDENTTERMSCORE @teacherId, @termNo, @weekId, @Result OUT, @ErrorMessage OUT", paramList.ToArray());
            if (result != null )
            {
                return result.ToList();
            }
            else
            {

                int returnCode = paramList[2].SqlValue != null ? int.Parse(paramList[2].SqlValue.ToString()) : 0;
                if (returnCode != 1)
                {
                    string errorMessage = paramList[3].SqlValue != null ? paramList[3].SqlValue.ToString() : "Error Occurred";
                    _logger.LogError("CTSDBRepository.GetAssignedStudentsTermScore() failed. Error Message = " + errorMessage);
                }
            }
            return null;
        }

        public IEnumerable<Student> GetAllStudents(bool includeInActive = false)
        {
            IEnumerable<Student> result = null;
            if (includeInActive == true)
            {
                // return all students
                result = _dbContext.Students
                    .ToList();
            }
            else
            {
                // return only 'Active' Students
                result = _dbContext.Students
                    .Where(s => s.Active == "Y")
                    .ToList();
            }

            return result;
        }

        public IEnumerable<CalendarWeek> GetCalendarWeeks(bool includeInActive = false)
        {
            _logger.LogInformation("CTSDBRepository.GetCalendarWeeks() called");
            IEnumerable<CalendarWeek> result = null;
            if (includeInActive == true)
            {
                // return all CalendarWeek
                result = _dbContext.CalendarWeeks
                    .ToList();
            }
            else
            {
                // return only 'Active' CalendarWeek
                result = _dbContext.CalendarWeeks
                    .Where(s => s.Active == "Y")
                    .ToList();
            }

            return result;
        }

        public IEnumerable<CalendarWeek> GetCalendarTestWeeks(bool includeInActive = false)
        {
            //Below query is to populate test weeks grouping by term numbers/weekdate - needs to be refined
            _logger.LogInformation("CTSDBRepository.GetCalendarTestWeeks() called");
            string sql = "SELECT ID,CALENDARYEARID,WEEKNO, 'Term ' + CONVERT(VARCHAR, TERMNO) AS DESCRIPTION, WEEKDATE, TERMNO, ACTIVE "
                        + " FROM CALENDARWEEK WHERE WEEKDATE IN (SELECT MAX(WEEKDATE) FROM CALENDARWEEK GROUP BY TERMNO)";

            var result = _dbContext.CalendarWeeks.FromSql(sql);
            if (result != null)
            {
                return result.ToList();
            }

            return null;

        }

        public IEnumerable<Grade> GetGrades()
        {
            _logger.LogInformation("CTSDBRepository.GetGrades() called");
            IEnumerable<Grade> result = null;
               // return all CalendarWeek
                result = _dbContext.Grades
                    .ToList();
                 
            return result;
        }

        public StudentWeekGradeResult SaveStudentWeekGrades(IEnumerable<StudentWeekGrade> studentWeekGrades)
        {
            _logger.LogInformation("CTSDBRepository.SaveStudentWeekGrades() called");
            StudentWeekGradeResult studentWeekGradeResult = new StudentWeekGradeResult(true, "Sucess", new List<StudentWeekGradeError>());
            try
            {
                _dbContext.Database.BeginTransaction();

                foreach ( StudentWeekGrade swg in studentWeekGrades)
                {
                    StudentWeekGradeError result = SaveStudentWeekGrade(swg);
                    if ( result != null)
                    {
                        studentWeekGradeResult.Result = false;
                        studentWeekGradeResult.ErrorMessage = "Failed to Save data";
                        studentWeekGradeResult.StudentWeekGradeErrors.Add(result);
                    }
                }

                if (studentWeekGradeResult.Result == true)
                {
                    _dbContext.Database.CommitTransaction();
                    studentWeekGradeResult.StudentWeekGradeErrors = null;
                }
                else
                {
                    _dbContext.Database.RollbackTransaction();
                }

                return studentWeekGradeResult;
            }
            catch (Exception exception )
            {
                _dbContext.Database.RollbackTransaction();
                throw exception;
            }
        }

        private StudentWeekGradeError SaveStudentWeekGrade(StudentWeekGrade swg)
        {
            List<SqlParameter> paramList = new List<SqlParameter>();
            paramList.Add(new SqlParameter
            {
                ParameterName = "@StudentID",
                SqlDbType = System.Data.SqlDbType.VarChar,
                Size = 11,
                SqlValue = swg.StudentID
            });

            paramList.Add(new SqlParameter
            {
                ParameterName = "@CalendarWeekID",
                SqlDbType = System.Data.SqlDbType.Int,
                SqlValue = swg.CalendarWeekID
            });

            paramList.Add(new SqlParameter
            {
                ParameterName = "@Attendance",
                SqlDbType = System.Data.SqlDbType.SmallInt,
                SqlValue = swg.Attendance
            });

            paramList.Add(new SqlParameter
            {
                ParameterName = "@Homework",
                SqlDbType = System.Data.SqlDbType.SmallInt,
                SqlValue = swg.Homework
            });

            paramList.Add(new SqlParameter
            {
                ParameterName = "@Reading",
                SqlDbType = System.Data.SqlDbType.SmallInt,
                SqlValue = swg.Reading
            });

            paramList.Add(new SqlParameter
            {
                ParameterName = "@Writing",
                SqlDbType = System.Data.SqlDbType.SmallInt,
                SqlValue = swg.Writing
            });

            paramList.Add(new SqlParameter
            {
                ParameterName = "@Speaking",
                SqlDbType = System.Data.SqlDbType.SmallInt,
                SqlValue = swg.Speaking
            });

            paramList.Add(new SqlParameter
            {
                ParameterName = "@Behavior",
                SqlDbType = System.Data.SqlDbType.SmallInt,
                SqlValue = swg.Behavior
            });

            paramList.Add(new SqlParameter
            {
                ParameterName = "@Quiz",
                SqlDbType = System.Data.SqlDbType.SmallInt,
                SqlValue = swg.Quiz
            });

            
            paramList.Add(new SqlParameter
            {
                ParameterName = "@Notes",
                SqlDbType = System.Data.SqlDbType.VarChar,
                Size = 100,
                SqlValue = string.IsNullOrEmpty(swg.Notes) ? "" : swg.Notes
            });

            paramList.Add(new SqlParameter
            {
                ParameterName = "@Result",
                SqlDbType = System.Data.SqlDbType.Int,
                Direction = System.Data.ParameterDirection.Output
            });

            paramList.Add(new SqlParameter
            {
                ParameterName = "@ErrorMessage",
                SqlDbType = System.Data.SqlDbType.VarChar,
                Direction = System.Data.ParameterDirection.Output,
                Size = 100
            });

            var result = _dbContext.Database.ExecuteSqlCommand("EXEC SAVE_STUDENTWEEKGRADE @StudentID, @CalendarWeekID, @Attendance, " +
                "@Homework, @Reading, @Writing, @Speaking, @Behavior , @Quiz, @Notes, @Result OUT, @ErrorMessage OUT", paramList.ToArray());

            int returnCode = paramList[10].SqlValue != null ? int.Parse(paramList[10].SqlValue.ToString()) : 0;
            if (returnCode != 1)
            {
                string errorMessage = paramList[11].SqlValue != null ? paramList[11].SqlValue.ToString() : "Error Occurred";
                _logger.LogError("CTSDBRepository.SaveStudentWeekGrade() failed. Error Message = " + errorMessage);
                return new StudentWeekGradeError(swg.StudentID, errorMessage);
            }

            return null;
        }
    }
}
