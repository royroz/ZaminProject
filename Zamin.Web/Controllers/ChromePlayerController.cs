using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using Microsoft.Ajax.Utilities;
using Music4Biz.Models;
using Music4Biz.WebModels;

namespace Music4Biz.Web.Controllers
{
    public class ChromePlayerController : BaseApiController
    {

        [System.Web.Http.HttpGet]
        public JsonResult Login(string username, string password)
        {
            var licenseApiKey = UOW.LicenceRepository.ValidateLicense(username, password);
            var result = new JsonResult()
            {
                Data = new
                {
                    success = licenseApiKey != string.Empty,
                    licenseApiKey = licenseApiKey
                },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
            return result;
        }

        [System.Web.Http.HttpGet]
        public ChromePlayerJsonWebData GetDataFromLastUpdate(string licenseApiKey, long? timeStampLastUpdated, int? page)
        {
            var license = UOW.LicenceRepository.GetLicenseByApiKey(licenseApiKey);
            if (license == null) return null;

            DateTime? lastUpdated = null;
            if (timeStampLastUpdated != null)
            {
                lastUpdated = new DateTime(timeStampLastUpdated.Value);
            }

            var pageValue = -1;
            if (!timeStampLastUpdated.HasValue)//first time
            {
                pageValue = page.HasValue ? page.Value : 0;
            }
            var playerData = UOW.PlayerRepository.GetDataFromLastUpdate(lastUpdated, pageValue);

            UOW.Save();

            var playerDataWeb = AutoMapper.Mapper.Map<ChromePlayerJsonData, ChromePlayerJsonWebData>(playerData);
            playerDataWeb.LastUpdated = GetCurrentTicks();
            return playerDataWeb;
        }

        [System.Web.Http.HttpGet]
        public JsonResult IsUpdateRequired(string licenseApiKey, long? timeStampLastUpdated)
        {
            var isUpdateRequired = true;
            if (timeStampLastUpdated != null)
            {
                var lastUpdated = new DateTime(timeStampLastUpdated.Value);

                isUpdateRequired = UOW.PlayerRepository.IsUpdateSongsRequired(lastUpdated);
            }

            var canPlay = CanPlay(licenseApiKey);
            //var packageChanged = UOW.LicenceRepository.IsPackagedChanged(licenseApiKey);

            UOW.PlayerRepository.LogUpUpdateRequest(licenseApiKey, timeStampLastUpdated, canPlay, isUpdateRequired);

            var json = new JsonResult()
            {
                Data = new
                {
                    isUpdateRequired = isUpdateRequired,
                    canPlay = canPlay,
                    packageChanged = new     // packageChanged section is not in use
                    {
                        isChanged = false,
                        currentPackage = 2
                    }
                },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };

            return json;
        }

        //[System.Web.Http.AcceptVerbs("GET")]
        //public string IsUpdateRequired(string licenseApiKey, DateTime? lastUpdated)
        //{
        //    if (lastUpdated == null) return "-1";
        //    return UOW.PlayerRepository.IsUpdateSongsRequired(lastUpdated.Value) == true ? "1" : "-1";
        //}


        [System.Web.Http.HttpGet]
   
        public void LogPlayerSong(string licenseApiKey, int songId, int? recommendationId)
        {
            if (!string.IsNullOrWhiteSpace(licenseApiKey))
            {
                UOW.PlayerRepository.LogPlayerSong(licenseApiKey, songId, recommendationId);
            }
        }

        [System.Web.Http.HttpGet]
        public bool CanPlay(string licenseApiKey)
        {
            return UOW.LicenceRepository.CanLicensePlay(licenseApiKey);
        }

        [System.Web.Http.HttpGet]
        public List<int> GetAllActiveSongsIds()
        {
            var songsIds = UOW.PlayerRepository.GetAllActiveSongsIds();
            return songsIds;
        }

        [System.Web.Http.HttpPost]
        public List<SongWebModel> GetSongsByIds(int[] songsIds)
        {
            if (songsIds == null || songsIds.Length == 0)
            {
                return null;
            }
            var webModels = UOW.PlayerRepository.GetSongsByIds(songsIds).Select(AutoMapper.Mapper.Map<Song, SongWebModel>).ToList();
            return webModels;
        }

        public List<int> GetAllDeletedSongs()
        {
            var songsIds = UOW.SongRepository.GetAllDeletedSongs();
            return songsIds;
        }

        public long GetCurrentTicks()
        {
            return DateTime.Now.Ticks;
        }

    }
}