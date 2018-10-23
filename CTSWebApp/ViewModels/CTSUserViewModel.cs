using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.ViewModels
{
    public class CTSUserViewModel
    {
        [Required]
        public int CTSUserId { get; set; }

        [Required]
        [MinLength(3,ErrorMessage = "FirstName must be atleast 3 characters in length")]
        [MaxLength(30, ErrorMessage = "FirstName cannot exceed 30 characters lin ength")]
        public string FirstName { get; set; }

        [Required]
        [MinLength(3, ErrorMessage = "LastName must be atleast 3 characters in length")]
        [MaxLength(30, ErrorMessage = "LastName cannot exceed 30 characters in length")]
        public string LastName { get; set; }

        [Required]
        [MaxLength(250, ErrorMessage = "Email cannot exceed 30 characters in length")]
        public string Email { get; set; }

        [Required]
        [MaxLength(10, ErrorMessage = "Phone cannot exceed 10 characters in length")]
        public string Phone { get; set; }

        [Required]
        [MaxLength(1, ErrorMessage = "Gender cannot exceed 1 character in length")]
        public string Gender { get; set; }

        [Required]
        [MaxLength(1, ErrorMessage = "Admin cannot exceed 1 character in length")]
        public string Admin { get; set; }

        [Required]
        [MaxLength(1, ErrorMessage = "Teacher cannot exceed 1 character in length")]
        public string Teacher { get; set; }

        [Required]
        [MaxLength(1, ErrorMessage = "Volunteer cannot exceed 1 character in length")]
        public string Volunteer { get; set; }

        [Required]
        [MaxLength(1, ErrorMessage = "Active cannot exceed 1 character in length")]
        public string Active { get; set; }
    }
}
