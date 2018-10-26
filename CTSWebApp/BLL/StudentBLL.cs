using CTSWebApp.Data;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CTSWebApp.Data.Entities;

namespace CTSWebApp.BLL
{
    public class StudentBLL : IStudentBLL
    {
        private readonly ILogger<StudentBLL> _logger;
        private readonly ICTSDBRepository _ctsDBRepository;

        public StudentBLL(ICTSDBRepository ctsDBRepository,
            ILogger<StudentBLL> logger)
        {
            _logger = logger;
            this._ctsDBRepository = ctsDBRepository;
        }

        public IEnumerable<Student> GetAllStudents(bool includeInActive = false)
        {
            return _ctsDBRepository.GetAllStudents(includeInActive);
        }
    }
}
