using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CTSWebApp.ViewModels;
using Microsoft.Extensions.Logging;
using CTSWebApp.Data.Entities;
using AutoMapper;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using CTSWebApp.Data;
using CTSWebApp.BLL;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;

namespace CTSWebApp.Services
{
    public class AuthService : IAuthService
    {
        private readonly IIdentityBLL _idenityBLL;
        private readonly ILogger<AuthService> _logger;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public AuthService(IIdentityBLL idenityBLL, ILogger<AuthService> logger, IMapper mapper,
            IConfiguration configuration)
        {
            _idenityBLL = idenityBLL;
            _logger = logger;
            _mapper = mapper;
            _configuration = configuration;
        }

        public async Task<AuthServiceAuthorizeResult> AuthorizeAsync(UserIdentityViewModel model)
        {
            _logger.LogInformation($"AuthorizeAsync Started");
            return await Task.Run<AuthServiceAuthorizeResult>(() =>
            {
                return AuthorizeInternalAsync(model.Email, model.Password);
            });
        }

        public async Task<AuthServiceAuthorizeResult> AuthorizeAsync(ResetPasswordViewModel model)
        {
            _logger.LogInformation($"AuthorizeAsync Started");
            return await Task.Run<AuthServiceAuthorizeResult>(() =>
            {
                return AuthorizeInternalAsync(model);
            });
        }

