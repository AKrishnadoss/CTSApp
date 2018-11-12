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
using System.Threading.Tasks;

namespace CTSWebApp.Controllers.API
{
    [Route("api/[Controller]")]
    [ApiController]
    [Produces("application/json")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Authorize(Policy = "JwtTokenValidationPolicy")]
    public class CalendarController : Controller
    {
        private readonly ILogger<CalendarController> _logger;
        private readonly IMapper _mapper;
        private readonly ICalendarBLL _calendarBLL;

        public CalendarController(ICTSDBRepository ctsDBRepository, ILogger<CalendarController> logger, IMapper mapper,
            ICalendarBLL calendarBLL)
        {
            this._logger = logger;
            this._mapper = mapper;
            this._calendarBLL = calendarBLL;
        }

        [HttpGet]
        [Route("weeks")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult<IEnumerable<CalendarWeekViewModel>> GetWeeks(bool includeInactive=false)
        {
            try
            {
                var result = _mapper.Map<IEnumerable<CalendarWeek>, IEnumerable<CalendarWeekViewModel>>(_calendarBLL.GetCalendarWeeks(includeInactive));
                if (result != null)
                {
                    return Ok(result);
                }
                return NotFound();
            }
            catch (Exception exception)
            {
                _logger.LogError($"Exception occurred in GetCalendarWeeks() => {exception}");
                return BadRequest("Exception occurred in calendar/weeks");
            }
        }

        [HttpGet]
        [Route("testweeks")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult<IEnumerable<CalendarWeekViewModel>> GetTestWeeks()
        {
            try
            {
                var result = _mapper.Map<IEnumerable<CalendarWeek>, IEnumerable<CalendarWeekViewModel>>(_calendarBLL.GetCalendarTestWeeks());
                if (result != null)
                {
                    return Ok(result);
                }
                return NotFound();
            }
            catch (Exception exception)
            {
                _logger.LogError($"Exception occurred in GetTestWeeks() => {exception}");
                return BadRequest("Exception occurred in calendar/testweeks");
            }
        }
    }
}
