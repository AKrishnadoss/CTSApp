using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CTSWebApp.Data;
using Microsoft.Extensions.Logging;
using AutoMapper;
using CTSWebApp.Data.Entities;
using CTSWebApp.ViewModels;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CTSWebApp.Controllers.API
{
    [Route("api/[Controller]")]
    [ApiController]
    [Produces("application/json")]
    public class TeacherController : Controller
    {
        private readonly ICTSDBRepository _ctsDBRepository;
        private readonly ILogger<TeacherController> _logger;
        private readonly IMapper _mapper;

 
        public TeacherController(ICTSDBRepository ctsDBRepository, ILogger<TeacherController> logger, IMapper mapper)
        {
            this._ctsDBRepository = ctsDBRepository;
            this._logger = logger;
            this._mapper = mapper;
        }

        [HttpGet]
        [Route("allteachers")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult<IEnumerable<CTSUserViewModel>> GetAllTeachers()
        {
            try
            {
                var result = _mapper.Map<IEnumerable<CTSUser>, IEnumerable<CTSUserViewModel>>(_ctsDBRepository.GetAllTeachers());
                if (result != null)
                {
                    return Ok(result);
                }
                return NotFound();
            }
            catch (Exception exception)
            {
                _logger.LogError($"Exception occurred in GetAllTeachers() => {exception}");
                return BadRequest("Exception occurred in TeacherController.GetAllTeachers()");
            }
        }

        [HttpGet]
        [Route("teacherById/{teacherId:int}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult<CTSUserViewModel> GetTeacherById(int teacherId)
        {
            try
            {
                var ctsUser = _ctsDBRepository.GetCTSUserById(teacherId);
                if (ctsUser != null && ctsUser.Teacher == "Y")
                {
                    return Ok(_mapper.Map<CTSUser, CTSUserViewModel>(ctsUser));
                }
                return NotFound();
            }
            catch (Exception exception)
            {
                _logger.LogError($"Exception occurred in GetTeacherById() => {exception}");
                return BadRequest("Exception occurred in TeacherController.GetTeacherById()");
            }
        }


        [HttpGet]
        [Route("assignment/{id:int}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult<TeacherAssignment> GetTeacherAssignment(int id)
        {
            try
            {
                TeacherAssignment instance = _ctsDBRepository.GetTeacherAssignment(id);
                if (instance != null)
                {
                    return Ok(_mapper.Map<TeacherAssignment, TeacherAssignmentViewModel>(instance));
                }
                return NotFound();
            }
            catch (Exception exception)
            {
                _logger.LogError($"Exception occurred in GetTeacherAssignment() => {exception}");
                return BadRequest("Exception occurred in TeacherController.GetTeacherAssignment()");
            }
        }
    }
}
