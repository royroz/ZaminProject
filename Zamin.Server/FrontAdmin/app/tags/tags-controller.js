(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name tags.controller:TagsCtrl
   *
   * @description
   *
   */
  angular
    .module('tags')
    .controller('TagsCtrl', TagsCtrl);

  function TagsCtrl($scope, $rootScope, $mdDialog, Tags) {
    $scope.tags = [];
    $scope.newTag = undefined;
    $scope.itemToDelete = {};
    $scope.defaultSize = {};

    //---------------Get functions---------------------
    $scope.getTags = function() {
      showLoader();
      Tags.getAll().then(function(response) {
        $scope.tags = response.data;
        // $scope.defaultSize = _.find($scope.pizzaSizes, function(e){return e.IsDefault == true})
        hideLoader();
      });
    }


    //---------------Post functions--------------------
    $scope.create = function(ev) {
      showLoader();
      Tags.update($scope.newTag).then(function(response) {
        if (response.data.Success) {
          $scope.newTag.Id = response.data.Id;
          $scope.tags.push(angular.copy($scope.newTag));
          $scope.newTag = undefined;

        }
        else{
          $scope.errorMassage = "לא ניתן ליצור 2 קטגוריות בעלות אותו שם!";
          $mdDialog.show({
            targetEvent: ev,
            templateUrl: 'errorDialog.html',
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true
          });
        }
        hideLoader();
      });
    }

    $scope.update = function(tag,ev) {
      showLoader();
      Tags.update(tag).then(function(response) {
        if (response.data) {
          tag.edit = false;
        }
        else{
          $scope.errorMassage = "לא ניתן לעדכן, עליך לשנות את שם התגית";
          $mdDialog.show({
            targetEvent: ev,
            templateUrl: 'errorDialog.html',
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose: true
          });
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
      Tags.delete($scope.itemToDelete.Id).then(function(response) {
        if (response.data) {
          $scope.tags.splice($scope.itemToDelete.index, 1);
          $scope.itemToDelete = {};
          $scope.hideDialog();
        }
        hideLoader();
      });
    }

    //---------------------- Other -----------------
    $scope.setEditMode = function(tag) {
      tag.edit = true;
    }
    $scope.addItem = function(){
      $scope.newTag = {}
    }


    //-----------------------Start------------------
    $scope.getTags();
  }
}());
