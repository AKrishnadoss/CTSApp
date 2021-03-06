﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CTSWebApp.Data;
using CTSWebApp.Data.Entities;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Caching.Memory;

namespace CTSWebApp.BLL
{
    public class CalendarBLL : ICalendarBLL
    {
        private readonly ILogger<CalendarBLL> _logger;
        private readonly ICTSDBRepository _ctsDBRepository;
        private IMemoryCache _memoryCache;

        public CalendarBLL(ICTSDBRepository ctsDBRepository,
            ILogger<CalendarBLL> logger,
            IMemoryCache memoryCache)
        {
            _logger = logger;
            this._ctsDBRepository = ctsDBRepository;
            this._memoryCache = memoryCache;
        }
        public IEnumerable<CalendarWeek> GetCalendarWeeks(bool includeInactive)
        {
            IEnumerable<CalendarWeek> dataFromCache = null;
            if ( !_memoryCache.TryGetValue("CalendarWeek",out dataFromCache))
            {
                var calendarWeeks = this._ctsDBRepository.GetCalendarWeeks(true);

                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetSlidingExpiration(TimeSpan.FromHours(1));

                _memoryCache.Set("CalendarWeek", calendarWeeks, cacheEntryOptions);

                dataFromCache = calendarWeeks;
            }

            if (includeInactive == true)
            {
                // return all CalendarWeek
                return dataFromCache.ToList();
            }
            else
            {
                // return only 'Active' CalendarWeek
                return dataFromCache
                    .Where(s => s.Active == "Y" && s.WeekDate <= DateTime.Today)
                    .OrderByDescending(s => s.WeekDate)
                    .ToList();
            }

            //return this._ctsDBRepository.GetCalendarWeeks(includeInactive);
        }

        public IEnumerable<CalendarWeek> GetCalendarTestWeeks()
        {
            IEnumerable<CalendarWeek> dataFromCache = null;
            if (!_memoryCache.TryGetValue("CalendarTestWeek", out dataFromCache))
            {
                var calendarTestWeeks = this._ctsDBRepository.GetCalendarTestWeeks();

                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetSlidingExpiration(TimeSpan.FromHours(1));

                _memoryCache.Set("CalendarTestWeek", calendarTestWeeks, cacheEntryOptions);

                dataFromCache = calendarTestWeeks;
            }

            // return all Calendar Test Week
            return dataFromCache.ToList();
        }

        public CalendarWeek GetCalendarWeek(int weekId)
        {
            IEnumerable<CalendarWeek> calendarWeeks = GetCalendarWeeks(true);
            CalendarWeek calendarWeek = calendarWeeks.Where(x => x.ID == weekId).FirstOrDefault();
            return calendarWeek;
        }

        public CalendarWeek GetCurrentCalendarWeek(int termNo)
        {
            DateTime today = DateTime.Today;
            IEnumerable<CalendarWeek> calendarWeeks = GetCalendarWeeks(false);
            List< CalendarWeek> filteredWeeks = calendarWeeks
                .Where(x => x.WeekDate < today && x.TermNo == termNo && x.TestWeek == "N")
                .OrderByDescending(x => x.WeekDate)
                .ToList();

            if (filteredWeeks != null && filteredWeeks.Count > 0)
            {
                return filteredWeeks[0];
            }
            return null;

        }
    }
}
