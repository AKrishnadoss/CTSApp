using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace CTSWebApp.ViewModels
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class ResetPasswordViewModel
    {
        [Required]
        public string Email { get; set; }
        [Required(ErrorMessage = "Old password cannot be empty")]
        [MinLength(8, ErrorMessage = "Invalid Email or wrong password")]
        [MaxLength(25, ErrorMessage = "Invalid Email or wrong password")]
        public string OldPassword { get; set; }
        [Required(ErrorMessage = "New password cannot be empty")]
        [MinLength(8, ErrorMessage = "Invalid Email or wrong password")]
        [MaxLength(25, ErrorMessage = "Invalid Email or wrong password")]
        public string NewPassword { get; set; }
        [Required(ErrorMessage="Confirm new password cannot be empty")]
        [MinLength(8, ErrorMessage = "Invalid Email or wrong password")]
        [MaxLength(25, ErrorMessage = "Invalid Email or wrong password")]
        [Compare("NewPassword", ErrorMessage="New Password do not match")]
        public string ConfirmNewPassword { get; set; }
        public string UserName { get; set; }
        public string ErrorMessage { get; set; }
        //public bool AccountLocked { get; set; }
        //public bool ResetPassword { get; set; }
    }
}