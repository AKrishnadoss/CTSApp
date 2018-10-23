using CTSWebApp.Data;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CTSWebApp.Data.Entities;

namespace CTSWebApp.BLL
{
    public class TeacherBLL : ITeacherBLL
    {
        private readonly ILogger<TeacherBLL> _logger;
        private readonly ICTSDBRepository _ctsDBRepository;

        public TeacherBLL(ICTSDBRepository ctsDBRepository,
            ILogger<TeacherBLL> logger)
        {
            _logger = logger;
            this._ctsDBRepository = ctsDBRepository;
        }

        public TeacherAssignment GetTeacherAssignment(int teacherID)
        {
            return _ctsDBRepository.GetTeacherAssignment(teacherID);
        }
    }
}
