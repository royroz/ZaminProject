(function() {
  'use strict';

  angular
    .module('tags')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('tags', {
        url: '/tags',
        views: {
          'mainView': {
            templateUrl: 'tags/tags.tpl.html',
            controller: 'TagsCtrl',
            controllerAs: 'tags'
          },
          'layoutView': {
            templateUrl: 'partials/layoutView.html'
          }
        }
      });
  }
}());
