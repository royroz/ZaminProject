(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name interestingVideos.factory:InterestingVideos
   *
   * @description
   *
   */
  angular
    .module('interestingVideos')
    .factory('InterestingVideos', InterestingVideos);

  function InterestingVideos() {
    var InterestingVideosBase = {};

    InterestingVideosBase.getAll = function() {
        return $http({
          method: "GET",
          url: consts.serverUrl + "InterestingVideos/GetVideos",

        });
      };

      InterestingVideosBase.getVideo = function(videoId) {
        return $http({
          method: "GET",
          url: consts.serverUrl + "InterestingVideos/GetVideo",
          params: {
            id: videoId
          }
        });
      };


      InterestingVideosBase.create = function(video) {

        var fd = new FormData();
        fd.append("Name", video.Name);
        fd.append("Description", video.Description);
        fd.append("ImageFile", video.ImageFile);
        fd.append("IsAuthorizedContent", video.IsAuthorizedContent);
        video.tags.forEach(function(top, index) {
          fd.append("Tags[" + index + "].TagId", tag.TagId);
        });
        return $http({
          method: "POST",
          url: consts.serverUrl + "InterestingVideos/CreateVideo",
          data: fd,
          headers: {
            'Content-Type': undefined
          },
          transformRequest: angular.identity
        });
      };


      InterestingVideosBase.update = function(video) {
        var fd = new FormData();
        fd.append("Id", video.Id);
        fd.append("Name", video.Name);
        fd.append("Description", video.Description);
        fd.append("ImageFile", video.ImageFile);
        fd.append("IsAuthorizedContent", video.IsAuthorizedContent);

        video.tags.forEach(function(top, index) {
          if (top.Id != undefined) fd.append("Tags[" + index + "].Id", tag.TagId);
          fd.append("Tags[" + index + "].TagId",tag.TagId);
        });

        return $http({
          method: "POST",
          url: consts.serverUrl + "InterestingVideos/UpdateVideo",
          data: fd,
          headers: {
            'Content-Type': undefined
          },
          transformRequest: angular.identity
        });
      };


      InterestingVideosBase.delete = function(videoId) {
        return $http({
          method: "POST",
          url: consts.serverUrl + "video/DeleteVideo",
          data: {id:videoId}
        });
      };

      return InterestingVideosBase;
    }
  }());
