﻿using CTSWebApp.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.BLL
{
    public interface ITeacherBLL
    {
        TeacherAssignment GetTeacherAssignment(int teacherID);
    }
}
