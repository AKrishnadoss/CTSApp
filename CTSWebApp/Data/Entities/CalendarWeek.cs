using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.Data.Entities
{
    [Table("CalendarWeek")]
    public class CalendarWeek
    {
        [Key]
        public int ID { get; set; }
        public int CalendarYearID { get; set; }
        public int WeekNo { get; set; }
        public string Description { get; set; }
        public DateTime WeekDate { get; set; }
        public int TermNo { get; set; }
        public string Active { get; set; }
    }
}
