using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Zamin.Models.General;

namespace Zamin.Repositories.Category
{
    public interface ICategoryRepository : IDisposable
    {
        List<CourseCategory> GetCategories();
    }
}
