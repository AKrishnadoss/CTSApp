using AutoMapper;
using CTSWebApp.BLL;
using CTSWebApp.Data;
using CTSWebApp.Data.Entities;
using CTSWebApp.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.Controllers.API
{
    [Route("api/[Controller]/[action]")]
    [ApiController]
    [Produces("application/json")]
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
        public ActionResult<StudentWeekGradeResult> SaveStudentWeekGrades([FromBody]IEnumerable<StudentWeekGradeViewModel> viewModel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    //System.Threading.Thread.Sleep(2000);
                    var result = _studentBLL.SaveStudentWeekGrades(_mapper.Map<IEnumerable<StudentWeekGradeViewModel>, IEnumerable<StudentWeekGrade>>(viewModel));
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
    }
}
