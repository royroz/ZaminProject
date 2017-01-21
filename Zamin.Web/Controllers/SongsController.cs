using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;
using Amazon.S3;
using Amazon.S3.Model;
using CsvHelper;
using CsvHelper.Configuration;
using Music4Biz.Models;
using Music4Biz.Helpers;
using Music4Biz.Web.Attributes;
using Music4Biz.WebModels;
using Muzisc4Biz.Helpers;
using Muzisc4Biz.WebModels;

namespace Music4Biz.Web.Controllers
{
    [Authorize]
    [Administrator]
    public class SongsController : BaseController
    {

        //id is performerId
        public ActionResult Index(int? id)
        {
            if (id.HasValue) return View(id);
            return View(-1);
        }

        public ActionResult Tag()
        {
            return View();
        }
        //id is recommendation Id
        public ActionResult SongsView(int id)
        {
            return View();
        }

        [HttpPost]
        public JsonResult Create(List<SongWebModel> songs, string name, Bpm bpm, Publisher publisher, Performer performer, List<GenreWebModel> genres, List<SongsPackageWebModel> packages, List<AtmosphereWebModel> atmospheres, List<NicknameWebModel> nicknames, string folder)
        {
            var successCounter = 0;
            foreach (var song in songs)
            {

                var fileGuidName = Guid.NewGuid().ToString();
                var success = UOW.SongRepository.Create(song, bpm, publisher, performer, genres, packages, atmospheres,
                    nicknames, fileGuidName, name);
                if (success)
                {
                    successCounter++;
                    //moving file to client bucket
                    var s3Config = new AmazonS3Config();
                    s3Config.ServiceURL = WebConfigurationManager.AppSettings["s3ServiceUrl"];
                    var s3Client = new AmazonS3Client(s3Config);
                    var requestCopyObject = new CopyObjectRequest()
                    {
                        SourceBucket = WebConfigurationManager.AppSettings["adminBucketName"],
                        SourceKey =
                            song.SongUrl.Remove(0,
                                (string.Format("{0}/{1}", WebConfigurationManager.AppSettings["s3ServiceUrl"],
                                    WebConfigurationManager.AppSettings["clientBucketName"])).Length),
                        DestinationBucket =
                            string.Format("{0}/songs", WebConfigurationManager.AppSettings["clientBucketName"]),
                        DestinationKey = fileGuidName,
                        CannedACL = S3CannedACL.PublicRead,
                    };
                    try
                    {
                        s3Client.CopyObject(requestCopyObject);
                    }
                    catch (Exception e)
                    {
                        continue;
                    }
                    //delete the file from the admin bucket
                    var deleteObjectRequest = new DeleteObjectRequest()
                    {
                        BucketName = WebConfigurationManager.AppSettings["adminBucketName"],
                        Key = song.SongUrl.Remove(0, (string.Format("{0}/{1}", WebConfigurationManager.AppSettings["s3ServiceUrl"], WebConfigurationManager.AppSettings["clientBucketName"])).Length)
                    };
                    s3Client.DeleteObject(deleteObjectRequest);
                }
            }

            if (successCounter != songs.Count)
            {
                SetErrorMessage();
                return new JsonResult()
                {
                    Data = new
                    {
                        result = false,
                        folder = folder
                    }
                };
            }

            SetSuccessMessage();

            return new JsonResult()
            {
                Data = new
                {
                    result = true,
                    folder = folder
                }
            };

        }

        public JsonResult EditSongs(List<int> songsIds, BpmWebModel bpm, PublisherWebModel publisher, PerformerWebModel performer,
            List<GenreWebModel> genres, List<SongsPackageWebModel> packages, List<AtmosphereWebModel> atmospheres,
            List<NicknameWebModel> nicknames)
        {
            //if (songsIds.Count == 0 || ((bpm == null || bpm.Id == 0) && (publisher == null ||  publisher.Id == 0) &&  (performer== null  || performer.Id == 0)))
            if (songsIds.Count == 0)
            {
                return Json(false);
            }

            foreach (var id in songsIds)
            {
                var songDb = UOW.SongRepository.GetSong(id);

                var songPerformer = new PerformerWebModel {Id = performer.Id};
                var songPublisher = new PublisherWebModel { Id = publisher.Id };
                var songBpm = new BpmWebModel { Id = bpm.Id };

                if (songPublisher.Id == 0 && songDb.PublisherId.HasValue)
                {
                    songPublisher.Id = songDb.PublisherId.Value;
                }

                if (songPerformer.Id == 0 && songDb.PerformerId.HasValue)
                {
                    songPerformer.Id = songDb.PerformerId.Value;
                }

                if (songBpm.Id == 0 && songDb.BpmId.HasValue)
                {
                    songBpm.Id = songDb.BpmId.Value;
                }

                var song = new SongWebModel
                {
                    Id = id,
                    Bpm = songBpm,
                    Atmospheres = atmospheres,
                    Genres = genres,
                    Nicknames = nicknames,
                    Packages = packages,
                    Performer = songPerformer,
                    Publisher = songPublisher,
                    FileName =  songDb.FileName
                };
                Update(song);
            }
            return Json(true);
        }

