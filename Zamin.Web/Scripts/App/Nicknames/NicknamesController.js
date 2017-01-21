angular.module('music4BizApp')
    .controller('nicknamesCtrl', function ($scope, $filter, nicknamesService) {

        // ---------------------------- scope variables ----------------------
        $scope.nicknames = [];
        $scope.newNickname = "";
        $scope.filter = {};
        $scope.filter.keyword = "";
        $scope.orderDescending = true;

        //-----------------------------filter --------------------------------

        $scope.filterChange = function () {
            $scope.filteredItems = $filter('filter')($scope.nicknames, $scope.filterFunction);
        };

        $scope.filterFunction = function (element) {
            if (element.Name.toLowerCase().indexOf($scope.filter.keyword.toLowerCase()) === -1) {
                return false;
            }
            return true;
        };
        $scope.orderList = function () {
            var orderedNicknames = [];
            if ($scope.orderDescending === true) {
                orderedNicknames = $filter('orderBy')($scope.nicknames, 'Name', true);
                $scope.orderDescending = false;
            }
            else if ($scope.orderDescending === false) {
                orderedNicknames = $filter('orderBy')($scope.nicknames, 'Name');
                $scope.orderDescending = true;
            }
            $scope.nicknames = orderedNicknames;
        };

        // ---------------------------- functions ----------------------------

        $scope.getAllNickNames = function () {
            nicknamesService.getAllNickNames().then(function (response) {
                $scope.nicknames = response;
            });
        }

        $scope.editNickname = function (nicknameModel) {
            nicknamesService.editNickname(nicknameModel);
        }

        $scope.addNickname = function () {
            nicknamesService.addNickname($scope.newNickname);
        };

        $scope.removeNickname = function (nicknameModel) {
            nicknamesService.removeNickname(nicknameModel);
        };



        $scope.$on('refreshNicknames', function () {
            $scope.newNickname = "";
            $scope.getAllNickNames();
        });



        // ---------------------------- flow start ---------------------------
        $scope.getAllNickNames();
    });