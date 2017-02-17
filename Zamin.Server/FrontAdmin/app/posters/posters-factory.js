(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name posters.factory:Posters
   *
   * @description
   *
   */
  angular
    .module('posters')
    .factory('Posters', Posters);

  function Posters($http, consts) {
    var PostersBase = {};

    PostersBase.getAll = function () {
        return $http({
          method: "GET",
          url: consts.serverUrl + "Poster/GetPosters",
        });
      };


      PostersBase.delete = function(posterId) {
        return $http({
          method: "POST",
          url: consts.serverUrl + "Poster/DeletePoster",
          data: {
            id: posterId
          }
        });
      };
    return PostersBase;
  }
}());
