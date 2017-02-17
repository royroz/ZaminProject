using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Zamin.Models.General;
using Zamin.WebModels;

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

        public bool DeleteTag(int tagId)
        {
            var tag = DataContext.Tags.SingleOrDefault(t => t.Id == tagId);
            if (tag == null) return false;

            tag.Active = false;
            return Save();
        }

        public int CreateTag(TagWebModel tag)
        {
            var tagNameExists = DataContext.Tags.SingleOrDefault(t => t.TagName == tag.TagName);
            if (tagNameExists != null) return -1;

            var dbModel = AutoMapper.Mapper.Map<TagWebModel, Tag>(tag);
            dbModel.Active = true;
            var newTag= DataContext.Tags.Add(dbModel);
            var success = Save();
            if (!success) return -1;

            return newTag.Id;
        }

        public int UpdateTag(TagWebModel tag)
        {
            throw new NotImplementedException();
        }
    }
}
