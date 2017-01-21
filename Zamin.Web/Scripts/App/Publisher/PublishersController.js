angular.module('music4BizApp')
    .controller('publishersCtrl', function ($scope, $filter, publishersService) {

        // ---------------------------- scope variables ----------------------
        $scope.publishers = [];
        $scope.addPublisher = "";
        $scope.filter = {};
        $scope.filter.keyword = "";
        $scope.orderDescending = true;
        //-----------------------------filter --------------------------------

        $scope.filterChange = function () {
            $scope.filteredItems = $filter('filter')($scope.publishers, $scope.filterFunction);
        };

        $scope.filterFunction = function (element) {
            if (element.Name.toLowerCase().indexOf($scope.filter.keyword.toLowerCase()) === -1) {
                return false;
            }
            return true;
        };
        $scope.orderList = function () {
            var orderedPublishers = [];
            if ($scope.orderDescending === true) {
                orderedPublishers = $filter('orderBy')($scope.publishers, 'Name', true);
                $scope.orderDescending = false;
            }
            else if ($scope.orderDescending === false) {
                orderedPublishers = $filter('orderBy')($scope.publishers, 'Name');
                $scope.orderDescending = true;
            }
            $scope.publishers = orderedPublishers;
            
        };

        // ---------------------------- functions ----------------------------

        $scope.getAllPublishers = function () {
            publishersService.getAllPublishers().then(function (response) {
                $scope.publishers = response;
            });
        };

        $scope.addPublisher = function () {
            publishersService.addPublisher($scope.newPublisherName);
        };

        $scope.editPublisher = function (publisher) {
            publishersService.editPublisher(publisher);
        }


        $scope.removePublisher = function (publisher) {
            publishersService.removePublisher(publisher);
        };


        $scope.$on('refreshPublishers', function () {
            $scope.newPublisherName = "";
            $scope.getAllPublishers();
        });


        // ---------------------------- flow start ---------------------------
        $scope.getAllPublishers();

    });