using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CTSWebApp.Data;
using CTSWebApp.Data.Entities;
using Microsoft.Extensions.Logging;

namespace CTSWebApp.BLL
{
    public class CalendarBLL : ICalendarBLL
    {
        private readonly ILogger<CalendarBLL> _logger;
        private readonly ICTSDBRepository _ctsDBRepository;

        public CalendarBLL(ICTSDBRepository ctsDBRepository,
            ILogger<CalendarBLL> logger)
        {
            _logger = logger;
            this._ctsDBRepository = ctsDBRepository;
        }
        public IEnumerable<CalendarWeek> GetCalendarWeeks(bool includeInactive)
        {
            return this._ctsDBRepository.GetCalendarWeeks(includeInactive);
        }
    }
}
