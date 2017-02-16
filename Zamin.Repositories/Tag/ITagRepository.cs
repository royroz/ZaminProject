using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Zamin.Models.General;

namespace Zamin.Repositories
{
    public interface ITagRepository : IDisposable
    {
        List<Tag> GetTags();
    }
}
