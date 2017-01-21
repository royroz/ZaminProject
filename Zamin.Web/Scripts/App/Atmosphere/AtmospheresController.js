angular.module('music4BizApp')
    .controller('atmospheresCtrl', function($scope, $filter, atmospheresService) {
        // ---------------------------- scope variables ----------------------
        $scope.atmospheres = [];
        $scope.newAtmosphereName = "";
        $scope.filter = {};
        $scope.filter.keyword = "";
        $scope.orderDescending = true;

        //-----------------------------filter --------------------------------

        $scope.filterChange = function () {
            $scope.filteredItems = $filter('filter')($scope.atmospheres, $scope.filterFunction);
        };

        $scope.filterFunction = function (element) {
            if (element.Name.toLowerCase().indexOf($scope.filter.keyword.toLowerCase()) === -1) {
                return false;
            }
            return true;
        };
        $scope.orderList = function () {
            var orderedAtmospheres = [];
            if ($scope.orderDescending === true) {
                orderedAtmospheres = $filter('orderBy')($scope.atmospheres, 'Name', true);
                $scope.orderDescending = false;
            }
            else if ($scope.orderDescending === false) {
                orderedAtmospheres = $filter('orderBy')($scope.atmospheres, 'Name');
                $scope.orderDescending = true;
            }
            $scope.atmospheres = orderedAtmospheres;
        };

        // ---------------------------- functions ----------------------------

        $scope.getAllAtmospheres = function () {
            showLoader();
            atmospheresService.getAllAtmospheres().then(function (response) {
                $scope.atmospheres = response;
                hideLoader();
            });
        }

        $scope.editAtmosphere = function (atmosphere) {
            atmospheresService.editAtmosphere(atmosphere);
        }

        $scope.addAtmosphere = function () {
            atmospheresService.addAtmosphere($scope.newAtmosphereName);
        };

        $scope.removeAtmosphere = function (atmosphere) {
            atmospheresService.removeAtmosphere(atmosphere);
        };



        $scope.$on('refreshAtmospheres', function () {
            $scope.newAtmosphereName = "";
            $scope.getAllAtmospheres();
        });



        // ---------------------------- flow start ---------------------------
        $scope.getAllAtmospheres();

});