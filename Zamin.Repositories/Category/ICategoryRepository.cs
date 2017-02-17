using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Zamin.Models.General;
using Zamin.WebModels;

namespace Zamin.Repositories.Category
{
    public interface ICategoryRepository : IDisposable
    {
        List<CourseCategory> GetCategories();
        int CreateCategory(CourseCategoryWebModel category);
        int UpdateCategory(CourseCategoryWebModel category);
        bool DeleteCategory(int categoryId);

    }
}
