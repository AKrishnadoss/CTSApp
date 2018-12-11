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

        public IEnumerable<CTSUser> GetValidAndLogonUsers()
        {
            _logger.LogInformation("CTSDBRepository.GetValidAndLogonUsers called");
            var results = _dbContext.CTSUsers
                .Where(t=>  t.Active == "Y" && t.LogonAccess == "Y")
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
            _logger.LogInformation("CTSDBRepository.GetUserIdentity(email,password) called");
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
                    _logger.LogError("CTSDBRepository.GetUserIdentity(email,password) failed. Error Message = " + errorMessage);
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

        public UserIdentity GetUserIdentity(string email, string familyID, string primaryPhone)
        {
            _logger.LogInformation("CTSDBRepository.GetUserIdentity(email,familyID,primaryPhone) called");
            List<SqlParameter> paramList = new List<SqlParameter>();
            paramList.Add(new SqlParameter
            {
                ParameterName = "@Email",
                SqlDbType = System.Data.SqlDbType.VarChar,
                Size = 250,
                SqlValue = email.ToLower()
            });

            paramList.Add(new SqlParameter
            {
                ParameterName = "@familyID",
                SqlDbType = System.Data.SqlDbType.VarChar,
                Size = 11,
                SqlValue = familyID
            });

            paramList.Add(new SqlParameter
            {
                ParameterName = "@primaryPhone",
                SqlDbType = System.Data.SqlDbType.VarChar,
                Size = 4,
                SqlValue = primaryPhone
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


            var result = _dbContext.UserIdentity.FromSql("EXEC VALIDATE_FAMILYCTSUSER @Email, @familyID, @primaryPhone, @Result OUT, @ErrorMessage OUT", paramList.ToArray());
            UserIdentity userIdentity = null;
            if (result != null && result.ToList().Count > 0)
            {
                userIdentity = result.ToList()[0];
            }
            else
            {

                int returnCode = paramList[3].SqlValue != null ? int.Parse(paramList[3].SqlValue.ToString()) : 0;
                if (returnCode != 1)
                {
                    string errorMessage = paramList[4].SqlValue != null ? paramList[4].SqlValue.ToString() : "Error Occurred";
                    _logger.LogError("CTSDBRepository.GetUserIdentity(email,familyID,primaryPhone) failed. Error Message = " + errorMessage);
                    return null;
                }
            }
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
            List<SqlParameter> paramList = new List<SqlParameter>();
            paramList.Add(new SqlParameter
            {
                SqlDbType = System.Data.SqlDbType.Int,
                ParameterName = "@CTSUserID",
                Value = ctsUserId
            });

            paramList.Add(new SqlParameter
            {
                SqlDbType = System.Data.SqlDbType.VarChar,
                ParameterName = "@Password",
                Value = hashedPassword
            });

            paramList.Add(new SqlParameter
            {
                SqlDbType = System.Data.SqlDbType.VarChar,
                ParameterName = "@Hash",
                Value = Convert.ToBase64String(hash)
            });

            paramList.Add(new SqlParameter
            {
                SqlDbType = System.Data.SqlDbType.VarChar,
                ParameterName = "@Locked",
                Value = "N"
            });

            paramList.Add(new SqlParameter
            {
                SqlDbType = System.Data.SqlDbType.DateTime,
                ParameterName = "@LastLogin",
                Value = DateTime.Now
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

            int rowsAffected = _dbContext.Database.ExecuteSqlCommand("EXEC SAVE_CTSUSERCRED @CTSUserID, @Password, @Hash, @Locked, @LastLogin, @Result OUT, @Error OUT", paramList.ToArray());
            int returnCode = paramList[5].SqlValue != null ? int.Parse(paramList[5].SqlValue.ToString()) : 0;
            if (returnCode != 1)
            {
                string errorMessage = paramList[6].SqlValue != null ? paramList[6].SqlValue.ToString() : "Error Occurred";
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
            string sql = "SELECT TA.TEACHERID ID, U.FIRSTNAME, U.LASTNAME, U.EMAIL, U.PRIMARYPHONE, TA.CTSGRADE, TA.STARTDATE, TA.ENDDATE, CW.WEEKDATE, GM.GRADELEVEL "
                    + " FROM CTSUSER U "
                    + " JOIN TEACHERASSIGNMENT TA ON U.ID = TA.TeacherID "
                    + " JOIN CALENDARYEAR CY ON CY.ID = TA.CalendarYearID "
                    + " AND CY.ACTIVEYEAR = 'Y' "
                    + " JOIN CALENDARWEEK CW ON CY.ID = CW.CalendarYearID "
                    + " JOIN GRADEMASTER GM ON GM.CTSGRADE = TA.CTSGRADE "
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


        public IEnumerable<StudentWeekGrade> GetAssignedStudentsWeekGrade(int teacherId, int weekId, string gradeLevel)
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

            paramList.Add(new SqlParameter
            {
                ParameterName = "@gradeLevel",
                SqlDbType = System.Data.SqlDbType.VarChar,
                Size = 2,
                SqlValue = gradeLevel
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

            /*
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

            */

            var result = _dbContext.StudentWeekGrade.FromSql("EXEC SELECT_STUDENTWEEKGRADE @teacherId, @weekId, @gradeLevel, @Result OUT, @ErrorMessage OUT", paramList.ToArray());
            if (result != null && result.ToList().Count > 0)
            {
                return result.ToList();
            }
            else
            {

                int returnCode = paramList[3].SqlValue != null ? int.Parse(paramList[3].SqlValue.ToString()) : 0;
                if (returnCode != 1)
                {
                    string errorMessage = paramList[4].SqlValue != null ? paramList[4].SqlValue.ToString() : "Error Occurred";
                    _logger.LogError("CTSDBRepository.GetAssignedStudentsWeekGrade() failed. Error Message = " + errorMessage);
                }
            }

            return null;
        }

        public IEnumerable<StudentTermScore> GetAssignedStudentsTermScore(int teacherID, string gradeLevel, int termNo, int weekId)
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
                ParameterName = "@gradeLevel",
                SqlDbType = System.Data.SqlDbType.VarChar,
                Size = 2,
                SqlValue = gradeLevel
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


            var result = _dbContext.StudentTermScore.FromSql("EXEC SELECT_STUDENTTERMSCORE @teacherId, @gradeLevel, @termNo, @weekId, @Result OUT, @ErrorMessage OUT", paramList.ToArray());
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
            //string sql = "SELECT ID,CALENDARYEARID,WEEKNO, 'Term ' + CONVERT(VARCHAR, TERMNO) AS DESCRIPTION, WEEKDATE, TERMNO, ACTIVE "
            //            + " FROM CALENDARWEEK WHERE TESTWEEK = 'Y'";

            var result = _dbContext.CalendarWeeks.Where(x => x.TestWeek == "Y");
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

        public StudentErrorResult SaveStudentWeekGrades(int ctsUserId, string gradeLevel, IEnumerable<StudentWeekGrade> studentWeekGrades)
        {
            _logger.LogInformation("CTSDBRepository.SaveStudentWeekGrades() called");
            StudentErrorResult studentWeekGradeResult = new StudentErrorResult(true, "Sucess", new List<StudentError>());
            try
            {
                _dbContext.Database.BeginTransaction();

                foreach ( StudentWeekGrade swg in studentWeekGrades)
                {
                    StudentError result = SaveStudentWeekGrade(ctsUserId, gradeLevel, swg);
                    if ( result != null)
                    {
                        studentWeekGradeResult.Result = false;
                        studentWeekGradeResult.ErrorMessage = "Failed to Save data";
                        studentWeekGradeResult.StudentErrors.Add(result);
                    }
                }

                if (studentWeekGradeResult.Result == true)
                {
                    _dbContext.Database.CommitTransaction();
                    studentWeekGradeResult.StudentErrors = null;
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

        public StudentErrorResult SaveStudentTermScores(int ctsUserId, string gradeLevel, IEnumerable<StudentTermScore> studentTermScores)
        {
            _logger.LogInformation("CTSDBRepository.SaveStudentTermScores() called");
            StudentErrorResult studentTermScoreResult = new StudentErrorResult(true, "Sucess", new List<StudentError>());
            try
            {
                _dbContext.Database.BeginTransaction();

                foreach (StudentTermScore sts in studentTermScores)
                {
                    StudentError result = SaveStudentTermScore(ctsUserId, gradeLevel, sts);
                    if (result != null)
                    {
                        studentTermScoreResult.Result = false;
                        studentTermScoreResult.ErrorMessage = "Failed to Save data";
                        studentTermScoreResult.StudentErrors.Add(result);
                    }
                }

                if (studentTermScoreResult.Result == true)
                {
                    _dbContext.Database.CommitTransaction();
                    studentTermScoreResult.StudentErrors = null;
                }
                else
                {
                    _dbContext.Database.RollbackTransaction();
                }

                return studentTermScoreResult;
            }
            catch (Exception exception)
            {
                _dbContext.Database.RollbackTransaction();
                throw exception;
            }
        }

        private StudentError SaveStudentWeekGrade(int ctsUserId, string gradeLevel, StudentWeekGrade swg)
        {
            List<SqlParameter> paramList = new List<SqlParameter>();
            paramList.Add(new SqlParameter
            {
                ParameterName = "@ctsUserID",
                SqlDbType = System.Data.SqlDbType.Int,
                SqlValue = ctsUserId
            });

            paramList.Add(new SqlParameter
            {
                ParameterName = "@gradeLevel",
                SqlDbType = System.Data.SqlDbType.VarChar,
                Size = 2,
                SqlValue = gradeLevel
            });

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
                ParameterName = "@Participation",
                SqlDbType = System.Data.SqlDbType.SmallInt,
                SqlValue = swg.Participation
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

            var result = _dbContext.Database.ExecuteSqlCommand("EXEC SAVE_STUDENTWEEKGRADE @ctsUserID, @gradeLevel, @StudentID, @CalendarWeekID, @Attendance, "
                + "@Homework, @Reading, @Writing, @Speaking, @Behavior , @Quiz, @Participation, @Notes, @Result OUT, @ErrorMessage OUT", paramList.ToArray());

            int returnCode = paramList[13].SqlValue != null ? int.Parse(paramList[13].SqlValue.ToString()) : 0;
            if (returnCode != 1)
            {
                string errorMessage = paramList[14].SqlValue != null ? paramList[14].SqlValue.ToString() : "Error Occurred";
                _logger.LogError("CTSDBRepository.SaveStudentWeekGrade() failed. Error Message = " + errorMessage);
                return new StudentError(swg.StudentID, errorMessage);
            }

            return null;
        }

        private StudentError SaveStudentTermScore(int ctsUserId, string gradeLevel, StudentTermScore sts)
        {
            List<SqlParameter> paramList = new List<SqlParameter>();
            paramList.Add(new SqlParameter
            {
                ParameterName = "@ctsUserID",
                SqlDbType = System.Data.SqlDbType.Int,
                SqlValue = ctsUserId
            });

            paramList.Add(new SqlParameter
            {
                ParameterName = "@gradeLevel",
                SqlDbType = System.Data.SqlDbType.VarChar,
                Size = 2,
                SqlValue = gradeLevel
            });

            paramList.Add(new SqlParameter
            {
                ParameterName = "@StudentID",
                SqlDbType = System.Data.SqlDbType.VarChar,
                Size = 11,
                SqlValue = sts.StudentID
            });

            paramList.Add(new SqlParameter
            {
                ParameterName = "@TeacherID",
                SqlDbType = System.Data.SqlDbType.Int,
                SqlValue = sts.TeacherID
            });

            paramList.Add(new SqlParameter
            {
                ParameterName = "@TermNo",
                SqlDbType = System.Data.SqlDbType.Int,
                SqlValue = sts.TermNo
            });

            paramList.Add(new SqlParameter
            {
                ParameterName = "@CalendarWeekID",
                SqlDbType = System.Data.SqlDbType.Int,
                SqlValue = sts.CalendarWeekID
            });

            paramList.Add(new SqlParameter
            {
                ParameterName = "@TermScore",
                SqlDbType = System.Data.SqlDbType.Decimal,
                Precision = 5,
                Scale = 2,
                SqlValue = sts.TermScore
            });

            paramList.Add(new SqlParameter
            {
                ParameterName = "@Notes",
                SqlDbType = System.Data.SqlDbType.VarChar,
                Size = 100,
                SqlValue = string.IsNullOrEmpty(sts.Notes) ? "" : sts.Notes
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

            var result = _dbContext.Database.ExecuteSqlCommand("EXEC SAVE_STUDENTTERMSCORE @ctsUserID, @gradeLevel, @StudentID, @TeacherID, @TermNo, @CalendarWeekID, @TermScore, "
                + " @Notes, @Result OUT, @ErrorMessage OUT", paramList.ToArray());

            int returnCode = paramList[8].SqlValue != null ? int.Parse(paramList[8].SqlValue.ToString()) : 0;
            if (returnCode != 1)
            {
                string errorMessage = paramList[9].SqlValue != null ? paramList[9].SqlValue.ToString() : "Error Occurred";
                _logger.LogError("CTSDBRepository.SaveStudentTermScore() failed. Error Message = " + errorMessage);
                return new StudentError(sts.StudentID, errorMessage);
            }

            return null;
        }
    }
}
