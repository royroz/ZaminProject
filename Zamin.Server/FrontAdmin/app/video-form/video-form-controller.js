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

  function VideoFormCtrl($scope, $rootScope, $location, $mdDialog, $state, $stateParams,InterestingVideos,Tags) {
    $scope.tags = [];

      $scope.imageVersion = 1;
      $scope.video = undefined;
      $scope.editMode = $state.current.name == 'videoFormEdit';

      //---------------Get functions---------------------
      $scope.getVideo = function() {
        showLoader();
        InterestingVideos.getVideo($stateParams.videoId).then(function(response) {
          $scope.video = response.data;
          // $scope.getTags();
          hideLoader();
        });
      }

      $scope.getTags = function() {
        showLoader();
        Tags.getAll().then(function(response) {
          $scope.tags = response.data;
          $scope.setVideoTags($scope.video);
          hideLoader();
        });
      }

      //---------------Post functions--------------------

      $scope.save = function() {
        if ($scope.editMode) {
          $scope.update($scope.video);
        } else {
          $scope.create();
        }
      }

      // $scope.create = function() {
      //   showLoader();
      //   if ($scope.video.tags != undefined) {
      //     if ($scope.video.tags == undefined) $scope.video.tags.PizzaToppings = [];
      //     $scope.pizza.toppings.forEach(function(top) {
      //       $scope.pizza.PizzaToppings.push({
      //         ToppingId: top.Id,
      //         Topping: top
      //       })
      //     })
      //   }
      //   Pizza.create($scope.pizza).then(function(response) {
      //     if (response.data.Success) {
      //       $location.path("pizza");
      //     }
      //     hideLoader();
      //   });
      // }
      // $scope.update = function(pizza) {
      //   showLoader();
      //   if (pizza.toppings != undefined) {
      //     pizza.PizzaToppings = [];
      //     pizza.toppings.forEach(function(top) {
      //       pizza.PizzaToppings.push({
      //         ToppingId: top.Id,
      //         Topping: top
      //       })
      //     })
      //   }
      //   Pizza.update(pizza).then(function(response) {
      //     if (response.data) {
      //       $location.path("pizza");
      //     }
      //     hideLoader();
      //   });
      // }
      //
      // //---------------------- Other -----------------
      //
      // $scope.addItem = function() {
      //   $scope.pizza = {
      //     FranchiseId: $rootScope.user.FranchiseId,
      //     PizzaToppings: [],
      //     PizzaPrices: []
      //   }
      //   $scope.pizzaSizes.forEach(function(item) {
      //     $scope.pizza.PizzaPrices.push({
      //       PizzaSizeId: item.Id,
      //       PizzaSizeName: item.Name
      //     })
      //   });
      //   $scope.getToppings();
      //   $scope.getPizzaSizes();
      // }
      //
      // $scope.setPizzasToppings = function(pizza) {
      //   //for index table
      //   pizza.toppings = []
      //   pizza.PizzaToppings.forEach(function(pt) {
      //     var top = _.find($scope.toppings, function(e) {
      //       return e.Id == pt.ToppingId
      //     });
      //     if (top != undefined) pizza.toppings.push(top);
      //     pt.Topping = top;
      //   });
      //
      // }
      //
      //
      // //Start
      // if ($scope.editMode) $scope.getPizza();
      // else {
      //   $scope.addItem();
      // }
    }
  }());
