(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name media.factory:Media
   *
   * @description
   *
   */
  angular
    .module('media')
    .factory('Media', Media);

  function Media() {
    var MediaBase = {};
    MediaBase.someValue = 'Media';
    MediaBase.someMethod = function () {
      return 'Media';
    };
    return MediaBase;
  }
}());
