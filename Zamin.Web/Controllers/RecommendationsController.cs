using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Net;
using System.Web.Mvc;
using Music4Biz.Models;
using Music4Biz.Web.Attributes;
using Music4Biz.WebModels;

namespace Music4Biz.Web.Controllers
{
    [Authorize]
    [Administrator]
    public class RecommendationsController : BaseController
    {
        // GET: Recommendations
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Recommendation()
        {
            return View();
        }

        //id is recommednationId
        public ActionResult SongRecomendationPositions(int id)
        {
            return View();
        }

        public JsonResult GetIndexData()
        {
            var recommendations = UOW.RecommendationRepository.GetAllActiveRecommendations().ToList();
            var recommendationWeb =
                recommendations.Select(AutoMapper.Mapper.Map<Recommendation, RecommendationWebModel>).ToList();

            return Json(recommendationWeb, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCreateEditData(int? recommendationId)
        {
            var atmospheresDb = UOW.AtmospherRepository.GetAllAtmospheres();
            var atmospheres = atmospheresDb.Select(AutoMapper.Mapper.Map<Atmosphere, AtmosphereWebModel>).ToList();

            var genresDb = UOW.GenreRepository.GetAllGenres();
            var genres = genresDb.Select(AutoMapper.Mapper.Map<Genre, GenreWebModel>).ToList();

            var nicknamesDb = UOW.NicknameRepository.GetAllActiveNicknames();
            var nicknames = nicknamesDb.Select(AutoMapper.Mapper.Map<Nickname, NicknameWebModel>).ToList();

            var bpmsDb = UOW.BpmRepository.GetAllBpms();
            var bpms = bpmsDb.Select(AutoMapper.Mapper.Map<Bpm, BpmWebModel>).ToList();

            var recommendationName = string.Empty;

            if (recommendationId.HasValue)
            {
                foreach (var atmosphere in atmospheres.Where(atmosphere => UOW.RecommendationRepository.IsAtmosphereInRecommendation(recommendationId.Value, atmosphere.Id)))
                {
                    atmosphere.Selected = true;
                }

                foreach (var genre in genres.Where(genre => UOW.RecommendationRepository.IsGenreInRecommendation(recommendationId.Value, genre.Id)))
                {
                    genre.Selected = true;
                }

                foreach (var nickname in nicknames.Where(nickname => UOW.RecommendationRepository.IsNicknameInRecommendation(recommendationId.Value, nickname.Id)))
                {
                    nickname.Selected = true;
                }

                foreach (var bpm in bpms.Where(bpm => UOW.RecommendationRepository.IsBpmInRecommendation(recommendationId.Value, bpm.Id)))
                {
                    bpm.Selected = true;
                }

                recommendationName = UOW.RecommendationRepository.GetRecommendationById(recommendationId.Value).Name;
            }

            var json = new JsonResult()
            {
                Data = new
                {
                    bpms,
                    genres,
                    atmospheres,
                    recommendationName,
                    nicknames

                },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
            return json;

        }

        [HttpPost]
        public JsonResult SaveRecommendation(RecommendationWebModel recommendationWeb)
        {

            var success = false;
            if (recommendationWeb.Id.HasValue)
            {
                success = UOW.RecommendationRepository.EditRecommendation(recommendationWeb);
                if (success) SetSuccessMessage();
                else SetErrorMessage();
                return Json(recommendationWeb.Id.Value);

            }
            else
            {
                var id = UOW.RecommendationRepository.CreateRecommendation(recommendationWeb);
                if (id > 0) SetSuccessMessage();
                else SetErrorMessage();
                return Json(id);
            }

        }

        [HttpPost]
        public JsonResult Delete(int id)
        {
            var success = UOW.RecommendationRepository.DeleteRecommendation(id);
            return Json(success);
        }

        [HttpGet]
        public JsonResult GetSongsByRecommendation(int id)
        {
            var recommendationName = UOW.RecommendationRepository.GetRecommendationById(id).Name;
            var songs = UOW.SongRepository.GetSongsByRecommendation(id).ToList();
            var songsWeb = songs.Select(AutoMapper.Mapper.Map<Song, SongWebModel>);
            var songsWithPosition = new List<SongWebModel>();
            foreach (var song in songsWeb)
            {
                var songRecommendation = songs.FirstOrDefault(s => s.Id == song.Id).SongRecommendations.FirstOrDefault(r => r.RecommendationId == id);
                if (songRecommendation == null)
                {
                    //songsWithPosition.Add(song);
                    continue;
                }
                foreach (var position in songRecommendation.Positions)
                {
                    var songWithPosition = new SongWebModel()
                    {
                        Id = song.Id,
                        Active = song.Active,
                        position = position.Position,
                        SongName = song.SongName,
                        SongUrl = song.SongUrl,
                        FullName = song.FullName,
                        FileName = song.FileName
                    };
                    songsWithPosition.Add(songWithPosition);
                }
            }

            var json = new JsonResult()
            {
                Data = new
                {
                    songsWithPosition,
                    songsWeb,
                    recommendationName
                },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
            json.MaxJsonLength = int.MaxValue;
            return json;
        }

        public JsonResult SaveSongsWithoutPositions(int recommendationId)
        {
            var success = UOW.SongRepository.SaveSongsWithoutPositions(recommendationId);
            if (success) SetSuccessMessage();
            else SetErrorMessage();
            return Json(success);
        }

        public JsonResult UpdateSongPosition(int recommendationId, SongWebModel song)
        {
            var success = UOW.SongRepository.UpdateSongPosition(recommendationId, song);
            if (success) SetSuccessMessage();
            else SetErrorMessage();
            return Json(success);
        }

        public JsonResult CreateSongPosition(int recommendationId, SongWebModel song)
        {
            var success = UOW.SongRepository.CreateSongPosition(recommendationId, song);
            if (success) SetSuccessMessage();
            else SetErrorMessage();
            return Json(success);
        }

        public JsonResult DeleteSongPosition(int recommendationId, SongWebModel song)
        {
            var success = UOW.SongRepository.DeleteSongPosition(recommendationId, song);
            if (success) SetSuccessMessage();
            else SetErrorMessage();
            return Json(success);
        }

        public void DownloadFiles(int recommendationId)
        {
            var user = UOW.UserRepository.GetUser(User.Identity.Name);
            var songs = UOW.SongRepository.GetSongsByRecommendation(recommendationId);
            var songsWithPosition = new List<SongWebModel>();
            foreach (var song in songs)
            {
                var songRecommendation = songs.FirstOrDefault(s => s.Id == song.Id).SongRecommendations.FirstOrDefault(r => r.RecommendationId == recommendationId);
                if (songRecommendation == null)
                {
                    //songsWithPosition.Add(song);
                    continue;
                }
                foreach (var position in songRecommendation.Positions)
                {
                    var songWithPosition = new SongWebModel()
                    {
                        Id = song.Id,
                        Active = song.Active,
                        position = position.Position,
                        SongName = song.Name,
                        FullName = song.FullName,
                        FileName = song.FileName
                    };
                    songsWithPosition.Add(songWithPosition);
                }
            }

            var success = Helpers.S3Helper.DownloadSongsRecommendationFromS3(recommendationId, songsWithPosition.OrderBy(s => s.position).ToList());
  

            //create zip file
            var recommendation = UOW.RecommendationRepository.GetRecommendationById(recommendationId);
            var recoName = recommendation.Name.Replace('/', '-').Replace('\\', '-');
            var directory = Path.Combine(Consts.GlobalConsts.ZipFilesDirectory + recommendationId);
            var destinationFolder = Path.Combine(Consts.GlobalConsts.ZipFilesDirectory + recommendationId + "zip");
            var destinationFile = Path.Combine(Consts.GlobalConsts.ZipFilesDirectory + recommendationId + "zip/" + recoName + ".zip");

            

            //delete old zip directory
            if (Directory.Exists(destinationFolder))
            {
                Directory.Delete(destinationFolder, true);
            }

            Directory.CreateDirectory(destinationFolder);

            ZipFile.CreateFromDirectory(directory, destinationFile, CompressionLevel.Optimal, false);


            if (success)
            {
                var serverUrl = Consts.GlobalConsts.ServerUrl;
                UOW.EmailRepository.SendZipLinkMail(user.Email, serverUrl + "Recommendations/GetSongsInZip?recommendationId=" + recommendationId,
                        Consts.MandrilTemlatesNames.DownloadRecommendationSongs);
            }

        }


        public void SaveRecommendationsOrder(List<RecommendationWebModel> recommendations)
        {
            var success = UOW.RecommendationRepository.SaveRecommendationsOrder(recommendations);

            if (success)
            {
                SetSuccessMessage();
            }
            else
            {
                SetErrorMessage();
            }
        }

        public FileResult GetSongsInZip(int recommendationId)
        {
            var recommendation = UOW.RecommendationRepository.GetRecommendationById(recommendationId);
            var directory = Path.Combine(Consts.GlobalConsts.ZipFilesDirectory + recommendationId);
            var destinationFolder = Path.Combine(Consts.GlobalConsts.ZipFilesDirectory + recommendationId + "zip");
            var recoName = recommendation.Name.Replace('/', '-').Replace('\\', '-');
            var destinationFile = Path.Combine(Consts.GlobalConsts.ZipFilesDirectory + recommendationId + "zip/" + recoName + ".zip");

            return File(destinationFile, "application/zip", recoName + ".zip");
        }

    }
}