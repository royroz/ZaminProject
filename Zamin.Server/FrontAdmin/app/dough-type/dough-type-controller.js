(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name doughType.controller:DoughTypeCtrl
   *
   * @description
   *
   */
  angular
    .module('doughType')
    .controller('DoughTypeCtrl', DoughTypeCtrl);

  function DoughTypeCtrl($scope, $rootScope, $mdDialog, DoughType) {
    $scope.doughTypes = [];
    $scope.newDoughType = undefined;
    $scope.itemToDelete = {};

    //---------------Get functions---------------------
    $scope.getDoughTypes = function() {
      showLoader();
      DoughType.getAll($rootScope.user.FranchiseId).then(function(response) {
        $scope.doughTypes = response.data;
        hideLoader();
      });
    }


    //---------------Post functions--------------------
    $scope.create = function() {
      showLoader();
      DoughType.create($scope.newDoughType).then(function(response) {
        if (response.data.Success) {
          $scope.newDoughType.Id = response.data.DoughTypeId;
          $scope.doughTypes.push(angular.copy($scope.newDoughType));
          $scope.newDoughType = undefined;
        }
        hideLoader();
      });
    }

    $scope.update = function(doughType) {
      showLoader();
      DoughType.update(doughType).then(function(response) {
        if (response.data) {
          doughType.edit = false;
        }
        hideLoader();
      });
    }

    $scope.deleteDialog = function(itemToDelete, index, ev) {
      $scope.itemToDelete = itemToDelete;
      $scope.itemToDelete.index = index;
      $mdDialog.show({
        targetEvent: ev,
        templateUrl: 'deleteDialog.html',
        scope: $scope,
        preserveScope: true,
        clickOutsideToClose: true
      });
    }

    $scope.delete = function() {
      showLoader();
      DoughType.delete($scope.itemToDelete.Id).then(function(response) {
        if (response.data) {
          $scope.doughTypes.splice($scope.itemToDelete.index, 1);
          $scope.itemToDelete = {};
          $scope.hideDialog();
        }
        hideLoader();
      });
    }

    //---------------------- Other -----------------
    $scope.setEditMode = function(type) {
      type.edit = true;
    }
    $scope.addItem = function(){
      $scope.newDoughType = {
        FranchiseId: $rootScope.user.FranchiseId,
        Name: ""
      }
    }


    //-----------------------Start------------------
    $scope.getDoughTypes();
  }
}());
