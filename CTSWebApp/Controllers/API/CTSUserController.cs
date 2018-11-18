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
using System.Security.Claims;
using CTSWebApp.BLL;

namespace CTSWebApp.Controllers.API
{
    [Route("api/[Controller]")]
    [ApiController]
    [Produces("application/json")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Authorize(Policy = "JwtTokenValidationPolicy")]
    public class CTSUserController : ControllerBase
    {
        private readonly IIdentityBLL _idenityBLL;
        private readonly ICTSDBRepository _ctsDBRepository;
        private readonly ILogger<CTSUserController> _logger;
        private readonly IMapper _mapper;

        public CTSUserController(IIdentityBLL idenityBLL,
            ICTSDBRepository ctsDBRepository, ILogger<CTSUserController> logger, IMapper mapper)
        {
            this._idenityBLL = idenityBLL;
            this._ctsDBRepository = ctsDBRepository;
            this._logger = logger;
            this._mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [NonAction]
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
        [NonAction]
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

        [HttpGet]
        [Route("authfunctions")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public ActionResult<AuthorizedFunctionsViewModel> GetAuthorizedFunctions()
        {
            try
            {
                if ( HttpContext.User.Identity.IsAuthenticated)
                {
                    if ( HttpContext.User.Claims != null )
                    {
                        List<Claim> claims = HttpContext.User.Claims.ToList();
                        Claim claim = claims.Where(x => x.Type == "CTSUserID").FirstOrDefault();
                        if (claim == null || string.IsNullOrEmpty(claim.Value))
                        {
                            return Unauthorized();
                        }

                        int ctsUserId = int.Parse(claim.Value);

                        // GetUserRoles
                        var roles = _idenityBLL.GetUserRoles(ctsUserId);
                        if (roles != null)
                        {
                            AuthorizedFunctionsViewModel viewModel = new AuthorizedFunctionsViewModel();
                            viewModel.Functions = new List<string>();
                            if (roles.Contains("Admin"))
                            {
                                viewModel.Functions.Add("Attendance");
                                viewModel.Functions.Add("Attendance.GradeSelection");
                                viewModel.Functions.Add("Attendance.TeacherSelection");
                                viewModel.Functions.Add("Attendance.Save");

                                viewModel.Functions.Add("TermScores");
                                viewModel.Functions.Add("TermScores.GradeSelection");
                                viewModel.Functions.Add("TermScores.TeacherSelection");
                                viewModel.Functions.Add("TermScores.Save");
                            }
                            else if (roles.Contains("LeadTeacher"))
                            {
                                viewModel.Functions.Add("Attendance");
                                viewModel.Functions.Add("Attendance.TeacherSelection");
                                viewModel.Functions.Add("Attendance.Save");

                                viewModel.Functions.Add("TermScores");
                                viewModel.Functions.Add("TermScores.TeacherSelection");
                                viewModel.Functions.Add("TermScores.Save");
                            }
                            else if (roles.Contains("Teacher"))
                            {
                                viewModel.Functions.Add("Attendance");
                                viewModel.Functions.Add("Attendance.Save");

                                viewModel.Functions.Add("TermScores");
                                viewModel.Functions.Add("TermScores.Save");
                            }

                            if (viewModel.Functions.Count > 0)
                            {
                                return Ok(viewModel);
                            }
                            return Unauthorized();
                        }
                    }
                }
                return Unauthorized();
            }
            catch (Exception exception)
            {
                _logger.LogError($"Exception occurred in CTSUserController.GetAuthorizedFunctions() => {exception}");
                return BadRequest("Exception occurred in ctsuser/authfunctions");
            }
        }

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [NonAction]
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
