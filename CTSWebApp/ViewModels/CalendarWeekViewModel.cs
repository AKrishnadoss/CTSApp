using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.ViewModels
{
    public class CalendarWeekViewModel
    {
        public int ID { get; set; }
        public int CalendarYearID { get; set; }
        public int WeekNo { get; set; }
        public string Description { get; set; }
        public DateTime WeekDate { get; set; }
        public int TermNo { get; set; }
        public string Active { get; set; }

    }
}
