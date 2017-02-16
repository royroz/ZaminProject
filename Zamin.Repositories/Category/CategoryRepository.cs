using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Zamin.Models.General;

namespace Zamin.Repositories.Category
{
    public class CategoryRepository : RepositoryBase<DataContext>, ICategoryRepository
    {
        public CategoryRepository()
        {

        }

        public CategoryRepository(DataContext dataContext)
            : base(dataContext)
        {

        }

        public List<CourseCategory> GetCategories()
        {
            return DataContext.CourseCategories.Where(c => c.Active).ToList();
        }
    }
}
