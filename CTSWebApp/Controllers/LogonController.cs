﻿using AutoMapper;
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
            ViewBag.AppName = "Cary Tamil School";
            UserIdentityViewModel model = new UserIdentityViewModel();
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
                        model.ErrorMessage = "TODO: Redirect to Reset Password";
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
                model.ErrorMessage = "Invalid logon data";
            }
            ViewBag.AppName = "Cary Tamil School";
            return View(model);
        }
    }
}
