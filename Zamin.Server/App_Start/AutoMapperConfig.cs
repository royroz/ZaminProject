using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using Zamin.Models.Content;
using Zamin.WebModels;

namespace Zamin.Server.App_Start
{
    public static class AutoMapperConfig
    {
        public static void BuildMap()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<Course, CourseWebModel>();
                cfg.CreateMap<CourseWebModel, Course>();
            });
        }
    }
}