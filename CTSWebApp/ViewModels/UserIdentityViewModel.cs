using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.ViewModels
{
    public class UserIdentityViewModel
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        public string UserName { get; set; }
        public string ErrorMessage { get; set; }
        public bool AccountLocked { get; set; }
        public bool ResetPassword { get; set; }
    }
}
