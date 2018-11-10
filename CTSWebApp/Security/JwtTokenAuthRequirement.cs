using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.Security
{
    public class JwtTokenAuthRequirement : IAuthorizationRequirement
    {
        public JwtTokenAuthRequirement()
        {

        }


    }
}
