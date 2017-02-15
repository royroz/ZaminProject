(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name marketing.factory:Marketing
   *
   * @description
   *
   */
  angular
    .module('marketing')
    .factory('Marketing', Marketing);

  function Marketing() {
    var MarketingBase = {};
    MarketingBase.someValue = 'Marketing';
    MarketingBase.someMethod = function () {
      return 'Marketing';
    };
    return MarketingBase;
  }
}());
