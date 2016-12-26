(function () {
  'use strict';

  angular
    .module('forgotPassword')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('forgotPassword', {
        url: '/forgot-password',

        views:{
          'mainView':{
            templateUrl: 'forgot-password/forgot-password.tpl.html',
            controller: 'ForgotPasswordCtrl',
            controllerAs: 'forgotPassword'
          },
          'layoutView':{
          }
        }
      });
  }
}());
