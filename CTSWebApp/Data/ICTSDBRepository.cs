using System.Collections.Generic;
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
        //UserIdentity ValidateUser(string email, string password);

        TeacherAssignment GetTeacherAssignment(int teacherID);

        CTSUser SaveOrUpdate(CTSUser teacher);
    }
}