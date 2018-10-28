using CTSWebApp.Data;
using CTSWebApp.Data.Entities;
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

        public GradeBLL(ICTSDBRepository ctsDBRepository,
            ILogger<GradeBLL> logger)
        {
            _logger = logger;
            this._ctsDBRepository = ctsDBRepository;
        }

        public IEnumerable<Grade> GetGrades()
        {
            return this._ctsDBRepository.GetGrades();
        }
    }
}
