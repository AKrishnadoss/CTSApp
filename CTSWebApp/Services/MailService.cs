using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.Services
{
    public class MailService : IMailService
    {
        private readonly ILogger<MailService> _logger;
        public MailService(ILogger<MailService> logger)
        {
            _logger = logger;
        }

        public void SendMessage(string to, string subject, string message)
        {
            _logger.LogInformation($"To: {to}, Subject: {subject}, Message = {message}", to, subject, message);
        }
    }
}
