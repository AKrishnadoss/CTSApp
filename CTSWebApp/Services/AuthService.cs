﻿using System;
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

        public async Task<AuthServiceAuthorizeResult> AuthorizeAsync(ForgotPasswordViewModel model)
        {
            _logger.LogInformation($"AuthorizeAsync Started");
            return await Task.Run<AuthServiceAuthorizeResult>(() =>
            {
                return AuthorizeInternalAsync(model);
            });
        }

        private AuthServiceAuthorizeResult AuthorizeInternalAsync(string email, string password)
        {
            return AuthenticateUser(email, password);
        }

        private AuthServiceAuthorizeResult AuthorizeInternalAsync(ResetPasswordViewModel model)
        {
            AuthServiceAuthorizeResult authServiceAuthorizeResult = AuthenticateUser(model.Email, model.OldPassword);
            if (authServiceAuthorizeResult != null && authServiceAuthorizeResult.IsSucceeded)
            {
                // Reset password
                // Get New hashed password
                byte[] salt = GetPasswordHash();
                string hashedPassword = GeneratePassword(model.ConfirmNewPassword, salt);

                // Save New Credentials
                bool res = _idenityBLL.UpdatePassword(authServiceAuthorizeResult.CTSUserID, model.Email, salt, hashedPassword);
                if (res == false)
                {
                    authServiceAuthorizeResult.IsSucceeded = false;
                    authServiceAuthorizeResult.ErrorMessage = "Password update failed. Contact System adminstrator !";
                }
            }
            return authServiceAuthorizeResult;
        }

        private AuthServiceAuthorizeResult AuthorizeInternalAsync(ForgotPasswordViewModel model)
        {
            // Check user in DB
            AuthServiceAuthorizeResult authResult = new AuthServiceAuthorizeResult
            {
                IsSucceeded = false,
                ErrorMessage = "Logon attempt failed. Invalid user id or bad password. Contact System adminstrator !."
            };

            var userIdentity = _idenityBLL.ValidateUser(model.Email, model.FamilyID, model.PrimaryPhone4Digits);
            if (userIdentity != null)
            {
                bool logonAccess = (!string.IsNullOrEmpty(userIdentity.LogonAccess) && (userIdentity.LogonAccess.ToUpper()) == "Y") ? true : false;
                if (!logonAccess)
                {
                    authResult.ErrorMessage = "Logon Access denied. Contact System adminstrator !.";
                    return authResult;
                }

                bool acctLocked = (!string.IsNullOrEmpty(userIdentity.Locked) && (userIdentity.Locked.ToUpper()) == "Y") ? true : false;
                if (acctLocked)
                {
                    authResult.IsSucceeded = false;
                    authResult.UserName = userIdentity.UserName;
                    authResult.Email = userIdentity.Email;
                    authResult.Locked = acctLocked;
                    authResult.ErrorMessage = "Account locked out. Contact System adminstrator !.";
                    return authResult;
                }

                // Get New hashed password
                byte[] salt = GetPasswordHash();
                string hashedPassword = GeneratePassword(model.ConfirmNewPassword, salt);

                // Save New Credentials
                bool result = _idenityBLL.UpdatePassword(userIdentity.CTSUserID, userIdentity.Email, salt, hashedPassword);
                if (result == true)
                {
                    authResult.IsSucceeded = true;
                    authResult.UserName = userIdentity.UserName;
                    authResult.Email = userIdentity.Email;
                    authResult.Locked = acctLocked;
                    authResult.ErrorMessage = "";
                }
                else
                {
                    authResult.ErrorMessage = "Password update failed. Contact System adminstrator !";
                }
            }
            return authResult;
        }

        private AuthServiceAuthorizeResult AuthenticateUser(string email, string password)
        {
            // Check user in DB
            AuthServiceAuthorizeResult errorResult = new AuthServiceAuthorizeResult
            {
                IsSucceeded = false,
                ErrorMessage = "Logon attempt failed. Invalid user id or bad password. Contact System adminstrator !"
            };

            var userIdentity = _idenityBLL.ValidateUser(email, password);
            if (userIdentity != null)
            {
                if ( userIdentity.Active == null || userIdentity.Password == null || userIdentity.Hash == null)
                {
                    return errorResult;
                }

                bool acctLocked = (!string.IsNullOrEmpty(userIdentity.Locked) && (userIdentity.Locked.ToUpper()) == "Y") ? true : false;

                if (acctLocked)
                {
                    return errorResult;
                }

                // Validate the password 
                if (!ValidatePassword(password, userIdentity))
                {
                    return errorResult;
                }

                //// GetUserRoles
                //var roles = _idenityBLL.GetUserRoles(userIdentity.CTSUserID);
                //string roleString = string.Join(",", roles.ToArray());

                // Create Claims
                var claims = new[]
                    {
                    new Claim("CTSUserID", userIdentity.CTSUserID.ToString()),
                    new Claim("UserName", userIdentity.UserName),
                    new Claim("Email", userIdentity.Email),
                    //new Claim("Roles", roleString),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

                // Create JWT
                var secret = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Token:Key"]));
                var cred = new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
                int days = int.Parse(_configuration["Token:expiryDays"]);
                var expiryDate = DateTime.Now.AddDays(days);
                //var expiryDate = DateTime.Now.AddMinutes(1);

                JwtSecurityToken jwtSecToken = new JwtSecurityToken(
                    _configuration["Token:Issuer"],
                    _configuration["Token:Audience"],
                    claims,
                    expires: expiryDate,
                    signingCredentials: cred);

                // Create Result object
                AuthServiceAuthorizeResult result = new AuthServiceAuthorizeResult
                {
                    CTSUserID = userIdentity.CTSUserID,
                    Token = new JwtSecurityTokenHandler().WriteToken(jwtSecToken),
                    Expires = expiryDate,
                    UserName = userIdentity.UserName,
                    Email = userIdentity.Email,
                    Locked = acctLocked,
                    ResetPassword = (!string.IsNullOrEmpty(userIdentity.ResetPassword) && userIdentity.ResetPassword.ToUpper() == "Y") ? true : false,
                    //Roles = roleString,
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

    }
}
