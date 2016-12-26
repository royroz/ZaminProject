(function () {
  'use strict';

  angular
    .module('slice')
    .config(config);

  function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
  }
}());
