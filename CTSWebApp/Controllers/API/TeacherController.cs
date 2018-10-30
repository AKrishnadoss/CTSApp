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
using CTSWebApp.BLL;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CTSWebApp.Controllers.API
{
    [Route("api/[Controller]")]
    [ApiController]
    [Produces("application/json")]
    public class TeacherController : Controller
    {
        private readonly ILogger<TeacherController> _logger;
        private readonly IMapper _mapper;
        private readonly ITeacherBLL _teacherBLL;

        public TeacherController(ICTSDBRepository ctsDBRepository, ILogger<TeacherController> logger, IMapper mapper,
            ITeacherBLL teacherBLL)
        {
            this._logger = logger;
            this._mapper = mapper;
            this._teacherBLL = teacherBLL;
        }

        [HttpGet]
        [Route("teachers")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult<IEnumerable<CTSUserViewModel>> GetAllTeachers()
        {
            try
            {
                var result = _mapper.Map<IEnumerable<CTSUser>, IEnumerable<CTSUserViewModel>>(_teacherBLL.GetAllTeachers());
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
                var result = _teacherBLL.GetCTSUserById(teacherId);
                if (result != null )
                {
                    return Ok(_mapper.Map<CTSUser, CTSUserViewModel>(result));
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
        public ActionResult<TeacherAssignmentViewModel> GetTeacherAssignment(int id)
        {
            try
            {
                TeacherAssignment instance = _teacherBLL.GetTeacherAssignment(id);
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

        [HttpGet]
        [Route("teacherById/{teacherId:int}/students")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult<IEnumerable<StudentEnrollmentViewModel>> GetAssignedStudents(int teacherId)
        {
            try
            {
                var result = _teacherBLL.GetAssignedStudents(teacherId);
                if (result != null && result.Count() > 0 )
                {
                    return Ok(_mapper.Map<IEnumerable<StudentEnrollment>, IEnumerable<StudentEnrollmentViewModel>>(result));
                }
                return NotFound();
            }
            catch (Exception exception)
            {
                _logger.LogError($"Exception occurred in GetAssignedStudents() => {exception}");
                return BadRequest("Exception occurred in TeacherController.GetAssignedStudents()");
            }
        }

        [HttpGet]
        [Route("teacherByGrade/{grade}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult<IEnumerable<TeacherViewModel>> GetAssignedTeacher(string grade)
        {
            try
            {
                var result = _teacherBLL.GetAssignedTeacher(grade);
                if (result != null && result.Count() > 0)
                {
                    return Ok(_mapper.Map<IEnumerable<Teacher>, IEnumerable<TeacherViewModel>>(result));
                }
                return NotFound();
            }
            catch (Exception exception)
            {
                _logger.LogError($"Exception occurred in GetAssignedTeacher() => {exception}");
                return BadRequest("Exception occurred in TeacherController.GetAssignedTeacher()");
            }
        }

        [HttpGet]
        [Route("teacherById/{teacherId:int}/studentgrades/{weekId:int}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult<IEnumerable<StudentWeekGradeViewModel>> GetAssignedStudentsWeekGrade(int teacherId,int weekId)
        {
            try
            {
                var result = _teacherBLL.GetAssignedStudentsWeekGrade(teacherId, weekId);
                if (result != null && result.Count() > 0)
                {
                    return Ok(_mapper.Map<IEnumerable<StudentWeekGrade>, IEnumerable<StudentWeekGradeViewModel>>(result));
                }
                return NotFound();
            }
            catch (Exception exception)
            {
                _logger.LogError($"Exception occurred in GetAssignedStudentsWeekGrade() => {exception}");
                return BadRequest("Exception occurred in TeacherController.GetAssignedStudents()");
            }
        }
    }
}
