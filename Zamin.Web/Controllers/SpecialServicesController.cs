using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Configuration;
using System.Web.Http;
using System.Web.Mvc;
using CsvHelper;
using CsvHelper.Configuration;
using Music4Biz.Consts;
using Music4Biz.Helpers;
using Music4Biz.Models;
using Muzisc4Biz.Helpers;
using Muzisc4Biz.WebModels;

namespace Music4Biz.Web.Controllers
{
    public class SpecialServicesController : BaseApiController
    {
        [System.Web.Http.HttpGet]
        public JsonResult RemoveUnderScores(string code)
        {
            var result = new JsonResult()
            {
                Data = new
                {
                    success = false
                }
            };

            if (code != GlobalConsts.RemoveUnderscoreCode) return result;

            var songs = UOW.SongRepository.GetAllSongs();
            foreach (var song in songs)
            {
                if (!string.IsNullOrWhiteSpace(song.Name) && song.Name.Contains(GlobalConsts.UnderScore))
                {
                    song.Name = StringHelpers.RemoveUnderscore(song.Name);
                }
            }
            var songSuccess = UOW.Save();

            var performers = UOW.PerformersRepository.GetAllPerformers();
            foreach (var performer in performers)
            {
                if (!string.IsNullOrWhiteSpace(performer.Name) && performer.Name.Contains(GlobalConsts.UnderScore))
                {
                    performer.Name = StringHelpers.RemoveUnderscore(performer.Name);
                }
            }
            var performerSuccess = UOW.Save();

            result.Data = new
            {
                songsSuccess = songSuccess.Success,
                performersSuccess = performerSuccess.Success
            };
            return result;

        }


        [System.Web.Http.HttpGet]
        public JsonResult GetUnsavedSongs(string code)
        {

            var result = new JsonResult()
            {
                Data = new
                {
                    success = false
                },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };

            if (code != GlobalConsts.RemoveUnderscoreCode) return result;

            var unsavedSongs = UOW.SongRepository.GetAndRemoveUnsavedSongs();
            if (unsavedSongs.Count > 0)
            {
                return new JsonResult()
                {
                    Data = new
                    {
                        success = true
                    },
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet
                };
            }
            return result;

        }

        [System.Web.Http.HttpGet]
        public bool DownloadDeletedFiles()
        {
            var success = UOW.SongRepository.DownloadDeletedFiles(WebConfigurationManager.AppSettings["adminBucketName"], "FIX");
            return success;
        }


    }
}
