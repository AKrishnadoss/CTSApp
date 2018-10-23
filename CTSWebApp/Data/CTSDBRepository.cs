using Microsoft.Extensions.Logging;
using CTSWebApp.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

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
                SqlValue = email
            });

            paramList.Add(new SqlParameter
            {
                ParameterName = "@CTSUserId",
                SqlDbType = System.Data.SqlDbType.Int,
                Direction = System.Data.ParameterDirection.Output
            });

            paramList.Add(new SqlParameter
            {
                ParameterName = "@UserName",
                SqlDbType = System.Data.SqlDbType.VarChar,
                Direction = System.Data.ParameterDirection.Output,
                Size = 61
            });

            paramList.Add(new SqlParameter
            {
                ParameterName = "@Password",
                SqlDbType = System.Data.SqlDbType.VarChar,
                Direction = System.Data.ParameterDirection.Output,
                Size = 250
            });

            paramList.Add(new SqlParameter
            {
                ParameterName = "@Hash",
                SqlDbType = System.Data.SqlDbType.VarChar,
                Direction = System.Data.ParameterDirection.Output,
                Size = 50
            });

            paramList.Add(new SqlParameter
            {
                ParameterName = "@Locked",
                SqlDbType = System.Data.SqlDbType.VarChar,
                Direction = System.Data.ParameterDirection.Output,
                Size = 1
            });

            paramList.Add(new SqlParameter
            {
                ParameterName = "@LastLogin",
                SqlDbType = System.Data.SqlDbType.DateTime,
                Direction = System.Data.ParameterDirection.Output
            });

            paramList.Add(new SqlParameter
            {
                ParameterName = "@ResetPassword",
                SqlDbType = System.Data.SqlDbType.VarChar,
                Direction = System.Data.ParameterDirection.Output,
                Size = 1
            });

            paramList.Add(new SqlParameter
            {
                ParameterName = "@LogonCount",
                SqlDbType = System.Data.SqlDbType.Int,
                Direction = System.Data.ParameterDirection.Output
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

            _dbContext.Database.ExecuteSqlCommand("EXEC VALIDATE_CTSUSERCRED @Email, @CTSUserId OUT, @UserName OUT, @Password OUT, @Hash OUT, @Locked OUT, @LastLogin OUT, @ResetPassword OUT, @LogonCount OUT, @Result OUT, @ErrorMessage OUT", paramList.ToArray());

            int result = paramList[9].SqlValue != null ? int.Parse(paramList[9].SqlValue.ToString()) : 0;
            if ( result != 1 )
            {
                // TODO: Log the error
                string errorMessage = paramList[10].SqlValue != null ? paramList[10].SqlValue.ToString() : "Error Occurred";
                return null;
            }

            UserIdentity userIdentity = new UserIdentity
            {
                Email = email,
                CTSUserID = (paramList[1].SqlValue != null ? int.Parse(paramList[1].SqlValue.ToString()) : 0),
                UserName = (paramList[2].Value != null ? paramList[2].Value.ToString() : null),
                Password = (paramList[3].Value != null ? paramList[3].Value.ToString() : null),
                Hash = (paramList[4].Value != null ? paramList[4].Value.ToString() : null),
                Locked = (paramList[5].Value != null && paramList[5].Value.ToString().ToLower() == "y" ? true : false),
                ResetPassword = (paramList[7].Value != null && paramList[7].Value.ToString().ToLower() == "y" ? true : false),
                LogonCount = (paramList[8].Value != null ? int.Parse(paramList[8].Value.ToString()) : 0)

            };

            DateTime tempDate;
            if (paramList[6].Value != null && DateTime.TryParse(paramList[6].Value.ToString(), out tempDate))
            {
                userIdentity.LastLogin = tempDate;
            }

            return userIdentity;
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
    }
}
