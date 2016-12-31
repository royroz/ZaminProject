(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name user.controller:UserCtrl
   *
   * @description
   *
   */
  angular
    .module('user')
    .controller('UserCtrl', UserCtrl);

  function UserCtrl($scope, $rootScope,$mdDialog, User) {
    $scope.users = [];

    $scope.getAllUsers = function(){
      // showLoader();
      User.getAllUsers($rootScope.user.FranchiseId).then(function(response){
        $scope.users = response.data;
        hideLoader();
      });
    };

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
      User.delete($scope.itemToDelete.UserId).then(function(response) {
        if (response.data) {
          $scope.users.splice($scope.itemToDelete.index, 1);
          $scope.itemToDelete = {};
          $scope.hideDialog();
        }
        hideLoader();
      });
    }

    $scope.lock = function(isLock, id, user) {
      User.lock(id, isLock).then(function(response) {
        if(response.data){
          //user.IsUserLocked = isLock;
          user.IsLockedOut = isLock;
        }
      });
    }
    $scope.getAllUsers();
  }
}());
