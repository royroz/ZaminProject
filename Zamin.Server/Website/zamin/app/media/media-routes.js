(function () {
  'use strict';

  angular
    .module('media')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('media', {
        url: '/media',
        templateUrl: 'media/media.tpl.html',
        controller: 'MediaCtrl',
        controllerAs: 'media'
      });
  }
}());
