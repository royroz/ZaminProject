(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name tags.factory:Tags
   *
   * @description
   *
   */
  angular
    .module('tags')
    .factory('Tags', Tags);

  function Tags($http,consts) {
    var TagsBase = {};


        TagsBase.getAll = function() {
          return $http({
            method: "GET",
            url: consts.serverUrl + "Tag/GetTags"
          });
        };

        // TagsBase.create = function(Tags) {
        //   return $http({
        //     method: "POST",
        //     url: consts.serverUrl + "Tags/SaveTags",
        //     data: {
        //       webModel: Tags
        //     }
        //   });
        // };

        TagsBase.update = function(Tag) {
          return $http({
            method: "POST",
            url: consts.serverUrl + "Tag/SaveTag",
            data: {
              Tag: Tag
            }
          });
        };

        TagsBase.delete = function(TagId) {
          return $http({
            method: "POST",
            url: consts.serverUrl + "Tag/DeleteTag",
            data: {
              TagId: TagId
            }
          });
        };

        return TagsBase;
      }
    }());
