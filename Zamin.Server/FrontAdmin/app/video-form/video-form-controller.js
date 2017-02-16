(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name videoForm.controller:VideoFormCtrl
   *
   * @description
   *
   */
  angular
    .module('videoForm')
    .controller('VideoFormCtrl', VideoFormCtrl);

  function VideoFormCtrl() {
    var vm = this;
    vm.ctrlName = 'VideoFormCtrl';
  }
}());
