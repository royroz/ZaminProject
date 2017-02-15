(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name interestingVideos.controller:InterestingVideosCtrl
   *
   * @description
   *
   */
  angular
    .module('interestingVideos')
    .controller('InterestingVideosCtrl', InterestingVideosCtrl);

  function InterestingVideosCtrl() {
    var vm = this;
    vm.ctrlName = 'InterestingVideosCtrl';
  }
}());
