using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Zamin.Models.General;
using Zamin.WebModels;

namespace Zamin.Repositories
{
    public interface ITagRepository : IDisposable
    {
        List<Tag> GetTags();
        bool DeleteTag(int tagId);
        int CreateTag(TagWebModel tag);
        int UpdateTag(TagWebModel tag);

        
    }
}
