using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using Zamin.Consts;
using Zamin.Models;
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


                //Users
                cfg.CreateMap<WebsiteUser, WebsiteUserWebModel>();
                cfg.CreateMap<WebsiteUserWebModel, WebsiteUser>()
                    .ForMember(d=>d.LessonsWatched , o=> o.Ignore())
                    .ForMember(d=>d.LikedLessons , o=> o.Ignore())
                    .ForMember(d=>d.LikedVideo , o=> o.Ignore())
                    .ForMember(d=>d.LikedGalleryImages , o=> o.Ignore())
                    .ForMember(d=>d.LikedArticles , o=> o.Ignore())
                    .ForMember(d=>d.LikedActivities , o=> o.Ignore())
                    .ForMember(d=>d.LikedLessonPlans , o=> o.Ignore());
            });
        }
    }
}