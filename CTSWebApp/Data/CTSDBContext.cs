using Microsoft.EntityFrameworkCore;
using CTSWebApp.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.Data
{
    public class CTSDBContext : DbContext
    {
        public CTSDBContext(DbContextOptions<CTSDBContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<StudentWeekGrade>().HasKey(table => new { table.ID, table.StudentID });
        }

        public DbSet<UserIdentity> UserIdentity { get; set; }

        public DbSet<CTSUser> CTSUsers { get; set; }
        public DbSet<TeacherAssignment> TeacherAssignment { get; set; }
        public DbSet<Student> Students { get; set; }

        public DbSet<StudentEnrollment> StudentEnrollment { get; set; }

        public DbSet<StudentWeekGrade> StudentWeekGrade { get; set; }
        public DbSet<CalendarWeek> CalendarWeeks { get; set; }
        public DbSet<Grade> Grades { get; set; }

        public DbSet<Teacher> Teachers { get; set; }

    }
}
