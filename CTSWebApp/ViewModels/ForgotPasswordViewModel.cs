using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.ViewModels
{
    public class ForgotPasswordViewModel
    {
        [Required]
        public string Email { get; set; }
        [Required(ErrorMessage = "Family ID cannot be empty")]
        [MinLength(11, ErrorMessage = "Invalid FamilyID")]
        [MaxLength(11, ErrorMessage = "Invalid FamilyID")]
        public string FamilyID { get; set; }
        [Required(ErrorMessage = "Last 4 digits of Primary Phone number cannot be empty")]
        [MinLength(4, ErrorMessage = "Invalid Phone number")]
        [MaxLength(4, ErrorMessage = "Invalid Phone number")]
        public string PrimaryPhone4Digits { get; set; }
        [Required(ErrorMessage = "New password cannot be empty")]
        [MinLength(8, ErrorMessage = "Invalid password")]
        [MaxLength(25, ErrorMessage = "Invalid password")]
        public string NewPassword { get; set; }
        [Required(ErrorMessage = "Confirm new password cannot be empty")]
        [MinLength(8, ErrorMessage = "Invalid password")]
        [MaxLength(25, ErrorMessage = "Invalid password")]
        [Compare("NewPassword", ErrorMessage = "New Passwords do not match")]
        public string ConfirmNewPassword { get; set; }
        public string UserName { get; set; }
        public string ErrorMessage { get; set; }
        //public bool AccountLocked { get; set; }
        //public bool ResetPassword { get; set; }
    }
}
