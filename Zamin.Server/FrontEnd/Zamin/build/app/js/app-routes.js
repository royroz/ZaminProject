(function () {
  'use strict';

  angular
    .module('zamin')
    .config(config);

  function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
  }
}());

//# sourceMappingURL=app-routes.js.map
