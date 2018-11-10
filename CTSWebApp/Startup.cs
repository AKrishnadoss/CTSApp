using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using CTSWebApp.Services;
using CTSWebApp.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using CTSWebApp.BLL;
using CTSWebApp.Security;
using Microsoft.AspNetCore.Authorization;

namespace CTSWebApp
{
    public class Startup
    {
        private readonly IConfiguration _config;

        public Startup(IConfiguration config)
        {
            this._config = config;
        }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication()
                .AddJwtBearer(config =>
                {
                    config.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters()
                    {
                        ValidIssuer = _config["Token:Issuer"],
                        ValidAudience = _config["Token:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Token:Key"]))
                    };
                });

            services.AddAuthorization(config =>
            {
                config.AddPolicy("JwtTokenValidationPolicy", policy => policy.Requirements.Add(new JwtTokenAuthRequirement()));
            });


            services.AddDbContext<CTSDBContext>(config =>
            {
                config.UseSqlServer(_config.GetConnectionString("CTSDBConnectionString"));
            });

            services.AddAutoMapper();

            services.AddSingleton<IAuthorizationHandler, JwtTokenAuthHandler>();


            services.AddScoped<ICTSDBRepository, CTSDBRepository>();

            services.AddTransient<IIdentityBLL, IdentityBLL>();
            services.AddTransient<ITeacherBLL, TeacherBLL>();
            services.AddTransient<ICalendarBLL, CalendarBLL>();
            services.AddTransient<IGradeBLL, GradeBLL>();
            services.AddTransient<IStudentBLL, StudentBLL>();
            services.AddTransient<IMailService, MailService>();
            services.AddTransient<IAuthService, AuthService>();

            services.AddMemoryCache();

            services.AddMvc()
                .SetCompatibilityVersion(Microsoft.AspNetCore.Mvc.CompatibilityVersion.Version_2_1);

            services.AddDistributedMemoryCache();
            services.AddSession();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/error");
            }

            //app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseNodeModules(env);

            //app.Run(async (context) =>
            //{
            //    await context.Response.WriteAsync("Hello World!");
            //});

            //enable session before MVC
            app.UseSession();

            app.UseMvc( config =>
            {
                config.MapRoute("Default",
                    "/{controller}/{action}/{id?}",
                    new { Controller = "App", Action = "Index" });
            });

        }
    }
}
