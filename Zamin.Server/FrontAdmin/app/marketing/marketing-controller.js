(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name marketing.controller:MarketingCtrl
   *
   * @description
   *
   */
  angular
    .module('marketing')
    .controller('MarketingCtrl', MarketingCtrl);

  function MarketingCtrl() {
    var vm = this;
    vm.ctrlName = 'MarketingCtrl';
  }
}());
