(function () {
  'use strict';

  angular
    .module('login')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        views:{
          'mainView':{
            templateUrl: 'login/login.tpl.html',
            controller: 'LoginCtrl',
            controllerAs: 'login'
          },
          'layoutView':{
            
          }
        }

      });
  }
}());
