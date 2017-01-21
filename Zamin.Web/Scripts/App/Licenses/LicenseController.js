angular.module('music4BizApp')
    .controller('licenseCtrl', function ($scope, $location, $sce, licenseService, metaDataService) {

        $scope.client = {};
        $scope.nickname = '';
        $scope.comments = '';
        $scope.licenseTypes = [];
        $scope.paymentTypes = [];
        $scope.paymentType = {};
        $scope.licenseType = undefined;
        $scope.start = undefined;
        $scope.end = undefined;
        $scope.submitted = false;
        $scope.licensePrice = undefined;
        $scope.paymentSum = undefined;
        $scope.priceList = [];
        $scope.businessSize = [];

        $scope.checks = [];
        $scope.check = {};
        $scope.totalChecksSum = 0;
        $scope.banks = [];

        //----------------------------Get funcftions------------------------------------

        $scope.getClient = function () {
            showLoader();
            var path = $location.absUrl();
            var id = path.substring(path.lastIndexOf('/') + 1, path.length);
            if (!isNaN(id)) {
                licenseService.getClient(id).success(function (response) {
                    $scope.client = response;
                    hideLoader();
                });
            }
        }
        $scope.getLicenseTypes = function () {
            licenseService.getLicenseTypes().success(function (response) {
                $scope.licenseTypes = response;
                $scope.licenseType = response[0];
            });
        };
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

        $scope.getLicensePrices = function () {
            licenseService.getLicensePrices().success(function (response) {
                $scope.priceList = response;
            });

        }


        //----------------------------Post funcftions------------------------------------
        $scope.addLicense = function () {
            showLoader();
            licenseService.addLicense($scope.client.Id, $scope.licensePrice, $scope.licenseType.Id, $scope.start, $scope.end, $scope.businessSize.Id, $scope.comments, $scope.nickname).success(function (response) {
                $("#creditPaymentModal").modal('hide');
                hideLoader();
                window.location.href = "/Clients/Details/" + $scope.client.Id;
            });
        }

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
            licenseService.addLicenseAndChecks($scope.client.Id, $scope.licensePrice, $scope.licenseType.Id, $scope.start, $scope.end, $scope.checks, $scope.businessSize.Id).success(function () {
                $("#checkPaymentModal").modal('hide');
                hideLoader();
                window.location.href = "/Clients/Details/" + $scope.client.Id;
            });
        }

        //-------------------------------------------------------------------------------

        //$scope.licenseTypeChanged = function () {
        //    if ($scope.licenseType.Id === 1) $scope.licensePrice = offlineLicensePrice;
        //    else if ($scope.licenseType.Id === 0) $scope.licensePrice = onlineLicensePrice;
        //}

        $scope.businessSizeChanged = function () {
            $scope.licensePrice = $scope.businessSize.Price;
        }


        $scope.openLicensePaymentModal = function () {
            $scope.submitted = true;
            $scope.start = $("#startDate").val();
            $scope.end = $("#endDate").val();
            if ($scope.businessSize == undefined || $scope.start === '' || $scope.end === '' || $scope.licensePrice === '') {
                return;
            }

            if ($scope.licensePrice == 0) {
                $scope.addLicense();
            } else {
                showLoader();
                licenseService.addPaymentRequest($scope.licensePrice, $scope.client.Id).success(function (response) {
                    hideLoader();
                    if (response.success) {
                        if ($scope.paymentType.Id === 0) {

                            $scope.iframeUrl = $sce.trustAsResourceUrl(
                            "https://direct.tranzila.com/" + tranzilaSupplierName +
                            "/iframe.php?lang=il&nologo=1&trButtonColor=f7931e&trTextColor=010101&tranmode=A&currency=1&cred_type=2&maxpay=12&supplier=" + tranzilaSupplierName +
                            "&TranzilaPW=" + tranzilaPw +
                            "&licenseStart=" + $scope.start +
                            "&licenseEnd=" + $scope.end +
                            "&priceListItem=" + $scope.businessSize.Id +
                            "&code=" + response.userCode +
                            "&email=" + $scope.client.Email +
                            "&nickname=" + $scope.nickname +
                            "&comments=" + $scope.comments +
                            "&sum=" + $scope.licensePrice*VAT +
                            "&company=" + $scope.client.BusinessName
                            );

                            $("#creditPaymentModal").modal('show');
                        }
                        else if ($scope.paymentType.Id === 1) {
                            $scope.paymentSum = $scope.licensePrice;
                            $("#checkPaymentModal").modal('show');
                        }
                    }
                });


            }
        }



        $('#startDate').on('changeDate', function (ev) {
            var start = $("#startDate").val();
            if (start !== '') {
                var year = start.split("/")[2];
                year = parseInt(year) + 1;
                $("#endDate").val(start.split("/")[0] + "/" + start.split("/")[1] + "/" + year);
                $("#endDate").data({ date: start.split("/")[0] + "/" + start.split("/")[1] + "/" + year });
                $("#endDate").datepicker('update');
                $scope.start = $("#startDate").val();
                $scope.end = $("#endDate").val();
                $scope.$apply();
            }
        });

        $scope.getClient();
        $scope.getLicenseTypes();
        $scope.getPaymentTypes();
        $scope.getBanks();
        $scope.getLicensePrices();
    });