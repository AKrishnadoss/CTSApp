using CTSWebApp.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.BLL
{
    public interface IIdentityBLL
    {
        UserIdentity ValidateUser(string email, string password);
        UserIdentity ValidateUser(string email, string familyID, string primaryPhone);
        bool UpdatePassword(int ctsUserId, string email, byte[] hash, string hashedPassword);
        IEnumerable<string> GetUserRoles(int ctsUserId);
        bool IsValidLogonUser(int ctsUserId);
    }
}
