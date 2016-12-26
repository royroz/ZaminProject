(function() {
  'use strict';

  /**
   * @ngdoc object
   * @name category.controller:CategoryCtrl
   *
   * @description
   *
   */
  angular
    .module('category')
    .controller('CategoryCtrl', CategoryCtrl);

  function CategoryCtrl($scope, $rootScope, $mdDialog, Category) {
    $scope.categories = [];
    $scope.newCategory = undefined;
    $scope.itemToDelete = {};
    $scope.imageVersion = 1;

    //---------------Get functions---------------------
    $scope.getCategories = function() {
      showLoader();
      Category.getAll($rootScope.user.FranchiseId).then(function(response) {
        $scope.categories = response.data;
        hideLoader();
      });
    }


    //---------------Post functions--------------------
    $scope.create = function() {
      showLoader();
      Category.create($scope.newCategory).then(function(response) {
        if (response.data.Success) {
          $scope.newCategory.Id = response.data.CategoryId;
          $scope.newCategory.ImageUrl = response.data.ImageUrl;
          $scope.categories.push(angular.copy($scope.newCategory));
          $scope.newCategory = undefined;
        }
        hideLoader();
      });
    }

    $scope.update = function(category) {
      showLoader();
      Category.update(category).then(function(response) {
        if (response.data) {
          category.edit = false;
          $scope.imageVersion++;
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
      Category.delete($scope.itemToDelete.Id).then(function(response) {
        if (response.data) {
          $scope.categories.splice($scope.itemToDelete.index, 1);
          $scope.itemToDelete = {};
          $scope.hideDialog();
        }
        hideLoader();
      });
    }

    //---------------------- Other -----------------
    $scope.setEditMode = function(cat) {
      cat.edit = true;
    }
    $scope.addItem = function() {
      $scope.newCategory = {
        FranchiseId: $rootScope.user.FranchiseId,
        Name: ""
      }
    }


    //-----------------------Start------------------
    $scope.getCategories();
  }
}());
