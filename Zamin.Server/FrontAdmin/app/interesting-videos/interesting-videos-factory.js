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
    InterestingVideosBase.someValue = 'InterestingVideos';
    InterestingVideosBase.someMethod = function () {
      return 'InterestingVideos';
    };
    return InterestingVideosBase;
  }
}());
