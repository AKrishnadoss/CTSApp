using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using CTSWebApp.Data;
using CTSWebApp.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.IO;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;

namespace CTSWebApp.Controllers.API
{
    [Route("api/[Controller]")]
    [ApiController]
    [Produces("application/json")]
    public class AccountController : ControllerBase
    {
        private readonly ICTSDBRepository _ctsDBRepository;
        private readonly ILogger<AccountController> _logger;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public AccountController(ICTSDBRepository ctsDBRepository, ILogger<AccountController> logger, IMapper mapper,
            IConfiguration configuration) 
        {
            this._ctsDBRepository = ctsDBRepository;
            this._logger = logger;
            this._mapper = mapper;
            this._configuration = configuration;
        }

        public BinaryReader JwtRegisteredClaims { get; private set; }

        [HttpPost]
        public IActionResult Logon([FromBody]UserIdentityViewModel model)
        {
            if ( ModelState.IsValid)
            {
                // Validate the user and password with back end

                // Create the token
                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, model.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.UniqueName, model.Email)
                };

                var secret = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Token:Key"]));
                var cred = new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);

                JwtSecurityToken jwtSecToken = new JwtSecurityToken(
                    _configuration["Token:Issuer"],
                    _configuration["Token:Audience"],
                    claims,
                    expires: DateTime.UtcNow.AddMinutes(10),
                    signingCredentials: cred);

                var result = new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(jwtSecToken),
                    expiration = jwtSecToken.ValidTo
                };

                return Created("", result);
            }
            return BadRequest();
        }
    }
}
