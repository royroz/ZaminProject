using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Zamin.Enums;
using Zamin.Helpers;
using Zamin.Models.Content;
using Zamin.WebModels;

namespace Zamin.Repositories
{
  public class PosterRepository:RepositoryBase<DataContext> , IPosterRepository
  {
        public PosterRepository()
        {

        }

        public PosterRepository(DataContext dataContext)
            : base(dataContext)
        {

        }


      public List<Poster> GetPosters()
      {

          return DataContext.Poster.Where(p => p.Active).ToList();
      }

      public Poster GetPoster(int posterId)
      {

          return DataContext.Poster.Include(p => p.Tags).FirstOrDefault(p=>p.Id==posterId);

      }

      public bool CreatePoster(PosterWebModel poster)
      {
          var dbModel = AutoMapper.Mapper.Map<PosterWebModel, Poster>(poster);

          //Save tags
          if (poster.Tags != null)
          {
              foreach (var tagWebModel in poster.Tags)
              {
                  dbModel.Tags.Add(DataContext.Tags.First(t => t.Id == tagWebModel.Id));
              }
          }

          //Save image file
          var fileName = Guid.NewGuid() + ".png";
          dbModel.ImageFileName = fileName;
          dbModel.Active = true;
          FileHelper.SaveFile(poster.ImageFile, DirectoriesEnum.Posters, fileName);

          DataContext.Poster.Add(dbModel);
          return Save();
      }

      public bool DeletePoster(int posterId)
      {
          var poster = DataContext.Poster.FirstOrDefault(p => p.Id == posterId);
          if (poster==null) return false;

          poster.Active = false;
          return Save();

      }

      public bool UpdatePoster(PosterWebModel poster)
      {
          var dbModel = DataContext.Poster.Include(p => p.Tags).SingleOrDefault(p => p.Id == poster.Id);
          if (dbModel == null) return false;

          AutoMapper.Mapper.Map(poster, dbModel);

          //save Tags
          if (poster.Tags != null && poster.Tags.Count > 0)
          {
              foreach (var tagDb in dbModel.Tags.ToList())
              {
                  //Doesnt exist in webModel (removed by client)
                  if (!poster.Tags.Any(t => t.Id == tagDb.Id))
                  {
                      dbModel.Tags.Remove(tagDb);
                  }
              }
              foreach (var tagWebModel in poster.Tags.ToList())
              {
                  //Doesnt exist in db (added by client)
                  if (!dbModel.Tags.Any(t => t.Id == tagWebModel.Id))
                  {
                      dbModel.Tags.Add(DataContext.Tags.First(t => t.Id == tagWebModel.Id));
                  }
              }
          }
          else //All tags were deleted
          {
              foreach (var tag in dbModel.Tags.ToList())
              {
                  dbModel.Tags.Remove(tag);
              }
          }
          if (poster.ImageFile != null)
          {
              var fileName = Guid.NewGuid() + ".png";
              dbModel.ImageFileName = fileName;
              dbModel.Active = true;
              FileHelper.SaveFile(poster.ImageFile, DirectoriesEnum.Courses, fileName);
          }
          return Save();
      }
  }
}
