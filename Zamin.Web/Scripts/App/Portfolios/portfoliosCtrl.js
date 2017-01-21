angular.module("music4BizApp")
    .controller("portfoliosCtrl", function ($scope, $sce, portfoliosService) {

        $scope.items = [];
        $scope.newItem = {};
        //sortable
        $scope.sortableItems = [];

        $scope.sortableItems = {
            stop: function (e, ui) {
                for (var i = 0; i < $scope.items.length; i++) {
                    $scope.items[i].Order = i + 1;
                }
                portfoliosService.saveItemOrder($scope.items).success(function () {
                    getCookieMessages();
                });
            }
        };

    // ----- init start -----
        $scope.getItems = function () {
            showLoader();
            portfoliosService.getPortfolios().then(function (response) {
                $scope.items = response;
            }).finally(function () {
                hideLoader();
            });
        };
        $scope.getItems();
        //--- init end -----
        
        $scope.saveItem = function (item) {
            showLoader();
            item.edit = false;
            portfoliosService.saveItem(item).success(function() {
                hideLoader();
                getCookieMessages();
                $scope.getItems();
            });
        }

        $scope.deleteItem = function (item) {
            showLoader();
            portfoliosService.deleteItem(item.id).success(function () {
                hideLoader();
                getCookieMessages();
                $scope.getItems();
            });
        }

    });