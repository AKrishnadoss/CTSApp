using CTSWebApp.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.BLL
{
    public interface ICalendarBLL
    {
        IEnumerable<CalendarWeek> GetCalendarWeeks(bool includeInactive=false);
    }
}
