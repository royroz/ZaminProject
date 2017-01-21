using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Configuration;
using System.Web.Mvc;
using Music4Biz.Models;
using Music4Biz.WebModels;
using Muzisc4Biz.Models;
using Muzisc4Biz.Models.SalesForce;
using Muzisc4Biz.WebModels;
using Muzisc4Biz.WebModels.Clients;
using Muzisc4Biz.WebModels.WebSite;

namespace Music4Biz.Web.App_Start
{
    public static class AutoMapperConfig
    {
        public static void BuildMap()
        {
            AutoMapper.Mapper.CreateMap<SongsPackageWebModel, SongsPackage>();
            AutoMapper.Mapper.CreateMap<SongsPackage, SongsPackageWebModel>();

            AutoMapper.Mapper.CreateMap<GenreWebModel, Genre>();
            AutoMapper.Mapper.CreateMap<Genre, GenreWebModel>();

            AutoMapper.Mapper.CreateMap<NicknameWebModel, Nickname>();
            AutoMapper.Mapper.CreateMap<Nickname, NicknameWebModel>();

            AutoMapper.Mapper.CreateMap<AtmosphereWebModel, Atmosphere>();
            AutoMapper.Mapper.CreateMap<Atmosphere, AtmosphereWebModel>();

            //AutoMapper.Mapper.CreateMap<BusinessWebModel, Business>();
            //AutoMapper.Mapper.CreateMap<Business, BusinessWebModel>();

            AutoMapper.Mapper.CreateMap<PerformerWebModel, Performer>();
            AutoMapper.Mapper.CreateMap<Performer, PerformerWebModel>();

            AutoMapper.Mapper.CreateMap<PublisherWebModel, Publisher>();
            AutoMapper.Mapper.CreateMap<Publisher, PublisherWebModel>();

            AutoMapper.Mapper.CreateMap<BpmWebModel, Bpm>();
            AutoMapper.Mapper.CreateMap<Bpm, BpmWebModel>();

            //-------------------------------------Songs----------------------------------------------------------

            AutoMapper.Mapper.CreateMap<SongWebModel, Song>()
                .ForMember(d => d.Name, o => o.MapFrom(s => s.SongName))
                .ForMember(d => d.Atmospheres, o => o.Ignore())
                .ForMember(d => d.Genres, o => o.Ignore())
                .ForMember(d => d.Packages, o => o.Ignore())
                .ForMember(d => d.NickNames, o => o.Ignore())
                .ForMember(d => d.Performer, o => o.Ignore())
                .ForMember(d => d.Publisher, o => o.Ignore())
                .ForMember(d => d.Bpm, o => o.Ignore())
                .ForMember(d => d.PerformerId, o => o.MapFrom(s => s.Performer.Id))
                .ForMember(d => d.BpmId, o => o.MapFrom(s => s.Bpm.Id))
                .ForMember(d => d.PublisherId, o => o.MapFrom(s => s.Publisher.Id))
                .ForMember(d=>d.FileName , o=>o.Ignore());

            AutoMapper.Mapper.CreateMap<Song, SongWebModel>()
                .ForMember(d => d.SongName, o => o.MapFrom(s => s.Name))
                .ForMember(d => d.SongUrl, o => o.MapFrom(s => string.Format("{0}/{1}", WebConfigurationManager.AppSettings["cloudfront"], s.FileName)))
                .ForMember(d => d.LastUpdatedTimeStamp, o => o.MapFrom(s => s.LastUpdated.Subtract(new DateTime(1970, 1, 1)).TotalMilliseconds));
            //.ForMember(d => d.SongUrl, o => o.MapFrom(s => string.Format("{0}/{1}/songs/{2}", WebConfigurationManager.AppSettings["s3ServiceUrl"], WebConfigurationManager.AppSettings["clientBucketName"], s.FileName)));

            AutoMapper.Mapper.CreateMap<Song, SongCsvModel>()
                .ForMember(d => d.Performer, o => o.MapFrom(s => s.Performer.Name))
                .ForMember(d => d.Publisher, o => o.MapFrom(s => s.Publisher.Name))
                .ForMember(d => d.Packages, o => o.Ignore())
                .ForMember(d => d.Atmospheres, o => o.Ignore())
                .ForMember(d => d.Genres, o => o.Ignore())
                .ForMember(d => d.NickNames, o => o.Ignore())
                .ForMember(d => d.Name, o => o.MapFrom(s => s.FullName));

            //-------------------------------------Recommendations--------------------------------------------------------
            AutoMapper.Mapper.CreateMap<Recommendation, RecommendationWebModel>();
            AutoMapper.Mapper.CreateMap<RecommendationWebModel, Recommendation>();

            AutoMapper.Mapper.CreateMap<RecommendationBpm, BpmWebModel>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.BpmId))
                .ForMember(d => d.Name, o => o.MapFrom(s => s.Bpm.Name));

