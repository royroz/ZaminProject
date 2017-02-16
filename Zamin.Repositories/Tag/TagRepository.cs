using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Zamin.Models.General;

namespace Zamin.Repositories
{
    public class TagRepository : RepositoryBase<DataContext>, ITagRepository
    {
                public TagRepository()
        {

        }

                public TagRepository(DataContext dataContext)
            : base(dataContext)
        {

        }

        public List<Tag> GetTags()
        {
            return DataContext.Tags.Where(t => t.Active).ToList();
        }
    }
}
