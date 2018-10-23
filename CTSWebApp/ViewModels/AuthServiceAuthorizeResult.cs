using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.ViewModels
{
    public class AuthServiceAuthorizeResult
    {
        public string Token { get; set; }
        public DateTime Expires { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public bool Locked { get; set; }
        public bool ResetPassword { get; set; }
        public bool IsSucceeded { get; set; }
        public string ErrorMessage { get; set; }
    }
}