        [HttpGet]
        public JsonResult GetIndexData(int? performerId, int page)
        {
            var songsInPage = int.Parse(Consts.GlobalConsts.SongsInPage);
            var songsDb = new List<Song>();
            if (!performerId.HasValue)
            {
                songsDb = UOW.SongRepository.GetAllSongs().ToList();
            }
            else
            {
                songsDb = UOW.SongRepository.GetSongsByPerformer(performerId.Value).ToList();
            }
            var numberOfSongs = songsDb.Count;
            var numberOfPages = Math.Ceiling((numberOfSongs / double.Parse(Consts.GlobalConsts.SongsInPage)));

            songsDb = songsDb.Skip(page * songsInPage).Take(songsInPage).ToList();

            var songs = songsDb.Select(AutoMapper.Mapper.Map<Song, SongWebModel>);
            var json = new JsonResult()
            {
                Data = new
                {
                    songs,
                    numberOfPages,
                },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
            return json;
        }

        [HttpGet]
        public JsonResult GetSongsByFilter(int? performerId, string keyword, int page)
        {
            var keywordLower = keyword.ToLower();

            var songsInPage = int.Parse(Consts.GlobalConsts.SongsInPage);
            var songsDb = new List<Song>();
            if (!performerId.HasValue)
            {
                songsDb = UOW.SongRepository.GetAllSongs().Where(s => s.Name.ToLower().Contains(keywordLower) || s.Performer.Name.ToLower().Contains(keywordLower)).OrderBy(s => s.Id).ToList();
            }
            else
            {
                songsDb = UOW.SongRepository.GetSongsByPerformer(performerId.Value).Where(s => s.Name.ToLower().Contains(keywordLower) || s.Performer.Name.ToLower().Contains(keywordLower)).OrderBy(s => s.Id).ToList();
            }
            var numberOfSongs = songsDb.Count;
            var numberOfPages = Math.Ceiling((numberOfSongs / double.Parse(Consts.GlobalConsts.SongsInPage)));

            songsDb = songsDb.Skip(page * songsInPage).Take(songsInPage).ToList();
            var songs = songsDb.Select(AutoMapper.Mapper.Map<Song, SongWebModel>);
            var json = new JsonResult()
            {
                Data = new
                {
                    songs,
                    numberOfPages,
                },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
            return json;
        }

        [HttpGet]
        public JsonResult GetSongsByGenre(int genreId, int page)
        {
            var songsInPage = int.Parse(Consts.GlobalConsts.SongsInPage);
            var songsDb = UOW.SongRepository.GetSongsByGenre(genreId);
            var numberOfSongs = songsDb.Count;
            var numberOfPages = Math.Ceiling((numberOfSongs / double.Parse(Consts.GlobalConsts.SongsInPage)));
            songsDb = songsDb.Skip(page * songsInPage).Take(songsInPage).ToList();
            var songs = songsDb.Select(AutoMapper.Mapper.Map<Song, SongWebModel>);
            var json = new JsonResult()
            {
                Data = new
                {
                    songs,
                    numberOfPages,
                },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
            return json;

        }


        public JsonResult GetInitData(int? songId)
        {
            var performersDb = UOW.PerformersRepository.GetAllPerformers().ToList();
            var performers = performersDb.Select(AutoMapper.Mapper.Map<Performer, PerformerWebModel>).ToList();

            var publishersDb = UOW.PublisherRepository.GetAllPublishers().ToList();
            var publishers = publishersDb.Select(AutoMapper.Mapper.Map<Publisher, PublisherWebModel>).ToList();

            var atmosphereDb = UOW.AtmospherRepository.GetAllAtmospheres();
            var atmospheres = atmosphereDb.Select(AutoMapper.Mapper.Map<Atmosphere, AtmosphereWebModel>).ToList();

            var genresDb = UOW.GenreRepository.GetAllGenres();
            var genres = genresDb.Select(AutoMapper.Mapper.Map<Genre, GenreWebModel>).ToList();

            var nicknamesDb = UOW.NicknameRepository.GetAllActiveNicknames();
            var nicknames = nicknamesDb.Select(AutoMapper.Mapper.Map<Nickname, NicknameWebModel>).ToList();

            var packagesDb = UOW.SongPackageRepository.GetAllSongsPackages();
            var packages = packagesDb.Select(AutoMapper.Mapper.Map<SongsPackage, SongsPackageWebModel>).ToList();

            var bpmsDb = UOW.BpmRepository.GetAllBpms();
            var bpms = bpmsDb.Select(AutoMapper.Mapper.Map<Bpm, BpmWebModel>).ToList();

            var s3Folders = S3Helper.GetSongsFoldersS3(WebConfigurationManager.AppSettings["adminBucketName"]);
            var songsIndexFolder = S3Helper.GetSongsFromS3(WebConfigurationManager.AppSettings["adminBucketName"]);

            SongWebModel song = null;

            if (songId.HasValue)
            {
                var songDb = UOW.SongRepository.GetSong(songId.Value);
                song = AutoMapper.Mapper.Map<Song, SongWebModel>(songDb);
                foreach (var genre in genres)
                {
                    if (song.Genres.Any(g => g.Id == genre.Id))
                    {
                        genre.Selected = true;
                    }
                }
                foreach (var atmosphere in atmospheres)
                {
                    if (song.Atmospheres.Any(a => a.Id == atmosphere.Id))
                    {
                        atmosphere.Selected = true;
                    }
                }
                foreach (var nickname in nicknames)
                {
                    if (song.Nicknames.Any(a => a.Id == nickname.Id))
                    {
                        nickname.Selected = true;
                    }
                }
                foreach (var package in packages)
                {
                    if (song.Packages.Any(a => a.Id == package.Id))
                    {
                        package.Selected = true;
                    }
                }
            }

            var json = new JsonResult()
            {
                Data = new
                {
                    performers,
                    publishers,
                    atmospheres,
                    genres,
                    nicknames,
                    packages,
                    bpms,
                    songsIndexFolder,
                    s3Folders,
                    song

                },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet

            };
            return json;
        }

        public ActionResult Update(SongWebModel webModel)
        {
            var song = UOW.SongRepository.GetSong(webModel.Id);
            if ((song.PublisherId.HasValue && webModel.Publisher != null && song.PublisherId != webModel.Publisher.Id) || (!song.PublisherId.HasValue && webModel.Publisher != null)){
                UOW.PublisherRepository.UpdatePublisherSongCount(webModel.Publisher.Id, song.PublisherId);

            }
            var originalName = song.Name;
            AutoMapper.Mapper.Map(webModel, song);
            if (song.Name == null) song.Name = originalName;
            if (song.BpmId == 0) song.BpmId = null;
            if (song.PerformerId == 0) song.PerformerId = null;
            if (song.PublisherId == 0) song.PublisherId = null;
            song.Active = true;
            var atmList = new List<Atmosphere>();
            if (webModel.Atmospheres != null)
            {
                foreach (var atmosphere in webModel.Atmospheres)
                {
                    atmList.Add(UOW.AtmospherRepository.GetAtmosphere(atmosphere.Id));
                }
            }
            song.Atmospheres = atmList;

            var genreList = new List<Genre>();
            if (webModel.Genres != null)
            {

                foreach (var genre in webModel.Genres)
                {
                    genreList.Add(UOW.GenreRepository.GetGenre(genre.Id));
                }

            }
            song.Genres = genreList;

            var packageList = new List<SongsPackage>();
            if (webModel.Packages != null)
            {

                foreach (var package in webModel.Packages)
                {
                    packageList.Add(UOW.SongPackageRepository.GetPackage(package.Id));
                }

            }
            song.Packages = packageList;

            var nicknameList = new List<Nickname>();
            if (webModel.Nicknames != null)
            {

                foreach (var nickname in webModel.Nicknames)
                {
                    nicknameList.Add(UOW.NicknameRepository.GetNickname(nickname.Id));
                }

            }
            song.NickNames = nicknameList;

            var success = UOW.SongRepository.Update(song);

            if (success)
            {
                SetSuccessMessage();
            }
            else
            {
                SetErrorMessage();
            }


            return RedirectToAction("Index");
        }

        [HttpPost]
        public void Delete(int songId)
        {
            UOW.SongRepository.DeleteSong(songId);
        }

        public JsonResult GetSongsFromFolder(string folderName)
        {
            var songs = S3Helper.GetSongsFromS3ByFolder(WebConfigurationManager.AppSettings["adminBucketName"], folderName);
            return Json(songs, JsonRequestBehavior.AllowGet);
        }

        //id is recommendation id
        public FileResult GetSongsCsv(int id)
        {
            var stream = new MemoryStream();
            var writer = new StreamWriter(stream, Encoding.UTF8);
            var csvConfig = new CsvConfiguration { Encoding = Encoding.UTF8 };
            var csv = new CsvWriter(writer, csvConfig);

            var songCsvModels = GetSongsCsvModel(id);
            csv.WriteRecords(songCsvModels);
            writer.Flush();
            stream.Position = 0;
            var fileName = id > 0 ? UOW.RecommendationRepository.GetRecommendationById(id).Name : "allSongs";
            return File(stream, "text/csv",
                string.Format("{0}_{1}_{2}.csv", fileName, DateTime.Now.ToShortDateString(), DateTime.Now.ToLongTimeString())
                    .Replace(':', '-'));
        }

        [HttpGet]
        public JsonResult GetSongsViewData(int recommendationId)
        {
            var songsCsv = GetSongsCsvModel(recommendationId);
            return Json(songsCsv, JsonRequestBehavior.AllowGet);
        }

        //id is recommendation id
        private List<SongCsvModel> GetSongsCsvModel(int id)
        {
            var songsDb = id > 0
                ? UOW.SongRepository.GetSongsByRecommendation(id).ToList()
                : UOW.SongRepository.GetAllSongs().ToList();

            var songs = songsDb.Select(AutoMapper.Mapper.Map<Song, SongCsvModel>);

            var songCsvModels = songs as IList<SongCsvModel> ?? songs.ToList();
            songCsvModels = songCsvModels.OrderBy(s => s.Id).ToList();
            foreach (var song in songCsvModels)
            {
                var songDb = songsDb.Single(s => s.Id == song.Id);
                song.Packages = songDb.Packages.Aggregate(string.Empty,
                    (current, p) => string.Format("{0} {1}", current, p.Name));

                song.Atmospheres = songDb.Atmospheres.Aggregate(string.Empty,
                    (current, a) => string.Format("{0} {1}", current, a.Name));

                song.Genres = songDb.Genres.Aggregate(string.Empty,
                    (current, g) => string.Format("{0} {1}", current, g.Name));

                song.NickNames = songDb.NickNames.Aggregate(string.Empty,
                    (current, n) => string.Format("{0} {1}", current, n.Name));
            }
            return songCsvModels.ToList();
        }

        public JsonResult SaveSongsIsFavorite(int songId, bool isFavorite)
        {
            var success = UOW.SongRepository.SaveSongsIsFavorite(songId, isFavorite);
            if (success)
            {
                SetSuccessMessage();
            }
            else
            {
                SetErrorMessage();
            }
            return Json(success);
        }

        //[System.Web.Http.HttpGet]
        //public FileResult GetUnsavedSongs()
        //{
        //    var unsavedSongs = UOW.SongRepository.GetAndRemoveUnsavedSongs();
        //    var stream = new MemoryStream();
        //    var writer = new StreamWriter(stream, Encoding.UTF8);
        //    var csvConfig = new CsvConfiguration { Encoding = Encoding.UTF8 };
        //    var csv = new CsvWriter(writer, csvConfig);
        //    var songCsvModels = unsavedSongs.Select(AutoMapper.Mapper.Map<Song, SongCsvModel>);
        //    csv.WriteRecords(songCsvModels);
        //    writer.Flush();
        //    stream.Position = 0;
        //    var fileName = "Unsaved Songs";
        //    return File(stream, "text/csv", string.Format("{0}.csv", fileName));
        //}

    }
}