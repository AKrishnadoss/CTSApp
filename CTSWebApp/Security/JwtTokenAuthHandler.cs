using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;

namespace CTSWebApp.Security
{
    public class JwtTokenAuthHandler : AuthorizationHandler<JwtTokenAuthRequirement>
    {
        private readonly IConfiguration _configuration;

        public JwtTokenAuthHandler(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, JwtTokenAuthRequirement requirement)
        {
            if (context.User.Identity.IsAuthenticated)
            {

                if (ValidateClaims(context.User.Claims))
                {
                    context.Succeed(requirement);
                    return Task.CompletedTask;
                }
            }

            context.Fail();
            return Task.CompletedTask;
        }

        private bool ValidateClaims(IEnumerable<Claim> claims)
        {
            if (claims == null || claims.Count() == 0)
            {
                return false;
            }

            string issuer = _configuration["Token:Issuer"];
            string audience = _configuration["Token:Audience"];

            Claim claim = claims.Where(x => x.Type == JwtRegisteredClaimNames.Iss).FirstOrDefault();
            if ( claim == null || claim.Value != issuer)
            {
                return false;
            }

            claim = claims.Where(x => x.Type == JwtRegisteredClaimNames.Aud).FirstOrDefault();
            if (claim == null || claim.Value != audience)
            {
                return false;
            }

            claim = claims.Where(x => x.Type == "CTSUserID").FirstOrDefault();
            if (claim == null || string.IsNullOrEmpty(claim.Value) )
            {
                return false;
            }

            claim = claims.Where(x => x.Type == "UserName").FirstOrDefault();
            if (claim == null || string.IsNullOrEmpty(claim.Value))
            {
                return false;
            }

            claim = claims.Where(x => x.Type == "Email").FirstOrDefault();
            if (claim == null || string.IsNullOrEmpty(claim.Value))
            {
                return false;
            }

            Guid guid;
            claim = claims.Where(x => x.Type == JwtRegisteredClaimNames.Jti).FirstOrDefault();
            if (claim == null || string.IsNullOrEmpty(claim.Value) ||
                Guid.TryParse(claim.Value, out guid) == false)
            {
                return false;
            }

            long ticks;
            claim = claims.Where(x => x.Type == JwtRegisteredClaimNames.Exp).FirstOrDefault();
            if (claim == null || string.IsNullOrEmpty(claim.Value) || long.TryParse(claim.Value, out ticks) == false)
            {
                return false;
            }
            DateTime epochUtc = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            DateTime expUtc = epochUtc.AddSeconds(ticks);
            if ( DateTime.UtcNow > expUtc)
            {
                return false;
            }

            return true;
        }
    }
}
