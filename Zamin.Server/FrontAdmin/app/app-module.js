(function() {
  'use strict';

  /* @ngdoc object
   * @name zamin
   * @description
   *
   */
  angular
    .module('zamin', [
      'ngAria',
      'ngMaterial',
      'ui.router',
      //'angular-flot',
      'google.places',
      'app.core',
      'app.charts',
      'app.routes',
      'app.sidebar',
      'app.navsearch',
      'app.preloader',
      'app.loadingbar',
      'app.translate',
      'app.settings',
      'app.maps',
      'app.utils',
      'app.material',
      'ngFileUpload',
      'home',
      'login',
      'forgotPassword',
      'resetPassword',
      'doughType',
      'mdPickers',
      'user',
      'userForm',
      'marketing',
      'categories',
      'course',
      'courseForm',
      'interestingVideos'
    ]).constant("consts", {
      serverUrl: 'http://zamin/'
    }).factory('errorInterceptor', ['$q', '$rootScope', '$location', 'consts', function($q, $rootScope, $location, consts) {
      return {
        responseError: function(response) {
          //     if (consts.serverUrl != "/")
          //     {
          if (response && response.status === 401) {
            localStorage.clear();
            hideLoader();
            $location.path('login')
          }
          //No internet
          // if (response && (response.status === -1 || response.status === 404)) {
          //   hideLoader();
          //   if ($location.url() != "/no-connection") {
          //     $location.path('no-connection')
          //   }
          // }
          //   }
          return $q.reject(response);
        }
      };
    }])
    .config([
      '$compileProvider', '$provide', '$httpProvider', '$locationProvider','$qProvider',
      function($compileProvider, $provide, $httpProvider, $locationProvider,$qProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|geo|tel):/);
        $httpProvider.interceptors.push('errorInterceptor');
        $qProvider.errorOnUnhandledRejections(false);
        $locationProvider.hashPrefix('');
      }
    ]);
}());

var showLoader = function(){
  $("#loader").show();
}

var hideLoader = function(){
  $("#loader").hide();
}

var imgError = function (image) { //Hide image if notFound
    image.style.display = 'none';
}
