using AutoMapper;
using AutoMapper.Configuration;
using CTSWebApp.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.Controllers
{
    public abstract class CTSAppBaseController : Controller
    {
        private readonly ICTSDBRepository _ctsDBRepository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public CTSAppBaseController(ICTSDBRepository ctsDBRepository, IMapper mapper, IConfiguration configuration)
        {
            this._ctsDBRepository = ctsDBRepository;
            this._mapper = mapper;
            this._configuration = configuration;
        }

    }
}
