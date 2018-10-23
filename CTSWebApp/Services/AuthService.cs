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

        private AuthServiceAuthorizeResult AuthorizeInternalAsync(string email, string password)
        {
            // Check user in DB
            AuthServiceAuthorizeResult errorResult = new AuthServiceAuthorizeResult
            {
                IsSucceeded = false,
                ErrorMessage = "Logon attempt failed. Invalid user id or bad password. Contact System adminstrator !."
            };

            var userIdentity = _idenityBLL.ValidateUser(email, password);
            if (userIdentity != null && userIdentity.Locked == false)
            {
                // Validate the password 
                if ( ! PasswordValid(password, userIdentity))
                {
                    return errorResult;
                }

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
                    Email = userIdentity.Email,
                    Locked = userIdentity.Locked,
                    ResetPassword = userIdentity.ResetPassword,
                    IsSucceeded = true,
                    ErrorMessage = string.Empty
                };

                return result;
            }

            return errorResult;
        }

        private bool PasswordValid(string password, UserIdentity userIdentity)
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
