using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Zamin.WebModels;
using Zamin.Models.Content;

namespace Zamin.Repositories
{
    public interface IPosterRepository : IDisposable
    {
        List<Poster> GetPosters();
        Poster GetPoster(int posterId);
        bool CreatePoster(PosterWebModel poster);
        bool DeletePoster(int posterId);
        bool UpdatePoster(PosterWebModel poster);
    }
}
