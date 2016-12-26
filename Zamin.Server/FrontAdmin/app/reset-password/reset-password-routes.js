(function () {
  'use strict';

  angular
    .module('resetPassword')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('resetPassword', {
        url: '/reset-password',
        views:{
          'mainView': {
            templateUrl: 'reset-password/reset-password.tpl.html',
            controller: 'ResetPasswordCtrl',
            controllerAs: 'resetPassword'
          },
          'layoutView':{
            
          }
        }

      });
  }
}());
