using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using CTSWebApp.Data;
using CTSWebApp.Data.Entities;
using CTSWebApp.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.Controllers.API
{
    [Route("api/[Controller]")]
    [ApiController]
    [Produces("application/json")]
    [Authorize(AuthenticationSchemes =JwtBearerDefaults.AuthenticationScheme)]
    public class CTSUserController : ControllerBase
    {
        private readonly ICTSDBRepository _ctsDBRepository;
        private readonly ILogger<CTSUserController> _logger;
        private readonly IMapper _mapper;

        public CTSUserController(ICTSDBRepository ctsDBRepository, ILogger<CTSUserController> logger, IMapper mapper)
        {
            this._ctsDBRepository = ctsDBRepository;
            this._logger = logger;
            this._mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult<IEnumerable<CTSUserViewModel>> Get()
        {
            try
            {
                return Ok(_mapper.Map<IEnumerable<CTSUser>, IEnumerable<CTSUserViewModel>>(_ctsDBRepository.GetAllCTSUsers()));
            }
            catch ( Exception exception)
            {
                _logger.LogError($"Exception occurred in Get() => {exception}");
                return BadRequest("Exception occurred in CTSUserController.Get()");
            }
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult<CTSUserViewModel> Get(int id)
        {
            try
            {
                var result = _mapper.Map<CTSUser, CTSUserViewModel>(_ctsDBRepository.GetCTSUserById(id));
                if (result != null)
                {
                    return Ok(result);
                }
                return NotFound();
            }
            catch (Exception exception)
            {
                _logger.LogError($"Exception occurred in GetCTSUserById() => {exception}");
                return BadRequest("Exception occurred in CTSUserController.GetCTSUserById()");
            }
        }

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public IActionResult SaveOrUpdate([FromBody]CTSUserViewModel ctsUserViewModel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    CTSUser teacher = _mapper.Map<CTSUserViewModel, CTSUser>(ctsUserViewModel);

                    var result = _ctsDBRepository.SaveOrUpdate(teacher);
                    if (result != null)
                    {
                        CTSUserViewModel resultViewModel = _mapper.Map<CTSUser, CTSUserViewModel>(result); 

                        return Created($"/api/ctsuser/{resultViewModel.CTSUserId}", resultViewModel);
                    }
                }
                return BadRequest("Failed to save teacher information");
            }
            catch (Exception exception)
            {
                _logger.LogError($"Exception occurred in SaveOrUpdate() => {exception}");
                return BadRequest("Exception occurred in CTSUserController.SaveOrUpdate()");
            }
        }
    }
}
