﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace PasswordUtilityApp
{
    [Table("CTSUser")]
    public class CTSUser
    {
        public int Id { get; set; }
        public string LogonAccess { get; set; }
    }
}
