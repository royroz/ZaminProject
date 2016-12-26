(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name branch.controller:BranchCtrl
   *
   * @description
   *
   */
  angular
    .module('branch')
    .controller('BranchCtrl', BranchCtrl);

  function BranchCtrl($scope, $stateParams, Branch) {
    $scope.branches = [];

    $scope.getAll = function(){
      Branch.getAll($stateParams.franchiseId).then(function(response){
          $scope.branches = response.data;
      });
    };

    $scope.getAll();
  }
}());
