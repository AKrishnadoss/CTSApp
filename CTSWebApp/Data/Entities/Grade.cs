using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.Data.Entities
{

    [Table("GradeMaster")]
    public class Grade
    {
        [Key]
        public int ID { get; set; }
        public string CTSGrade { get; set; }
        public string CountyGrade { get; set; }
    }
}
