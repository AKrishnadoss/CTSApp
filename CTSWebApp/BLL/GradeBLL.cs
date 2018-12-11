using CTSWebApp.Data;
using CTSWebApp.Data.Entities;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.BLL
{
    public class GradeBLL: IGradeBLL
    {
        private readonly ILogger<GradeBLL> _logger;
        private readonly ICTSDBRepository _ctsDBRepository;
        private IMemoryCache _memoryCache;

        public GradeBLL(ICTSDBRepository ctsDBRepository,
            ILogger<GradeBLL> logger,
            IMemoryCache memoryCache)
        {
            _logger = logger;
            this._ctsDBRepository = ctsDBRepository;
            this._memoryCache = memoryCache;
        }

        public IEnumerable<Grade> GetGrades(bool includeAll)
        {
            IEnumerable<Grade> dataFromCache = null;
            if (!_memoryCache.TryGetValue("Grades", out dataFromCache))
            {
                var grades = this._ctsDBRepository.GetGrades();

                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetSlidingExpiration(TimeSpan.FromHours(1));

                _memoryCache.Set("Grades", grades, cacheEntryOptions);

                dataFromCache = grades;
            }

            if (includeAll == true)
            {
                // return all Grades
                return dataFromCache.ToList();
            }
            else
            {
                // return only Level Grades
                return dataFromCache
                    .Where(s => ! string.IsNullOrEmpty(s.GradeLevel))
                    .ToList();
            }

            //return this._ctsDBRepository.GetGrades();
        }

        public IEnumerable<Grade> GetScoringGrades()
        {
            IEnumerable<Grade> dataFromCache = null;
            if (!_memoryCache.TryGetValue("Grades", out dataFromCache))
            {
                var grades = this._ctsDBRepository.GetGrades();

                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetSlidingExpiration(TimeSpan.FromHours(1));

                _memoryCache.Set("Grades", grades, cacheEntryOptions);

                dataFromCache = grades;
            }

            if (dataFromCache != null)
            {
                // return only L2 and L3 Grades
                return dataFromCache
                    .Where(s => s.GradeLevel != "L1")
                    .ToList();
            }

            return null;
        }
    }
}
