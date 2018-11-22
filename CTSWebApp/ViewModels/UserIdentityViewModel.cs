using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.ViewModels
{
    public class UserIdentityViewModel
    {
        [Required(ErrorMessage = "Email cannot be empty")]
        [EmailAddress(ErrorMessage="Invalid Email")]
        [MinLength(5, ErrorMessage = "Invalid Email")]
        [MaxLength(250, ErrorMessage = "Invalid Email")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Password cannot be empty")]
        [MinLength(8, ErrorMessage = "Invalid Password")]
        [MaxLength(25, ErrorMessage = "Invalid Password")]
        public string Password { get; set; }
        public string UserName { get; set; }
        public string ErrorMessage { get; set; }
        public bool AccountLocked { get; set; }
        public bool ResetPassword { get; set; }
    }
}
