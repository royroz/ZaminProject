angular.module('music4BizApp')
    .controller('bpmCtrl', function($scope, $filter, bpmService) {
        // ---------------------------- scope variables ----------------------
        $scope.bpms = [];
        $scope.newBpm = {};
        $scope.filter = {};
        $scope.filter.keyword = "";
        $scope.orderDescending = true;

        //-----------------------------filter --------------------------------
        $scope.filterChange = function () {
            $scope.filteredItems = $filter('filter')($scope.bpms, $scope.filterFunction);
        };

        $scope.filterFunction = function (element) {
            if (element.Name.toLowerCase().indexOf($scope.filter.keyword.toLowerCase()) === -1) {
                return false;
            }
            return true;
        };
        $scope.orderList = function () {
            var orderedBpm = [];
            if ($scope.orderDescending === true) {
                orderedBpm = $filter('orderBy')($scope.bpms, 'Name', true);
                $scope.orderDescending = false;
            }
            else if ($scope.orderDescending === false) {
                orderedBpm = $filter('orderBy')($scope.bpms, 'Name');
                $scope.orderDescending = true;
            }
            $scope.bpms = orderedBpm;
        };

        // ---------------------------- functions ----------------------------
        $scope.getAllBpms = function () {
            bpmService.getAllBpms().then(function (response) {
                $scope.bpms = response;
            });
        }
        $scope.EditBpm = function (bpm) {
            bpmService.editBpm(bpm);
        }
        $scope.addBpm = function () {
            bpmService.addBpm($scope.newBpm);
        };

        $scope.removeBpm = function (bpm) {
            bpmService.removeBpm(bpm);
        };


        $scope.$on('refreshBpms', function () {
            $scope.newBpm = {};
            $scope.getAllBpms();
        });


        // ---------------------------- flow start ---------------------------
        $scope.getAllBpms();


});