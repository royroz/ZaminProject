using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using Zamin.Consts;
using Zamin.Models.Content;
using Zamin.Models.General;
using Zamin.WebModels;

namespace Zamin.Server.App_Start
{
    public static class AutoMapperConfig
    {
        public static void BuildMap()
        {
            Mapper.Initialize(cfg =>
            {
                //Course
                cfg.CreateMap<Course, CourseWebModel>()
                    .ForMember(d=>d.CourseCategoryName, o=>o.MapFrom(s=>s.CourseCategory.CategoryName))
                    .ForMember(d => d.ImageUrl, o => o.MapFrom(s => GlobalConsts.ServerUrl + DirectoriesConsts.CoursesFolder +"/"+ s.ImageFileName));
                cfg.CreateMap<CourseWebModel, Course>()
                    .ForMember(d=>d.Tags, o=>o.Ignore());

                //CourseCategory
                cfg.CreateMap<CourseCategoryWebModel, CourseCategory>();
                cfg.CreateMap<CourseCategory, CourseCategoryWebModel>();

                //Tag
                cfg.CreateMap<Tag, TagWebModel>();
                cfg.CreateMap<TagWebModel, Tag>();

                //Poster
                cfg.CreateMap<Poster, PosterWebModel>()
               .ForMember(d => d.ImageUrl, o => o.MapFrom(s => GlobalConsts.ServerUrl + DirectoriesConsts.PostersFolder + "/" + s.ImageFileName));
                cfg.CreateMap<PosterWebModel, Poster>()
                    .ForMember(d => d.Tags, o => o.Ignore());
            });
        }
    }
}