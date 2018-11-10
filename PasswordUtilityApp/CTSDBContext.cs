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
            optionsBuilder.UseSqlServer(@"Server=.\SQLEXPRESS;Database=CTSDB;Integrated Security=true;MultipleActiveResultSets=true");
        }

        public DbSet<CTSUser> CTSUsers { get; set; }
    }
}
