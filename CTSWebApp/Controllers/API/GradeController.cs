using AutoMapper;
using CTSWebApp.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.Controllers.API
{

    [Route("api/[Controller]")]
    [ApiController]
    [Produces("application/json")]
    public class GradeController : Controller
    {
        private readonly ILogger<GradeController> _logger;
        private readonly IMapper _mapper;

        public GradeController(ILogger<GradeController> logger, IMapper mapper)
        {
            this._logger = logger;
            this._mapper = mapper;
        }

        [HttpGet]
        [Route("grades")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult<IEnumerable<GradeViewModel>> GetAllGrades()
        {
            try
            {
                List<GradeViewModel> result = new List<GradeViewModel>();
                result.Add(new GradeViewModel() { CTSGrade = "PREK", CountyGrade = "PREK" });
                result.Add(new GradeViewModel() { CTSGrade = "1", CountyGrade = "KG" });
                result.Add(new GradeViewModel() { CTSGrade = "1A", CountyGrade = "1" });
                result.Add(new GradeViewModel() { CTSGrade = "1B", CountyGrade = "2" });
                result.Add(new GradeViewModel() { CTSGrade = "2A", CountyGrade = "3" });
                result.Add(new GradeViewModel() { CTSGrade = "2B", CountyGrade = "4" });
                result.Add(new GradeViewModel() { CTSGrade = "3A", CountyGrade = "5" });
                result.Add(new GradeViewModel() { CTSGrade = "3B", CountyGrade = "6" });
                result.Add(new GradeViewModel() { CTSGrade = "4A", CountyGrade = "7" });
                result.Add(new GradeViewModel() { CTSGrade = "4B", CountyGrade = "8" });
                result.Add(new GradeViewModel() { CTSGrade = "5A", CountyGrade = "9" });
                result.Add(new GradeViewModel() { CTSGrade = "5B", CountyGrade = "10" });
                result.Add(new GradeViewModel() { CTSGrade = "6A", CountyGrade = "11" });
                result.Add(new GradeViewModel() { CTSGrade = "6B", CountyGrade = "12" });
                if (result != null)
                {
                    return Ok(result);
                }
                return NotFound();
            }
            catch (Exception exception)
            {
                _logger.LogError($"Exception occurred in GetAllGrades() => {exception}");
                return BadRequest("Exception occurred in GradeController.GetAllGrades()");
            }
        }
    }
}
