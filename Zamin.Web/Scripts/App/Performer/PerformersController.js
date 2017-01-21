angular.module('music4BizApp')
    .controller('performersCtrl', function ($scope, $filter, performersService) {
        // ---------------------------- scope variables ----------------------
        $scope.performers = [];
        $scope.newPerformerName = "";
        $scope.filter = {};
        $scope.filter.keyword = "";
        $scope.orderDescending = true;

        //-----------------------------filter --------------------------------

        $scope.filterChange = function () {
            $scope.filteredItems = $filter('filter')($scope.performers, $scope.filterFunction);
        };

        $scope.filterFunction = function (element) {
            if (element.Name.toLowerCase().indexOf($scope.filter.keyword.toLowerCase()) === -1) {
                return false;
            }
            return true;
        };
        $scope.orderList = function () {

            var orderedPerformers = [];
            if ($scope.orderDescending === true) {
                orderedPerformers = $filter('orderBy')($scope.performers, 'Name', true);
                $scope.orderDescending = false;
            }
            else if ($scope.orderDescending === false) {
                orderedPerformers = $filter('orderBy')($scope.performers, 'Name');
                $scope.orderDescending = true;
            }
            $scope.performers = orderedPerformers;
        };


        // ---------------------------- functions ----------------------------

        $scope.getAllPerformers = function () {
            performersService.getAllPerformers().then(function (response) {
                $scope.performers = response;
            });
        }

        $scope.editPerformer = function (performer) {
            performersService.editPerformer(performer);
        }

        $scope.addPerformer = function () {
            performersService.addPerformer($scope.newPerformerName);
        };

        $scope.removePerformer = function (performer) {
            performersService.removePerformer(performer);
        };



        $scope.$on('refreshPerformers', function () {
            $scope.newPerformerName = "";
            $scope.getAllPerformers();
        });



        // ---------------------------- flow start ---------------------------
        $scope.getAllPerformers();
    });