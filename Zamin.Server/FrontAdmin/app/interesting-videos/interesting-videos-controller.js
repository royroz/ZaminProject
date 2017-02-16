(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name interestingVideos.controller:InterestingVideosCtrl
   *
   * @description
   *
   */
  angular
    .module('interestingVideos')
    .controller('InterestingVideosCtrl', InterestingVideosCtrl);

  function InterestingVideosCtrl($scope, $rootScope, $mdDialog,InterestingVideos) {
  $scope.InterestingVideos = [];
  $scope.itemToDelete = {};
    $scope.newVideo = undefined;

    //---------------Get functions---------------------
      $scope.getVideos = function() {
        showLoader();
        InterestingVideos.getAll().then(function(response) {
          $scope.InterestingVideos = response.data;
          hideLoader();
        });
      }

      //---------------Post functions--------------------

      $scope.create = function() {
      showLoader();
      if ($scope.newVideo.tags != undefined) {
        if ($scope.newVideo.videoTags == undefined) $scope.newVideo.videoTags = [];
        $scope.newVideo.tags.forEach(function(tag) {
          $scope.newVideo.videoTags.push({
            TagId: tag.Id,
            Tag: tag
          })
        })
      }
            Pizza.create($scope.newPizza).then(function(response) {
              if (response.data.Success) {
                $scope.setPizzasToppings(response.data.Pizza);
                $scope.pizzas.push(response.data.Pizza);
                $scope.newPizza = undefined;
              }
              hideLoader();
            });
          }


          $scope.update = function(pizza) {
            showLoader();
            if (pizza.toppings != undefined) {
              pizza.PizzaToppings = [];
              pizza.toppings.forEach(function(top) {
                pizza.PizzaToppings.push({
                  ToppingId: top.Id,
                  Topping: top
                })
              })
            }
            Pizza.update(pizza).then(function(response) {
              pizza.PizzaSize = _.find($scope.pizzaSizes, function(e){return e.Id == pizza.SizeId})
              if (response.data) {
                pizza.edit = false;
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
            Pizza.delete($scope.itemToDelete.Id).then(function(response) {
              if (response.data) {
                $scope.pizzas.splice($scope.itemToDelete.index, 1);
                $scope.itemToDelete = {};
                $scope.hideDialog();
              }
              hideLoader();
            });
          }

          //---------------------- Other -----------------
          $scope.setEditMode = function(video) {
            video.edit = true;
          }

          // $scope.addItem = function() {
          //   $scope.newPizza = {
          //     FranchiseId: $rootScope.user.FranchiseId,
          //     PizzaToppings: [],
          //     PizzaPrices : []
          //   }
          //   $scope.pizzaSizes.forEach(function(item) {
          //     $scope.newPizza.PizzaPrices.push({
          //       PizzaSizeId: item.Id,
          //       PizzaSizeName: item.Name
          //     })
          //   });
          // }


          //-----------------------Start------------------
          // $scope.getVideos();
        }
      }());
