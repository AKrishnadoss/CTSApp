using CTSWebApp.Data;
using CTSWebApp.Data.Entities;
using CTSWebApp.ViewModels;
using Microsoft.Extensions.Caching.Memory;
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
        private IMemoryCache _memoryCache;

        public IdentityBLL(ICTSDBRepository ctsDBRepository,
            ILogger<IdentityBLL> logger,
            IMemoryCache memoryCache)
        {
            _logger = logger;
            this._ctsDBRepository = ctsDBRepository;
            this._memoryCache = memoryCache;
        }

        public UserIdentity ValidateUser(string email, string password)
        {
            UserIdentity userIdentity = null;
            if (IsValidUserId(email))
            {
                userIdentity = _ctsDBRepository.GetUserIdentity(email, password);
            }
            return userIdentity;
        }

        public UserIdentity ValidateUser(string email, string familyID, string primaryPhone)
        {
            UserIdentity userIdentity = null;
            if (IsValidUserId(email))
            {
                userIdentity = _ctsDBRepository.GetUserIdentity(email, familyID, primaryPhone);
            }
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

        public bool IsValidLogonUser(int ctsUserId)
        {
            IEnumerable<CTSUser> dataFromCache = null;
            if (!_memoryCache.TryGetValue("ValidAndLogonUsers", out dataFromCache))
            {
                var validAndlogonUsers = this._ctsDBRepository.GetValidAndLogonUsers();

                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetSlidingExpiration(TimeSpan.FromHours(1));

                _memoryCache.Set("ValidAndLogonUsers", validAndlogonUsers, cacheEntryOptions);

                dataFromCache = validAndlogonUsers;
            }

            bool result = false;
            if (dataFromCache != null && dataFromCache.Count() > 0)
            {
                var user = dataFromCache.Where(x => x.Id == ctsUserId).FirstOrDefault();
                if (user != null)
                {
                    result = true;
                }
            }
            return result;
        }

        private bool IsValidUserId(string email)
        {
            IEnumerable<CTSUser> dataFromCache = null;
            if (!_memoryCache.TryGetValue("ValidAndLogonUsers", out dataFromCache))
            {
                var validAndlogonUsers = this._ctsDBRepository.GetValidAndLogonUsers();

                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetSlidingExpiration(TimeSpan.FromHours(1));

                _memoryCache.Set("ValidAndLogonUsers", validAndlogonUsers, cacheEntryOptions);

                dataFromCache = validAndlogonUsers;
            }

            bool result = false;
            if (dataFromCache != null && dataFromCache.Count() > 0 )
            {
                var user = dataFromCache.Where(x => x.Email == email.ToLower()).FirstOrDefault();
                if ( user != null)
                {
                    result = true;
                }
            }
            return result;
        }
    } 
}
