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
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Net;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CTSWebApp.Controllers.API
{
    [Route("api/[Controller]")]
    [ApiController]
    [Produces("application/json")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Authorize(Policy = "JwtTokenValidationPolicy")]
    public class TeacherController : Controller
    {
        private readonly ILogger<TeacherController> _logger;
        private readonly IMapper _mapper;
        private readonly ITeacherBLL _teacherBLL;
        private readonly ICalendarBLL _calendarBLL;

        public TeacherController(ICTSDBRepository ctsDBRepository, ILogger<TeacherController> logger, IMapper mapper,
            ITeacherBLL teacherBLL, ICalendarBLL calendarBLL)
        {
            this._logger = logger;
            this._mapper = mapper;
            this._teacherBLL = teacherBLL;
            this._calendarBLL = calendarBLL;
        }

        [HttpGet]
        [Route("teachers")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [NonAction]
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
        [NonAction]
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
        [NonAction]
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
        [NonAction]
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
        [Route("assignment/{grade}/{weekId:int}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult<IEnumerable<TeacherViewModel>> GetAssignedTeacher(string grade, int weekId)
        {
            try
            {
                var result = _teacherBLL.GetAssignedTeacher(grade, weekId);
                if (result != null && result.Count() > 0)
                {
                    return Ok(_mapper.Map<IEnumerable<Teacher>, IEnumerable<TeacherViewModel>>(result));
                }
                return NotFound();
            }
            catch (Exception exception)
            {
                _logger.LogError($"Exception occurred in GetAssignedTeacher(grade,weekId) => {exception}");
                return BadRequest("Exception occurred in teacher/assignment/grade/weekId");
            }
        }

        [HttpGet]
        [Route("assignmentByWeekId/{weekId:int}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult<IEnumerable<TeacherViewModel>> GetAssignedTeacher(int weekId)
        {
            try
            {
                int teacherId = GetLoggedOnCTSUserID();
                if (teacherId > 0)
                {
                    var result = _teacherBLL.GetAssignedTeacher(teacherId, weekId);
                    if (result != null)
                    {
                        return Ok(_mapper.Map<IEnumerable<Teacher>, IEnumerable<TeacherViewModel>>(result));
                    }
                }
                return NotFound();
            }
            catch (Exception exception)
            {
                _logger.LogError($"Exception occurred in GetAssignedTeacher(weekId) => {exception}");
                return BadRequest("Exception occurred in teacher/assignmentByWeekId/weekId");
            }
        }

        [HttpGet]
        [Route("assignmentById/{teacherId:int}/studentgrades/{weekId:int}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult<IEnumerable<StudentWeekGradeViewModel>> GetAssignedStudentsWeekGrade(int teacherId,int weekId)
        {
            try
            {
                //System.Threading.Thread.Sleep(2000);
                var result = _teacherBLL.GetAssignedStudentsWeekGrade(teacherId, weekId);
                if (result != null && result.Count() > 0)
                {
                    return Ok(_mapper.Map<IEnumerable<StudentWeekGrade>, IEnumerable<StudentWeekGradeViewModel>>(result));
                }
                return Ok(null);
            }
            catch (Exception exception)
            {
                _logger.LogError($"Exception occurred in GetAssignedStudentsWeekGrade(teacherId, weekId) => {exception}");
                return BadRequest("Exception occurred in teacher/assignmentById/teacherId/studentgrades/weekId");
            }
        }

        [HttpGet]
        [Route("assignmentById/{teacherId:int}/studentscores/{termNo:int}/{weekId:int}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult<StudentTermScoreResultViewModel> GetAssignedStudentsTermScore(int teacherId, int termNo, int weekId)
        {
            try
            {
                //System.Threading.Thread.Sleep(2000);
                var result = _teacherBLL.GetAssignedStudentsTermScore(teacherId, termNo, weekId);
                if (result != null && result.Count() > 0)
                {

                    StudentTermScoreResultViewModel resultViewModel = new StudentTermScoreResultViewModel();
                    resultViewModel.DataFreeze = false;
                    resultViewModel.TermScoreEntryAllowed = false;
                    resultViewModel.StudentTermScores = _mapper.Map<IEnumerable<StudentTermScore>, IEnumerable<StudentTermScoreViewModel>>(result);
                    StudentTermScoreViewModel vm = resultViewModel.StudentTermScores.FirstOrDefault();
                    if ( ! string.IsNullOrEmpty(vm.DataFreeze) && vm.DataFreeze.ToUpper() == "Y")
                    {
                        resultViewModel.DataFreeze = true;
                    }

                    if (resultViewModel.DataFreeze == false)
                    {
                        IEnumerable<CalendarWeek> calendarWeeks = this._calendarBLL.GetCalendarWeeks();
                        CalendarWeek cw = calendarWeeks.Where(c => c.ID == vm.CalendarWeekID).FirstOrDefault();

                        if (cw != null)
                        {
                            resultViewModel.TermScoreEntryAllowed = DateTime.Today >= cw.WeekDate ? true : false;
                        }
                    }

                    return Ok(resultViewModel);
                }
                else
                {
                    StudentTermScoreResultViewModel resultViewModel = new StudentTermScoreResultViewModel();
                    resultViewModel.StudentTermScores = null;
                    resultViewModel.DataFreeze = true;
                    resultViewModel.TermScoreEntryAllowed = false;
                    return Ok(resultViewModel);
                }
                
            }
            catch (Exception exception)
            {
                _logger.LogError($"Exception occurred in GetAssignedStudentsTermScore(teacherId, termNo, weekId) => {exception}");
                return BadRequest("Exception occurred in teacher/assignmentById/teacherId/studentscores/termNo/weekId");
            }
        }

        private int GetLoggedOnCTSUserID()
        {
            int ctsUserID = -1;
            List<Claim> claims = HttpContext.User.Claims.ToList();
            Claim claim = claims.Where(x => x.Type == "CTSUserID").FirstOrDefault();
            if (claim != null && !string.IsNullOrEmpty(claim.Value))
            {
                ctsUserID = int.Parse(claim.Value);
            }
            return ctsUserID;
        }
    }
}
