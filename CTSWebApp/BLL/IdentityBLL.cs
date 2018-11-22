using CTSWebApp.Data;
using CTSWebApp.Data.Entities;
using CTSWebApp.ViewModels;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.BLL
{
    public class IdentityBLL : IIdentityBLL
    {
        private readonly ILogger<IdentityBLL> _logger;
        private readonly ICTSDBRepository _ctsDBRepository;

        public IdentityBLL(ICTSDBRepository ctsDBRepository,
            ILogger<IdentityBLL> logger)
        {
            _logger = logger;
            this._ctsDBRepository = ctsDBRepository;
        }

        public UserIdentity ValidateUser(string email, string password)
        {
            UserIdentity userIdentity = _ctsDBRepository.GetUserIdentity(email, password);
            if (userIdentity == null)
            {
                return null;
            }

            // Additional logic?

            return userIdentity;
        }

        public UserIdentity ValidateUser(string email, string familyID, string primaryPhone)
        {
            UserIdentity userIdentity = _ctsDBRepository.GetUserIdentity(email, familyID, primaryPhone);
            if (userIdentity == null)
            {
                return null;
            }

            // Additional logic?

            return userIdentity;
        }

        public IEnumerable<string> GetUserRoles(int ctsUserId)
        {
            return _ctsDBRepository.GetUserRoles(ctsUserId);
        }

        public bool UpdatePassword(int ctsUserId, string email, byte[] hash, string hashedPassword)
        {
            return _ctsDBRepository.UpdatePassword(ctsUserId, email, hash, hashedPassword);
        }
    }
}
