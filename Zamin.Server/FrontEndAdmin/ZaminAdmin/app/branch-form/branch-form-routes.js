(function () {
  'use strict';

  angular
    .module('branchForm')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('branchForm', {
        url: '/branch-form',
        views:{
          'mainView':{
            templateUrl: 'branch-form/branch-form.tpl.html',
            controller: 'BranchFormCtrl',
            controllerAs: 'branchForm'
          },
          'layoutView':{
              templateUrl: 'partials/layoutView.html'
          }
        }
      })
      .state('branchFormUpdate', {
        url: '/branch-form/:branchId',
        views:{
          'mainView':{
            templateUrl: 'branch-form/branch-form.tpl.html',
            controller: 'BranchFormCtrl',
            controllerAs: 'branchForm'
          },
          'layoutView':{
              templateUrl: 'partials/layoutView.html'
          }
        }
      });
  }
}());
