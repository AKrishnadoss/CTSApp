﻿using AutoMapper;
using CTSWebApp.BLL;
using CTSWebApp.Data;
using CTSWebApp.Data.Entities;
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
        public ActionResult<IEnumerable<CalendarWeek>> GetWeeks(bool includeInactive=false)
        {
            try
            {
                var result = _calendarBLL.GetCalendarWeeks(includeInactive);
                if (result != null)
                {
                    return Ok(result);
                }
                return NotFound();
            }
            catch (Exception exception)
            {
                _logger.LogError($"Exception occurred in GetCalendarWeeks() => {exception}");
                return BadRequest("Exception occurred in CalendarController.GetCalendarWeeks()");
            }
        }
    }
}