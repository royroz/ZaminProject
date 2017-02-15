(function() {
  'use strict';

  angular
    .module('marketing')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('marketing', {
        url: '/marketing',
        views: {
          'mainView': {
            templateUrl: 'marketing/marketing.tpl.html',
            controller: 'MarketingCtrl',
            controllerAs: 'marketing'
          },
          'layoutView': {
            templateUrl: 'partials/layoutView.html'
          }
        }
      });
  }
}());