            AutoMapper.Mapper.CreateMap<RecommendationGenre, GenreWebModel>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.GenreId))
                .ForMember(d => d.Name, o => o.MapFrom(s => s.Genre.Name));

            AutoMapper.Mapper.CreateMap<RecommendationAtmosphere, AtmosphereWebModel>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.AtmosphereId))
                .ForMember(d => d.Name, o => o.MapFrom(s => s.Atmosphere.Name));

            AutoMapper.Mapper.CreateMap<RecommendationNickname, NicknameWebModel>()
              .ForMember(d => d.Id, o => o.MapFrom(n => n.NicknameId))
              .ForMember(d => d.Name, o => o.MapFrom(n => n.Nickname.Name));

            AutoMapper.Mapper.CreateMap<SongRecommendation, SongRecommendationWebModel>();
            AutoMapper.Mapper.CreateMap<SongRecommendationWebModel, SongRecommendation>();

            AutoMapper.Mapper.CreateMap<SongPosition, SongPositionWebModel>();
            AutoMapper.Mapper.CreateMap<SongPositionWebModel, SongPosition>();

            //-------------------------------------Chart models------------------------------------------------------------

            AutoMapper.Mapper.CreateMap<Publisher, SongsByPublisherChartWebModel>()
                .ForMember(d => d.label, o => o.MapFrom(s => s.Name))
                .ForMember(d => d.data, o => o.MapFrom(s => s.SongsCounter));

            AutoMapper.Mapper.CreateMap<Recommendation, CsvWebModel>()
                .ForMember(d => d.ColumnOne, o => o.MapFrom(s => s.Id.ToString()))
                .ForMember(d => d.ColumnTwo, o => o.MapFrom(s => s.Name));
            //.ForMember(d => d.ColumnThree, o => o.MapFrom(s => s.License != null ? s.License.UserId.ToString() : string.Empty))
            //.ForMember(d => d.ColumnFour, o => o.MapFrom(s => s.License != null ? s.License.Username : "System"))
            //.ForMember(d => d.ColumnFive, o => o.MapFrom(s => s.License != null ? s.License.Id.ToString() : string.Empty))
            //.ForMember(d => d.ColumnSeven, o => o.MapFrom(s => s.SongsPackage.Name))
            //.ForMember(d => d.ColumnEight, o => o.MapFrom(s => s.RecommendedDate.HasValue ? s.RecommendedDate.Value.ToString() : string.Empty));

            AutoMapper.Mapper.CreateMap<License, CsvWebModel>()
                .ForMember(d => d.ColumnOne, o => o.MapFrom(s => s.Id.ToString()))
                .ForMember(d => d.ColumnTwo, o => o.MapFrom(s => s.Username.ToString()))
                .ForMember(d => d.ColumnThree, o => o.MapFrom(s => s.UserId.ToString()))
                .ForMember(d => d.ColumnFour, o => o.MapFrom(s => s.User.Username))
                .ForMember(d => d.ColumnFive, o => o.MapFrom(s => s.EndDate.ToString()))
                .ForMember(d => d.ColumnSix, o => o.MapFrom(s => (s.Active && s.EndDate > DateTime.Now).ToString()));

            AutoMapper.Mapper.CreateMap<IncomesChart, CsvWebModel>()
                .ForMember(d => d.ColumnOne, o => o.MapFrom(s => s.Month + "/" + s.Year))
                .ForMember(d => d.ColumnTwo, o => o.MapFrom(s => s.Sum));
            //------------------------------------player-------------------------------------------------------------------


            AutoMapper.Mapper.CreateMap<ChromePlayerJsonData, ChromePlayerJsonWebData>();



            //------------------------------------ Clients -------------------------------------------------------------------
            AutoMapper.Mapper.CreateMap<User, ClientIndexWebModel>()
                .ForMember(d => d.Password, o => o.Ignore());


            AutoMapper.Mapper.CreateMap<ClientIndexWebModel, User>()
                .ForMember(d => d.Id, o => o.Ignore())
                .ForMember(d => d.Licenses, o => o.Ignore())
                .ForMember(d => d.Services, o => o.Ignore())
                .ForMember(d => d.Password, o => o.Ignore());

            AutoMapper.Mapper.CreateMap<License, ClientLicense>()
                .ForMember(d => d.ExpirationStr, o => o.MapFrom(l => l.EndDate.ToShortDateString()))
                .ForMember(d => d.StartDateStr, o => o.MapFrom(s => s.StartDate.ToShortDateString()))
                .ForMember(d => d.Expiration, o => o.MapFrom(s => s.EndDate))
                .ForMember(d => d.LicenseUserName ,o=>o.MapFrom(s=>s.Username))
                .ForMember(d=>d.LicenseNickname, o=>o.MapFrom(s=>s.Nickname))
                .ForMember(d=>d.LicenseComments, o=>o.MapFrom(s=>s.Comments));

            AutoMapper.Mapper.CreateMap<ClientLicense, License>()
                .ForMember(d => d.EndDate, o => o.MapFrom(s => s.ExpirationStr))
                .ForMember(d => d.Id, o => o.MapFrom(s => s.LicenseId))
                .ForMember(d => d.Active, o => o.UseValue(true));

            AutoMapper.Mapper.CreateMap<UserSpecialService, ClientService>()
                .ForMember(d => d.ServiceId, o => o.MapFrom(s => s.SpecialServiceId))
                .ForMember(d => d.UserServiceId, o => o.MapFrom(s => s.Id))
                .ForMember(d => d.ServiceName, o => o.MapFrom(s => s.SpecialService.Name))
                .ForMember(d => d.ServiceDescription, o => o.MapFrom(s => s.SpecialService.Description))
                .ForMember(d => d.ServicePrice, o => o.MapFrom(s => s.SpecialService.Price));

            AutoMapper.Mapper.CreateMap<ClientService, UserSpecialService>()
                .ForMember(d => d.SpecialServiceId, o => o.MapFrom(s => s.ServiceId));

            AutoMapper.Mapper.CreateMap<User, ClientCsvModel>()
                .ForMember(d => d.License, o => o.MapFrom(s => s.Licenses.Count))
                .ForMember(d => d.Services, o => o.MapFrom(s => s.Services.Count));



            //---------------------------------- License -----------------------------------
            AutoMapper.Mapper.CreateMap<LicenseWebModel, License>();
            AutoMapper.Mapper.CreateMap<License, LicenseWebModel>()
                .ForMember(d=>d.PriceListName, o=>o.MapFrom(s=>s.PriceList.Name))
                .ForMember(d=>d.ShowExtend, o=>o.MapFrom(s=>(DateTime.Now.AddMonths(2) > s.EndDate)));

            //---------------------- website ----------------

            AutoMapper.Mapper.CreateMap<PortfolioItem, PortfolioItemWebModel>()
                .ForMember(d => d.image, o => o.MapFrom(p => Consts.CmsConsts.PortfolioRelativePath + p.Image))
                .ForMember(d => d.video, o => o.MapFrom(p => p.VideoLink));


            AutoMapper.Mapper.CreateMap<Lead, LeadWebModel>()
                .ForMember(d => d.Date, o => o.MapFrom(l => l.Created.ToShortDateString()))
                .ForMember(d => d.Time, o => o.MapFrom(l => l.Created.ToShortTimeString()));

        }

    }
}
