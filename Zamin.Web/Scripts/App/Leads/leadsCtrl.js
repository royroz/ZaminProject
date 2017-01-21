angular.module("music4BizApp")
    .controller("leadsCtrl", function ($scope, $filter, leadsService) {

        $scope.leads = [];

        $scope.getLeads = function () {
            showLoader();
            leadsService.getLeads().then(function (response) {
                $scope.leads = response;
            }).finally(function () {
                hideLoader();
            });
        };
        $scope.getLeads();

        $scope.searchText = "";
        $scope.clearFilter = function () {
            $scope.searchText = "";
        };

        $scope.changeStarStatus = function (index) {
            $scope.lead = $scope.leads[index];
            leadsService.changeStarStatus($scope.lead).then(function (response) {
                if (response === "true") {
                    $scope.lead.IsStared = !$scope.lead.IsStared;
                }
            });
        }

        $scope.enlarge = function (index) {
            $scope.lead = $scope.leads[index];
            $("#leadModal").modal("show");
            leadsService.readLead($scope.lead).then(function (response) {
                if (response === "true") {
                    $scope.lead.IsRead = true;
                }
            });
        };
    });