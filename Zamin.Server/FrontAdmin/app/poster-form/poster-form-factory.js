(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name posterForm.factory:PosterForm
   *
   * @description
   *
   */
  angular
    .module('posterForm')
    .factory('PosterForm', PosterForm);

  function PosterForm($http, consts) {
    var PosterFormBase = {};


        PosterFormBase.getPoster = function(posterId) {
          return $http({
            method: "GET",
            url: consts.serverUrl + "Poster/GetPoster",
            params: {
              posterId: posterId
            }
          });
        };

        PosterFormBase.save = function(poster) {
          var fd = new FormData();
          fd.append("Id", poster.Id);
          fd.append("Name", poster.Name);
          if (poster.Description != undefined) fd.append("Description", poster.Description);
          if (poster.ImageFile != undefined) fd.append("ImageFile", poster.ImageFile);

          if (poster.IsAuthorizedContent != undefined) fd.append("IsAuthorizedContent", poster.IsAuthorizedContent);

          poster.Tags.forEach(function(tag, index) {
            fd.append("Tags[" + index + "].Id", tag.Id);
            fd.append("Tags[" + index + "].TagName", tag.TagName);
          });

          return $http({
            method: "POST",
            url: consts.serverUrl + "Poster/SavePoster",
            data: fd,
            headers: {
              'Content-Type': undefined
            },
            transformRequest: angular.identity
          });
        };



        PosterFormBase.getTags = function() {
          return $http({
            method: "GET",
            url: consts.serverUrl + "Tag/GetTags"
          });
        }
        return PosterFormBase;
      }
    }());
