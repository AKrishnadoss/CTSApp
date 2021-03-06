﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.ViewModels
{
    public class TeacherViewModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PrimaryPhone { get; set; }
        public string CTSGrade { get; set; }
        public string GradeLevel { get; set; }
    }
}
