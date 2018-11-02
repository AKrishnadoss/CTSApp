using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.Data.Entities
{
    public class UserIdentity
    {
        [Key]
        public int CTSUserID { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Hash { get; set; }
        public string Locked { get; set; }
        public DateTime? LastLogin { get; set; }
        public string ResetPassword { get; set; }
        public int LogonCount { get; set; }
        public string LogonAccess { get; set; }
        public string Active { get; set; }

    }
}
