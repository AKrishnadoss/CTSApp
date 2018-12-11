using CTSWebApp.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CTSWebApp.BLL
{
    public interface IGradeBLL
    {
        IEnumerable<Grade> GetGrades(bool includeAll);
        IEnumerable<Grade> GetScoringGrades();
    }
}