        private AuthServiceAuthorizeResult AuthorizeInternalAsync(string email, string password)
        {
            // Check user in DB
            AuthServiceAuthorizeResult errorResult = new AuthServiceAuthorizeResult
            {
                IsSucceeded = false,
                ErrorMessage = "Logon attempt failed. Invalid user id or bad password. Contact System adminstrator !."
            };

            var userIdentity = _idenityBLL.ValidateUser(email, password);
            if (userIdentity != null )
            {
                bool acctLocked = (string.IsNullOrEmpty(userIdentity.Locked) || (userIdentity.Locked.ToUpper()) == "Y") ? true : false;

                if ( acctLocked)
                {
                    return errorResult;
                }

                // Validate the password 
                if ( !ValidatePassword(password, userIdentity))
                {
                    return errorResult;
                }

                // Create Claims
                var claims = new[]
                    {
                    new Claim(JwtRegisteredClaimNames.Sub, userIdentity.CTSUserID.ToString()),
                    new Claim(JwtRegisteredClaimNames.UniqueName, userIdentity.UserName),
                    new Claim(JwtRegisteredClaimNames.Email, userIdentity.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

                // Create JWT
                var secret = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Token:Key"]));
                var cred = new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);

                JwtSecurityToken jwtSecToken = new JwtSecurityToken(
                    _configuration["Token:Issuer"],
                    _configuration["Token:Audience"],
                    claims,
                    expires: DateTime.UtcNow.AddMinutes(10),
                    signingCredentials: cred);

                // Create Result object
                AuthServiceAuthorizeResult result = new AuthServiceAuthorizeResult
                {
                    Token = new JwtSecurityTokenHandler().WriteToken(jwtSecToken),
                    Expires = jwtSecToken.ValidTo,
                    UserName = userIdentity.UserName,
                    Email = userIdentity.Email,
                    Locked = acctLocked,
                    ResetPassword = (!string.IsNullOrEmpty(userIdentity.ResetPassword) && userIdentity.ResetPassword.ToUpper() == "Y") ? true : false,
                    IsSucceeded = true,
                    ErrorMessage = string.Empty
                };

                return result;
            }

            return errorResult;
        }

        private AuthServiceAuthorizeResult AuthorizeInternalAsync(ResetPasswordViewModel model)
        {
            // Check user in DB
            AuthServiceAuthorizeResult errorResult = new AuthServiceAuthorizeResult
            {
                IsSucceeded = false,
                ErrorMessage = "Reset Password attempt failed. Invalid user id or bad password. Contact System adminstrator !."
            };

            var userIdentity = _idenityBLL.ValidateUser(model.Email, model.OldPassword);
            if (userIdentity != null)
            {
                bool acctLocked = (string.IsNullOrEmpty(userIdentity.Locked) || (userIdentity.Locked.ToUpper()) == "Y") ? true : false;

                if (acctLocked)
                {
                    return errorResult;
                }

                // Validate the password 
                if (!ValidatePassword(model.OldPassword, userIdentity))
                {
                    return errorResult;
                }
                
                // Update the New password in db
                byte[] newHash = GetPasswordHash();
                string hashedPassword = GeneratePassword(model.NewPassword, newHash);
                if ( ! _idenityBLL.UpdatePassword(userIdentity.CTSUserID, model.Email, newHash, hashedPassword) )
                {
                    return errorResult;
                }
                

                // Create Claims
                var claims = new[]
                    {
                    new Claim(JwtRegisteredClaimNames.Sub, userIdentity.CTSUserID.ToString()),
                    new Claim(JwtRegisteredClaimNames.UniqueName, userIdentity.UserName),
                    new Claim(JwtRegisteredClaimNames.Email, userIdentity.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

                // Create JWT
                var secret = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Token:Key"]));
                var cred = new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);

                JwtSecurityToken jwtSecToken = new JwtSecurityToken(
                    _configuration["Token:Issuer"],
                    _configuration["Token:Audience"],
                    claims,
                    expires: DateTime.UtcNow.AddMinutes(10),
                    signingCredentials: cred);

                // Create Result object
                AuthServiceAuthorizeResult result = new AuthServiceAuthorizeResult
                {
                    Token = new JwtSecurityTokenHandler().WriteToken(jwtSecToken),
                    Expires = jwtSecToken.ValidTo,
                    UserName = userIdentity.UserName,
                    Email = userIdentity.Email,
                    Locked = acctLocked,
                    ResetPassword = (!string.IsNullOrEmpty(userIdentity.ResetPassword) && userIdentity.ResetPassword.ToUpper() == "Y") ? true : false,
                    IsSucceeded = true,
                    ErrorMessage = string.Empty
                };

                return result;
            }

            return errorResult;
        }

        private bool ValidatePassword(string password, UserIdentity userIdentity)
        {

            string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: Convert.FromBase64String(userIdentity.Hash),
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            if ( hashedPassword  == userIdentity.Password)
            {
                return true;
            }

            return false;
        }

        private byte[] GetPasswordHash()
        {
            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }
            return salt;
        }

        private string GeneratePassword(string password, byte[] salt)
        {
            // derive a 256-bit subkey (use HMACSHA1 with 10,000 iterations)
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            return hashed;
        }

        /*
        private AuthServiceAuthorizeResult AuthorizeInternalAsync_old(UserIdentity ui)
        {
            // Check user in DB
            var userIdentity = _ctsDBRepository.ValidateUser(ui.Email, ui.Password);
            if (userIdentity != null && userIdentity.Locked == false)
            {
                var claims = new[]
                    {
                    new Claim(JwtRegisteredClaimNames.Sub, userIdentity.UserName),
                    new Claim(JwtRegisteredClaimNames.UniqueName, userIdentity.UserName),
                    new Claim(JwtRegisteredClaimNames.Email, userIdentity.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

                var secret = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Token:Key"]));
                var cred = new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);

                JwtSecurityToken jwtSecToken = new JwtSecurityToken(
                    _configuration["Token:Issuer"],
                    _configuration["Token:Audience"],
                    claims,
                    expires: DateTime.UtcNow.AddMinutes(10),
                    signingCredentials: cred);

                AuthServiceAuthorizeResult result = new AuthServiceAuthorizeResult
                {
                    Token = new JwtSecurityTokenHandler().WriteToken(jwtSecToken),
                    Expires = jwtSecToken.ValidTo,
                    UserName = userIdentity.UserName,
                    Email = userIdentity.Email
                };

                return result;
            }
            return null;
        }
        */
    }
}
