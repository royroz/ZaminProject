(function() {
  'use strict';

  /**
   * @ngdoc object
   * @name itemForm.controller:ItemFormCtrl
   *
   * @description
   *
   */
  angular
    .module('itemForm')
    .controller('ItemFormCtrl', ItemFormCtrl);

  function ItemFormCtrl($scope, $state, $stateParams, $location, $mdDialog, ItemForm) {
    $scope.categoryId = $stateParams.categoryId;
    $scope.categoryName = $stateParams.categoryName;
    $scope.itemOriginal = {};
    $scope.item = {
      CategoryId: $scope.categoryId
    };
    $scope.editMode = $state.current.name == 'itemFormUpdate'
    $scope.itemToDelete = {};


    //Get functions
    $scope.getItem = function() {
      showLoader();
      ItemForm.getItem($stateParams.itemId).then(function(response) {
        $scope.item = response.data;
        $scope.itemOriginal = angular.copy(response.data);
        hideLoader();
      });
    }

    //Post functions
    $scope.save = function() {
      showLoader();
      if ($scope.editMode) {
        ItemForm.update($scope.item).then(function(response) {
          hideLoader();
          if(response.data){
          $location.path("menu-item/" + $scope.categoryId  + "/" + $scope.categoryName);
          }
        });
      } else {
        ItemForm.create($scope.item).then(function(response) {
          hideLoader();
          if(response.data){
          $location.path("menu-item/" + $scope.categoryId  + "/" + $scope.categoryName);
          }
        });
      }
    }

    //delete garnish
    $scope.deleteDialog = function(itemToDelete, index, ev) {
      if (itemToDelete.Id == undefined) {
        $scope.item.Garnishes.splice(index, 1);
        return;
      }

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
      ItemForm.deleteGarnish($scope.itemToDelete.Id).then(function(response) {
        if (response.data) {
          $scope.item.Garnishes.splice($scope.itemToDelete.index, 1);
          $scope.itemToDelete = {};
          $scope.hideDialog();
        }
        hideLoader();
      });
    }


    //Other functions
    $scope.setEditMode = function(gar) {
      gar.edit = true;
    }

    $scope.addItem = function() {
      if ($scope.item.Garnishes == undefined) $scope.item.Garnishes = [];
      $scope.item.Garnishes.push({
        ItemId: $scope.item.Id,
        edit: true
      });
    }

    //Start
    if ($scope.editMode) $scope.getItem();

  }
}());
