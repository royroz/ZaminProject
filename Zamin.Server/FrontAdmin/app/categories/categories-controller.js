(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name categories.controller:CategoriesCtrl
   *
   * @description
   *
   */
  angular
    .module('categories')
    .controller('CategoriesCtrl', CategoriesCtrl);

  function CategoriesCtrl($scope, $rootScope, $mdDialog, Categories) {
    $scope.categories = [];
    $scope.newCategory = undefined;
    $scope.itemToDelete = {};
    $scope.defaultSize = {};

    //---------------Get functions---------------------
    $scope.getCategories = function() {
      showLoader();
      Categories.getAll().then(function(response) {
        $scope.categories = response.data;
        // $scope.defaultSize = _.find($scope.pizzaSizes, function(e){return e.IsDefault == true})
        hideLoader();
      });
    }


    //---------------Post functions--------------------
    $scope.create = function() {
      showLoader();
      Categories.create($scope.newCategory).then(function(response) {
        if (response.data.Success) {
          $scope.newCategory.Id = response.data.CategoryId;
          $scope.categories.push(angular.copy($scope.newCategory));
          $scope.newCategory = undefined;
        }
        hideLoader();
      });
    }

    $scope.update = function(category) {
      showLoader();
      Categories.update(category).then(function(response) {
        if (response.data) {
          category.edit = false;
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
      Categories.delete($scope.itemToDelete.Id).then(function(response) {
        if (response.data) {
          $scope.categories.splice($scope.itemToDelete.index, 1);
          $scope.itemToDelete = {};
          $scope.hideDialog();
        }
        hideLoader();
      });
    }

    //---------------------- Other -----------------
    $scope.setEditMode = function(category) {
      category.edit = true;
    }
    $scope.addItem = function(){
      $scope.newCategory = {}
    }


    //-----------------------Start------------------
    // $scope.getCategories();
  }
}());
