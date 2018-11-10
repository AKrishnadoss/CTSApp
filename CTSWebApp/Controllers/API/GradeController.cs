using AutoMapper;
using CTSWebApp.BLL;
using CTSWebApp.Data.Entities;
using CTSWebApp.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Authorize(Policy = "JwtTokenValidationPolicy")]
    public class GradeController : Controller
    {
        private readonly ILogger<GradeController> _logger;
        private readonly IMapper _mapper;
        private readonly IGradeBLL _gradeBLL;

        public GradeController(ILogger<GradeController> logger, IMapper mapper,IGradeBLL gradeBLL)
        {
            this._logger = logger;
            this._mapper = mapper;
            this._gradeBLL = gradeBLL;
        }

        [HttpGet]
        [Route("grades")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult<IEnumerable<GradeViewModel>> GetAllGrades()
        {
            try
            {
                var result = _gradeBLL.GetGrades();
                if (result != null)
                {
                    return Ok(_mapper.Map<IEnumerable<Grade>, IEnumerable<GradeViewModel>>(result));
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
