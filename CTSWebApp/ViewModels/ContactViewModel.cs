using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.ViewModels
{
    public class ContactViewModel
    {
        [Required]
        [MinLength(5)]
        public string UserName { get; set; }
        [Required]
        [EmailAddress]
        public string UserEmail { get; set; }
        [Required]
        [MaxLength(100, ErrorMessage ="Subject cannot exceed 100 characters")]
        public string Subject { get; set; }
        [Required]
        [MaxLength(250, ErrorMessage ="Message cannot exceed 250 characters")]
        public string Message { get; set; }
    }
}
