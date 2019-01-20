using AutoMapper;
using AutoMapper.Configuration;
using CTSWebApp.Data;
using CTSWebApp.Services;
using CTSWebApp.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.Controllers
{
    public class LogonController : Controller// CTSAppBaseController
    {
        private readonly ILogger<LogonController> _logger;
        private readonly IAuthService _authService;
        private readonly ICTSDBRepository _ctsDBRepository;
        private readonly IMapper _mapper;

        public LogonController(ICTSDBRepository ctsDBRepository, IMapper mapper,
             ILogger<LogonController> logger, 
             IAuthService authService) // : 
            //base (ctsDBRepository, mapper, configuration)
        {
            _logger = logger;
            this._authService = authService;
            this._ctsDBRepository = ctsDBRepository;
            this._mapper = mapper;
            //this._configuration = configuration;
        }

        [HttpGet]
        public IActionResult Login()
        {
            ViewBag.AppName = "Cary Tamil School - Attendance & Scores";
            UserIdentityViewModel model = new UserIdentityViewModel();
            return View(model);
        }

        [HttpGet]
        public IActionResult Forgot()
        {
            ViewBag.AppName = "Cary Tamil School - Attendance & Scores";
            ForgotPasswordViewModel model = new ForgotPasswordViewModel();
            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> Login(UserIdentityViewModel model)
        {
            model.ErrorMessage = string.Empty;
            if (ModelState.IsValid)
            {
                var result = await _authService.AuthorizeAsync(model);
                if (result != null && result.IsSucceeded)
                {
                    if (result.Locked)
                    {
                        model.ErrorMessage = "Account locked out, Please contact system administrator !";
                    }
                    else if (result.ResetPassword)
                    {
                        ResetPasswordViewModel resetViewModel = CreateResetPasswordViewModel(result);
                        ViewBag.AppName = "Cary Tamil School - Attendance & Scores";
                        return View("reset", resetViewModel);
                    }
                    else
                    {
                        // Set result in session 
                        var serializedData = JsonConvert.SerializeObject(result);
                        HttpContext.Session.SetString("identity", serializedData);
                        // Redirect to Index page
                        return RedirectToAction("Index", "App");
                    }
                }
                else
                {
                    model.ErrorMessage = "Logon attempt failed. Please try again.";
                }
            }
            else
            {
                model.ErrorMessage = "Invalid Email or bad password";
            }
            ViewBag.AppName = "Cary Tamil School - Attendance & Scores";
            return View(model);
        }


        [HttpPost]
        [ActionName("resetlogin")]
        public async Task<IActionResult> ResetLogin(ResetPasswordViewModel model)
        {
            model.ErrorMessage = string.Empty;
            if (ModelState.IsValid)
            {
                var result = await _authService.AuthorizeAsync(model);
                if (result != null && result.IsSucceeded)
                {
                    if (result.Locked)
                    {
                        model.ErrorMessage = "Account locked out, Please contact system administrator !";
                    }
                    else
                    {
                        // Set result in session 
                        var serializedData = JsonConvert.SerializeObject(result);
                        HttpContext.Session.SetString("identity", serializedData);
                        // Redirect to Index page
                        return RedirectToAction("Index", "App");
                    }
                }
                else
                {
                    model.ErrorMessage = "Password Reset failed. Please try again.";
                }
            }
            else
            {
                model.ErrorMessage = "Invalid logon data";
            }
            ViewBag.AppName = "Cary Tamil School - Attendance & Scores";
            return View("reset", model);
        }

        [HttpPost]
        [ActionName("forgotpassword")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordViewModel model)
        {
            model.ErrorMessage = string.Empty;
            if (ModelState.IsValid)
            {
                var result = await _authService.AuthorizeAsync(model);
                if (result != null && result.IsSucceeded)
                {
                    if (result.Locked)
                    {
                        model.ErrorMessage = "Account locked out, Please contact system administrator !";
                    }
                    else
                    {
                        // Redirect to Login Page
                        return RedirectToAction("Login", "Logon");
                    }
                }
                else
                {
                    model.ErrorMessage = "Password Update failed, Contact system administrator !";
                }
            }
            else
            {
                model.ErrorMessage = "Invalid logon data";
            }
            ViewBag.AppName = "Cary Tamil School - Attendance & Scores";
            return View("forgot", model);
        }


        private ResetPasswordViewModel CreateResetPasswordViewModel(AuthServiceAuthorizeResult result)
        {
            ResetPasswordViewModel viewModel = new ResetPasswordViewModel()
            {
                UserName = result.UserName,
                Email = result.Email,
                NewPassword = string.Empty,
                ConfirmNewPassword = string.Empty,
                ErrorMessage = string.Empty
            };

            return viewModel;
        }
    }
}
