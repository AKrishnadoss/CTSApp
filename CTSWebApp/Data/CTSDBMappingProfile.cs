using AutoMapper;
using CTSWebApp.Data.Entities;
using CTSWebApp.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.Data
{
    public class CTSDBMappingProfile : Profile
    {
        public CTSDBMappingProfile()
        {
            CreateMap<CTSUser, CTSUserViewModel>()
                .ForMember(t => t.CTSUserId, ex => ex.MapFrom(t => t.Id))
                .ReverseMap();


            CreateMap<TeacherAssignment, TeacherAssignmentViewModel>()
                .ReverseMap();

            CreateMap<Student, StudentViewModel>()
                .ReverseMap();

            CreateMap<StudentEnrollment, StudentEnrollmentViewModel>()
                .ReverseMap();


            CreateMap<Grade, GradeViewModel>()
                .ReverseMap();
        }
    }
}
