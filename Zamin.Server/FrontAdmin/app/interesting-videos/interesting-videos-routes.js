(function () {
  'use strict';

  angular
    .module('interestingVideos')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('interestingVideos', {
        url: '/interesting-videos',
        templateUrl: 'interesting-videos/interesting-videos.tpl.html',
        controller: 'InterestingVideosCtrl',
        controllerAs: 'interestingVideos'
      });
  }
}());
