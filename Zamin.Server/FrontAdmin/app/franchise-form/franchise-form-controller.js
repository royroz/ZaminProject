(function() {
  'use strict';

  /**
   * @ngdoc object
   * @name franchiseForm.controller:FranchiseFormCtrl
   *
   * @description
   *
   */
  angular
    .module('franchiseForm')
    .controller('FranchiseFormCtrl', FranchiseFormCtrl);

  function FranchiseFormCtrl($scope, $state, $stateParams, $location, $mdDialog, FranchiseForm) {
    $scope.franchiseOriginal = {};
    $scope.franchise = {};
    $scope.editMode = $state.current.name == 'franchiseFormUpdate'
    $scope.itemToDelete = {};
    $scope.GalleryUrlsToDelete = [];
    //Get functions
    $scope.getFranchise = function() {
      showLoader();
      FranchiseForm.getFranchise($stateParams.franchiseId).then(function(response) {
        $scope.franchise = response.data;
        $scope.franchiseOriginal = angular.copy(response.data);
        hideLoader();
      });
    }

    //Post functions
    $scope.save = function() {
      showLoader();
      if ($scope.editMode) {
        FranchiseForm.update($scope.franchise).then(function(response) {
          if (response.data) {
            $scope.getFranchises();
            $location.path("franchise");
            hideLoader();
          }
        });
      } else {
        FranchiseForm.create($scope.franchise).then(function(response) {
          if (response.data) {
            $location.path("franchise");
            $scope.getFranchises();
            hideLoader();
          }
        });
      }
    }

    $scope.fileAdded = function(newFiles) {
      if ($scope.franchise.GalleryFiles == undefined) $scope.franchise.GalleryFiles = [];
      newFiles.forEach(function(file){
          $scope.franchise.GalleryFiles.push(file);
      });
  //    $scope.franchise.GalleryFiles.push(newFiles);
      newFiles = [];
    }


    $scope.removeImageFromGallery = function(url, index) {
      if($scope.franchise.GalleryUrlsToDelete == undefined ) $scope.franchise.GalleryUrlsToDelete = [];
      $scope.franchise.GalleryUrlsToDelete.push(url);
      $scope.franchise.GalleryUrls.splice(index, 1)
    }

    $scope.deleteDialog = function(itemToDelete, index, ev) {
      if (itemToDelete.Id == undefined) {
        $scope.franchise.Branches.splice(index, 1);
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
      FranchiseForm.deleteBranch($scope.itemToDelete.Id).then(function(response) {
        if (response.data) {
          $scope.franchise.Branches.splice($scope.itemToDelete.index, 1);
          $scope.itemToDelete = {};
          $scope.hideDialog();

          var fr = _.find($scope.franchises, function(e) {
            return e.Id == $scope.franchise.Id
          })
          fr.BranchesCount = $scope.franchise.Branches.length;
        }
        hideLoader();
      });
    }

    //Other functions
    $scope.addItem = function() {
      if ($scope.franchise.Branches == undefined) $scope.franchise.Branches = [];
      $scope.franchise.Branches.push({
        FranchiseId: $scope.franchise.Id
      });
    }

    //Start
    if ($scope.editMode) $scope.getFranchise();
  }
}());
