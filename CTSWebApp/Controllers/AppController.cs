using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CTSWebApp.Data;
using CTSWebApp.Services;
using CTSWebApp.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Microsoft.Extensions.Configuration;

namespace CTSWebApp.Controllers
{
    public class AppController : Controller
    {
        private readonly IMailService _mailService;
        private readonly ICTSDBRepository _dbRepository;
        private readonly IConfiguration _configuration;

        public AppController(IMailService mailService, ICTSDBRepository dbRepository, IConfiguration configuration)
        {
            _mailService = mailService;
            _dbRepository = dbRepository;
            _configuration = configuration;
        }

        public IActionResult Index()
        {
            ViewBag.AppName = "Cary Tamil School - Attendance & Scores";
            ViewBag.AppVersion = _configuration["App:Version"];
            string sessionData = HttpContext.Session.GetString("identity");
            if ( !string.IsNullOrEmpty(sessionData) )
            {
                AuthServiceAuthorizeResult result = JsonConvert.DeserializeObject<AuthServiceAuthorizeResult>(sessionData);
                if ( result != null)
                {
                    HttpContext.Session.Clear();
                    return View(result);
                }
            }
            return View(null);
        }

        [HttpGet("contact")]
        public IActionResult Contact()
        {
            
            ViewBag.PageTitle = "Contact Us";
            //throw new InvalidOperationException("Invalid operation");
            return View();
        }

        [HttpPost("contact")]
        public IActionResult Contact(ContactViewModel viewModel)
        {
            if(ModelState.IsValid)
            {
                _mailService.SendMessage(viewModel.UserEmail, viewModel.Subject, viewModel.Message);
                ViewBag.UserMessage = "Mail Sent";
                ModelState.Clear();
            }

            ViewBag.PageTitle = "Contact Us";
            return View(viewModel);
        }

        public IActionResult About()
        {
            ViewBag.PageTitle = "About Us";
            return View();
        }

        //[HttpGet]
        //[Authorize]
        //public IActionResult Teacher()
        //{
        //    return View(_dbRepository.GetAllTeachers());
        //}
    }
}
