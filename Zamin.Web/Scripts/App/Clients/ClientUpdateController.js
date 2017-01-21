angular.module("music4BizApp")
    .controller("clientUpdateCtrl", function ($scope, $filter, $sce, $location, clientsService, metaDataService) {

        $scope.specialServices = [];
        $scope.service = {};
        $scope.showEmailExsists = false;
        $scope.updateMode = false;

        $scope.client = {};
        $scope.clientOldLicensePassword = undefined;

        $scope.updateClient = function (fromPasswordWarning) {
            if ($scope.clientOldLicensePassword != undefined && !fromPasswordWarning && ($scope.clientOldLicensePassword != $scope.client.LicensePassword)) {
                $("#passwordWarning").modal('show');
                return;
            }
            $("#passwordWarning").modal('hide');
            showLoader();
            clientsService.updateClient($scope.client)
                .then(function (response) {
                    hideLoader();
                    getCookieMessages();
                    if (response.success == true) {
                        window.location.href = "/Clients";
                    }
                    else if (response.success === false && response.emailExists) {
                        $scope.showEmailExsists = true;
                    }
                });
        };



        // --------------------------------init strat ------------------------------
        $scope.getSpecialServices = function () {
            metaDataService.getSpecialServices()
                .then(function (response) {
                    $scope.specialServices = response;
                }).finally(function () {
                    $scope.getLicenseTypes();
                });
        };




        $scope.getClientDetails = function () {

            var path = $location.absUrl();
            var split = path.toLowerCase().split("update/");
            if (split.length === 1) {
                split = path.toLowerCase().split("details/");
            }

            if (split.length > 1) {
                var possibleId = split[1];
                if (!isNaN(possibleId)) {
                    var clientId = possibleId;
                    showLoader();
                    clientsService.getClient(clientId)
                        .then(function (response) {
                            $scope.client = response;
                            $scope.clientOldLicensePassword = $scope.client.LicensePassword;
                        })
                        .finally(function () {
                            hideLoader();
                        });
                }
                $scope.updateMode = true;
            }
        };

        $scope.getSpecialServices();
        $scope.getClientDetails();


        // --------------------------------init end ------------------------------


    });