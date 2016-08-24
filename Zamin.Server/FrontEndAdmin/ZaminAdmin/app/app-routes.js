(function () {
  'use strict';

  angular
    .module('zaminAdmin')
    .config(config);

  function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
  }
}());
