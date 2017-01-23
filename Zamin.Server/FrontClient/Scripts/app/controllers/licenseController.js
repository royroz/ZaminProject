angular.module('music4BizWebsite')
    .controller('licenseCtrl', function ($scope, $routeParams, $location, $sce, licenseService) {
        $scope.upgradeOptions = [];
        $scope.extensionsOptions = [];

        $scope.userCode = "";
        $scope.sum = $routeParams.sum;
        $scope.iframeUrl = null;

        $scope.VAT = VAT;
        $scope.canGetTrialLicense = false;

        $scope.getUpgradeOptions = function () {
            if ($routeParams.LicenseSalesForceId == undefined) {
                return;
            }
            showLoader();
            licenseService.getUpgradeOptions($routeParams.LicenseSalesForceId).then(function (response) {
                $scope.upgradeOptions = response;
                hideLoader();
            });
        };

        $scope.getExtensionsOptions = function () {
            if ($routeParams.LicenseSalesForceId == undefined) {
                return;
            }
            showLoader();
            licenseService.getExtensionsOptions($routeParams.LicenseSalesForceId).then(function (response) {
                $scope.extensionsOptions = response;
                hideLoader();
            });
        };


        $scope.upgradePackage = function (packageId, sum) {
            showLoader();
            licenseService.upgradePackage($routeParams.LicenseSalesForceId, packageId).then(function (response) {
                hideLoader();
                if (response.message === true) {
                    $location.path("tranzilaPayment/" + sum);
                }
            });
        }
        $scope.extendPackage = function (packageId, sum) {
            showLoader();
            licenseService.extendPackage($routeParams.LicenseSalesForceId, packageId).then(function (response) {
                hideLoader();
                if (response.message === true) {
                    $location.path("tranzilaPayment/" + sum);
                }
            });
        }

        $scope.getUserCode = function () {
            licenseService.getUserCode().then(function (response) {
                if (response.success == true) {
                    $scope.userCode = response.userCode;
                    var email = response.email;
                    var comments = "";
                    var nickname = "";
                    var isDiskOnKey = false;
                    if ($routeParams.isDiskOnKey != undefined) {
                        isDiskOnKey = $routeParams.isDiskOnKey;
                    }
                    if ($routeParams.comments != undefined) {
                        comments = $routeParams.comments;
                    }
                    if ($routeParams.nickname != undefined) {
                        nickname = $routeParams.nickname;
                    }

                    //$scope.iframeUrl = $sce.trustAsResourceUrl("https://direct.tranzila.com/music4biz/iframe.php?lang=il&nologo=1&trButtonColor=f7931e&trTextColor=010101&sum=" + $scope.sum + "&code=" + $scope.userCode + "&priceListItem=" + $routeParams.priceListItem);
                    $scope.iframeUrl = $sce.trustAsResourceUrl(
                        "https://direct.tranzila.com/music4biz/iframe.php?lang=il&nologo=1&trButtonColor=f7931e&tranmode=A&trTextColor=010101&TranzilaPW=qKUKS3&currency=1&cred_type=8&maxpay=12" +
                        "&sum=" + $scope.sum * VAT +
                        "&priceListItem=" + $routeParams.priceListItem +
                        "&nickname=" + nickname +
                        "&code=" + $scope.userCode +
                        "&email=" + email +
                        "&company=" + response.company +
                       "&comments=" + comments + 
                       "&diskOnKey=" + isDiskOnKey

                    );
                }
            });
        }

        $scope.buyPackage = function (packageNumber) {
            showLoader();
            licenseService.buyPackage(packageNumber).then(function (response) {
                hideLoader();
                if (response.message === true && response.sum !== 0) {
                    $location.path("tranzilaPayment/" + response.sum);
                } else if (response.message === true && response.sum === 0) {
                    window.location.href = "Partials/tranzilaSuccessPage.html";
                }
            });
        }

        $scope.CanUserGetTrialLicense = function () {
            showLoader();
            licenseService.CanUserGetTrialLicense().then(function (response) {
                $scope.canGetTrialLicense = response;
                hideLoader();
            });
        }
        $scope.$on("userLogedOut", function () {
            $scope.extensionsOptions = [];
            $scope.upgradeOptions = [];
        });




        //$scope.CanUserGetTrialLicense();
        $scope.getUserCode();
        //$scope.getUpgradeOptions();
        //$scope.getExtensionsOptions();


        $scope.removeBg = function () {
            $("body").removeClass("home-bg");
            $("body").removeClass("lib-bg");
            $("body").removeClass("portfolio-bg");
            $("body").removeClass("businessMusic-bg");
        }
        $scope.removeBg();

    });