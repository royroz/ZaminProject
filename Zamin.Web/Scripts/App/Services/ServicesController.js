angular.module('music4BizApp')
    .controller('servicesCtrl', function ($scope, $location, $sce, servicesService, metaDataService) {
        $scope.services = [];
        $scope.newService = {};

        $scope.service = {};

        $scope.client = {};
        $scope.paymentTypes = [];
        $scope.paymentType = {};
        $scope.paymentSum = undefined;

        $scope.checks = [];
        $scope.check = {};
        $scope.totalChecksSum = 0;
        $scope.banks = [];

        $scope.getSpecialServices = function () {
            showLoader();
            servicesService.getSpecialServices().success(function (response) {
                $scope.services = response;
                hideLoader();
            });
        }

        $scope.showEditService = function (service) {
            service.edit = true;
        }

        $scope.updateService = function (service) {
            servicesService.saveService(service).success(function (response) {
                service.edit = false;
            });
        }
        $scope.saveService = function () {
            servicesService.saveService($scope.newService).success(function (response) {
                $scope.newService = {};
                $scope.getSpecialServices();
            });
        }

        $scope.deleteService = function (service) {
            servicesService.deleteService(service.Id).success(function (response) {
                $scope.getSpecialServices();
            });
        }
        //--------------------Client Service---------------------------
        $scope.getClient = function () {
            var path = $location.absUrl();
            var split = path.toLowerCase().split("addservicetoclient/");
            if (split.length > 1) {
                var possibleId = split[1];
                if (!isNaN(possibleId)) {
                    servicesService.getClient(possibleId).success(function (response) {
                        $scope.client = response;
                    });
                }
            }
        }

        $scope.addServiceToClient = function () {
            showLoader();
            servicesService.addServiceToClient($scope.client.Id, $scope.service.Id, $scope.service.Price).success(function (response) {
                hideLoader();
                window.location.href = "/Clients/Details/" + $scope.client.Id;
            });
        }

        $scope.openPaymentModal = function () {
            $scope.submitted = true;
            if ($scope.service.Id === undefined) {
                return;
            }
            if ($scope.service.Price === 0) {
                $scope.addServiceToClient();
            } else {
                if ($scope.paymentType.Id === 0) {

                    $scope.iframeUrl = $sce.trustAsResourceUrl(
                    "https://direct.tranzila.com/" + tranzilaSupplierName +
                    "/iframe.php?lang=il&nologo=1&trButtonColor=f7931e&trTextColor=010101&tranmode=K&hidesum=1&supplier=" + tranzilaSupplierName +
                    "&TranzilaPW=" + tranzilaPw +
                    "&serviceId=" + $scope.service.Id +
                    "&clientId=" + $scope.client.Id +
                    "&price=" + $scope.service.Price);
                    $("#creditPaymentModal").modal('show');
                } else if ($scope.paymentType.Id === 1) {
                    $scope.paymentSum = $scope.service.Price;
                    $("#checkPaymentModal").modal('show');
                }
            }
        }

        $scope.getPaymentTypes = function () {
            metaDataService.getPaymentTypes().success(function (response) {
                $scope.paymentTypes = response;
                $scope.paymentType.Id = response[0].Id;
            });
        };

        $scope.getBanks = function () {
            metaDataService.getBanks().success(function (response) {
                $scope.banks = response;
            });
        };

        //------------------------------Check payment------------------------------------

        $scope.addAnotherCheck = function () {
            $scope.check.Expiration = $("#checkExpiration").val();
            $scope.checks.push($scope.check);
            $scope.totalChecksSum += $scope.check.Sum;
            $scope.check = {};
            $("#checkExpiration").val("");
        }

        $scope.removeCheck = function (index) {
            $scope.totalChecksSum -= $scope.checks[index].Sum;
            $scope.checks.splice(index, 1);
        }

        $scope.saveChecks = function () {
            showLoader();
            servicesService.addServiceAndChecks($scope.client.Id, $scope.service.Price, $scope.service.Id, $scope.checks).success(function () {
                $("#checkPaymentModal").modal('hide');
                hideLoader();
                window.location.href = "/Clients/Details/" + $scope.client.Id;
            });
        }

        $scope.getClient();
        $scope.getPaymentTypes();
        $scope.getSpecialServices();
        $scope.getBanks();
    });