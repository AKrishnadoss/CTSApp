using AutoMapper;
using CTSWebApp.BLL;
using CTSWebApp.Data;
using CTSWebApp.Data.Entities;
using CTSWebApp.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CTSWebApp.Controllers.API
{
    [Route("api/[Controller]/[action]")]
    [ApiController]
    [Produces("application/json")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Authorize(Policy = "JwtTokenValidationPolicy")]
    public class StudentController : Controller
    {
        private readonly IStudentBLL _studentBLL;
        private readonly ILogger<StudentController> _logger;
        private readonly IMapper _mapper;

        public StudentController(IStudentBLL studentBLL, ILogger<StudentController> logger, IMapper mapper)
        {
            this._studentBLL = studentBLL;
            this._logger = logger;
            this._mapper = mapper;
        }

        [HttpGet]
        [ActionName("students")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [NonAction]
        public ActionResult<IEnumerable<StudentViewModel>> GetAllStudents(bool includeInActive = false)
        {
            try
            {
                var result = _mapper.Map<IEnumerable<Student>, IEnumerable<StudentViewModel>>(_studentBLL.GetAllStudents(includeInActive));
                if (result != null)
                {
                    return Ok(result);
                }
                return NotFound();
            }
            catch (Exception exception)
            {
                _logger.LogError($"Exception occurred in GetAllStudents() => {exception}");
                return BadRequest("Exception occurred in student/students");
            }
        }

        [HttpPost]
        [ActionName("SaveStudent")]
        [NonAction]
        public ActionResult<bool> SaveStudent([FromBody]StudentViewModel viewModel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var result = true;
                    return Created("student/savestudent", result);
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception exception)
            {
                _logger.LogError($"Exception occurred in SaveStudent() => {exception}");
                return BadRequest("Exception occurred in student/savestudent");
            }
        }

        [HttpPost]
        [ActionName("SaveStudentWeekGrades")]
        public ActionResult<StudentErrorResult> SaveStudentWeekGrades([FromBody]SaveStudentWeekGradeViewModel viewModel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    int ctsUserID = GetLoggedOnCTSUserID();
                    var result = _studentBLL.SaveStudentWeekGrades(ctsUserID, viewModel.GradeLevel, _mapper.Map<IEnumerable<StudentWeekGradeViewModel>, IEnumerable<StudentWeekGrade>>(viewModel.StudentWeekGradeViewModelList));
                    if (result.Result == true)
                    {
                        return Created("student/savestudentweekgrades", result);
                    }
                    else
                    {
                        return BadRequest(result);
                    }
                }
                else
                {
                    return BadRequest(ModelState);
                }

            }
            catch (Exception exception)
            {
                _logger.LogError($"Exception occurred in SaveStudentWeekGrades() => {exception}");
                return BadRequest("Exception occurred in student/savestudentweekgrades");
            }
        }

        [HttpPost]
        [ActionName("SaveStudentTermScores")]
        public ActionResult<StudentErrorResult> SaveStudentTermScores([FromBody]SaveStudentTermScoreViewModel viewModel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    int ctsUserID = GetLoggedOnCTSUserID();
                    var result = _studentBLL.SaveStudentTermScores(ctsUserID, viewModel.GradeLevel, _mapper.Map<IEnumerable<StudentTermScoreViewModel>, IEnumerable<StudentTermScore>>(viewModel.StudentTermScoreViewModelList));
                    if (result.Result == true)
                    {
                        return Created("student/savestudenttermscores", result);
                    }
                    else
                    {
                        return BadRequest(result);
                    }
                }
                else
                {
                    return BadRequest(ModelState);
                }

            }
            catch (Exception exception)
            {
                _logger.LogError($"Exception occurred in SaveStudentTermScores() => {exception}");
                return BadRequest("Exception occurred in student/savestudenttermscores");
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
