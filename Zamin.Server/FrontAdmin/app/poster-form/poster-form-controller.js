(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name posterForm.controller:PosterFormCtrl
   *
   * @description
   *
   */
  angular
    .module('posterForm')
    .controller('PosterFormCtrl', PosterFormCtrl);

  function PosterFormCtrl($scope, $location, $stateParams, $state,PosterForm) {

    $scope.poster = {
      Tags: []
    };


    $scope.tags = [];
    $scope.editMode = $state.current.name == 'posterFormUpdate';

    $scope.save = function(valid) {
      if (!valid) return;
      showLoader();
      PosterForm.save($scope.poster).then(function(response) {
        hideLoader();
        if (response.data) {
          $location.path("posters");
        }

      })
    }
    $scope.getPoster = function() {
      showLoader();
      PosterForm.getPoster($stateParams.posterId).then(function(response) {
        $scope.poster = response.data;
        hideLoader();
        console.log($scope.poster);
      });
    }


    $scope.getTags = function() {
      showLoader();
      PosterForm.getTags().then(function(response) {
        $scope.tags = response.data;
        hideLoader();
      })
    }

    //Tags autocomplete
    $scope.searchText = "";
    $scope.selectedItem = undefined;

    $scope.transformChip = function(chip) {
      // If it is an object, it's already a known chip
      if (angular.isObject(chip)) {
        return chip;
      }

      // Otherwise, create a new one
      //    return { name: chip, type: 'new' }
    }

    $scope.querySearch = function(query) {
      var results = query ? $scope.tags.filter(createFilterFor(query)) : [];
      return results;
    }

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(tag) {
        return (tag.TagName.indexOf(lowercaseQuery) === 0) ||
          (tag.TagName.indexOf(lowercaseQuery) === 0);
      };
    }



    //Start
    if ($scope.editMode) $scope.getPoster();
      $scope.getTags();

  }
}());
