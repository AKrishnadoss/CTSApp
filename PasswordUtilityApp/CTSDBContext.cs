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
            optionsBuilder.UseSqlServer(@"Server=NIRANJANAKILA\SQLEXPRESS;Database=CTSDB;User=SA;Pwd=admin123;MultipleActiveResultSets=true");
        }

        public DbSet<CTSUser> CTSUsers { get; set; }
    }
}
