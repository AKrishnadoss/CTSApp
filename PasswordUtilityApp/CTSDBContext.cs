using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace PasswordUtilityApp
{
    public class CTSDBContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer(@"Server=.\SQLEXPRESS;Database=CTSDB;Integrated Security=true;MultipleActiveResultSets=true");
            optionsBuilder.UseSqlServer(@"Server=tcp:ctsattendancedb.database.windows.net,1433;Initial Catalog=ctsattendance;Persist Security Info=False;User ID=ctsadmin;Password=Password123#;MultipleActiveResultSets=true;TrustServerCertificate=False;Connection Timeout=30;");
        }

        public DbSet<CTSUser> CTSUsers { get; set; }
    }
}
