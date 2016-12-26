(function () {
  'use strict';

  angular
    .module('branch')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('branch', {
        url: '/branch/:franchiseId',
        views:{
          'mainView':{
            templateUrl: 'branch/branch.tpl.html',
            controller: 'BranchCtrl',
            controllerAs: 'branch'
          },
          'layoutView':{
              templateUrl: 'partials/layoutView.html'
          }
        }
      });
  }
}());
