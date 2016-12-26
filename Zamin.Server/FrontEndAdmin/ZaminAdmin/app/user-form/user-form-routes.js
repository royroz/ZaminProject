(function () {
  'use strict';

  angular
    .module('userForm')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('userForm', {
        url: '/user-form',
        views:{
          'mainView':{
            templateUrl: 'user-form/user-form.tpl.html',
            controller: 'UserFormCtrl',
            controllerAs: 'userForm'
          },
          'layoutView':{
              templateUrl: 'partials/layoutView.html'
          }
        }
      })
      .state('userFormUpdate', {
        url: '/user-form/:userId',
        views: {
          'mainView': {
            templateUrl: 'user-form/user-form.tpl.html',
            controller: 'UserFormCtrl',
            controllerAs: 'userForm'
          },
          'layoutView': {
            templateUrl: 'partials/layoutView.html'
          }
        }
      });
  }
}());
