using CTSWebApp.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.Services
{
    public interface IAuthService
    {
        Task<AuthServiceAuthorizeResult> AuthorizeAsync(UserIdentityViewModel model);
        Task<AuthServiceAuthorizeResult> AuthorizeAsync(ResetPasswordViewModel model);
        Task<AuthServiceAuthorizeResult> AuthorizeAsync(ForgotPasswordViewModel model);
    }
}
