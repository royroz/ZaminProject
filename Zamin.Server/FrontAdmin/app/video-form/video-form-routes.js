(function () {
  'use strict';

  angular
    .module('videoForm')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('videoForm', {
        url: '/video-form',
        views: {
                  'mainView': {
                    templateUrl: 'video-form/video-form.tpl.html',
                    controller: 'VideoFormCtrl',
                    controllerAs: 'videoForm'
                  },
                  'layoutView': {
                    templateUrl: 'partials/layoutView.html'
                  }
                }
              })
              .state('videoFormUpdate', {
                url: '/video-form/:videoId/:videotype',
                views: {
                  'mainView': {
                    templateUrl: 'video-form/video-form.tpl.html',
                    controller: 'VideoFormCtrl',
                    controllerAs: 'videoForm'
                  },
                  'layoutView': {
                    templateUrl: 'partials/layoutView.html'
                  }
                }
              });
          }
        }());
