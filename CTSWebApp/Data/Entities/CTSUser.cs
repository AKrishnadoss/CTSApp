using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.Data.Entities
{
    [Table("CTSUser")]
    public class CTSUser
    {
        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PrimaryPhone { get; set; }
        public string SecondaryPhone { get; set; }
        public string Active { get; set; }
        public string Gender { get; set; }
        public string Admin { get; set; }
        public string Teacher { get; set; }
        public string LeadTeacher { get; set; }
        public string SubTeacher { get; set; }
        public string Volunteer { get; set; }
        public string DataEntry { get; set; }
        public string FamilyId { get; set; }
        public string LogonAccess { get; set; }
        //public string Password { get; set; }
        //public string Hash { get; set; }
        //public string Locked { get; set; }
        //public DateTime? LastLogin { get; set; }
        //public string ResetPassword { get; set; }
        //public int LogonCount { get; set; }
    }
}
