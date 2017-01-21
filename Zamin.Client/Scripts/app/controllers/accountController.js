angular.module('music4BizWebsite')
    .controller('accountCtrl', function ($scope, $rootScope, $routeParams, $location, userService, accountService, licenseService) {
        $scope.licenses = [];

    $scope.signupInfo = {
        isDiskOnKey: false
    };
        $scope.wrongPassword = false;
        $scope.passwordTooShort = false;
        $scope.emailExists = false;
        $scope.businessNumberExists = false;
        $scope.logedIn = false;


        $scope.priceItemId = $routeParams.priceItemId;
        $scope.pricesitems = [];
        $scope.priceListItemSelected = {};
        $scope.currentUser = {};

        $scope.nickname = "";
        $scope.comments = "";
        $scope.licenseToRenew = undefined;

        $scope.isLogedIn = function () {
            userService.isLogedIn().then(function (response) {
                $scope.logedIn = response.isLogedIn;
                $scope.userName = response.userName;
                if ($scope.logedIn) {
                    $rootScope.$broadcast("userLogedIn", $scope.userName);
                    $scope.getUserLicenses();
                }
            });
        }

        $scope.getUserLicenses = function () {
            if ($scope.logedIn === false) {
                return;
            }
            showLoader();
            accountService.getUserLicenses().then(function (response) {
                if (response === false) {
                    hideLoader();
                    return;
                }
                $scope.licenses = response;
                hideLoader();
            });
        }

        $scope.signUp = function () {
            $scope.emailExists = false;
            $scope.businessNumberExists = false;
            $scope.passwordTooShort = false;
            $scope.wrongPassword = false;
            if ($scope.signupInfo.FullName == undefined || $scope.signupInfo.BusinessName == undefined || $scope.signupInfo.Email == undefined || $scope.signupInfo.Password == undefined || $scope.signupInfo.CellPhone == undefined) {
                return;
            }
            if ($scope.signupInfo.Password !== $scope.signupInfo.ConfirmPassword) {
                $scope.signupInfo.ConfirmPassword = null;
                $scope.wrongPassword = true;
                return;
            }
            if ($scope.signupInfo.Password.length < 6) {
                $scope.passwordTooShort = true;
                return;
            }

            showLoader();
            var price = $scope.signupInfo.PriceListItem.Price;

            if ($scope.signupInfo.isDiskOnKey) {
                price += 100;
            }
            accountService.signUp($scope.signupInfo).then(function (response) {
                if (response.message === "user name exists") {
                    $scope.emailExists = true;
                } else if (response.message === "business number exists") {
                    $scope.businessNumberExists = true;
                } else if (response.message === true) {
                    $scope.isLogedIn = true;
                    $scope.userName = response.userName;
                    $rootScope.$broadcast("userSingedUp", response.userName);
                    $location.path("tranzilaPayment/" + price + "/" + $scope.signupInfo.PriceListItem.Id + "/" + $scope.signupInfo.Nickname + "/" + $scope.signupInfo.isDiskOnKey);
                    //$location.path("account");
                }
                hideLoader();
            });
        }


        $scope.$on("userLogedOut", function () {
            $scope.licenses = [];
        });

        $scope.$on("userLogedIn", function () {
            if ($scope.licenses.length === 0) {
                $scope.logedIn = true;
                $scope.getUserLicenses();
            }
        });
        $scope.removeBg = function () {
            $("body").removeClass("home-bg");
            $("body").removeClass("lib-bg");
            $("body").removeClass("portfolio-bg");
            $("body").removeClass("businessMusic-bg");
        }


        $scope.getPriceList = function () {
            accountService.getPriceList().success(function (response) {
                $scope.pricesitems = response;
                $scope.pricesitems.forEach(function (item) {
                    if ($scope.priceItemId == item.Id) {
                        $scope.signupInfo.PriceListItem = item;
                    }
                    item.Text = item.Name + " (" + item.Price + ' ש"ח )';
                });
            });
        };

        $scope.changeBg = function () {
            $("body").removeClass("home-bg");
            $("body").removeClass("lib-bg");
            $("body").removeClass("portfolio-bg");
            $("body").removeClass("businessMusic-bg");

        }

        $scope.openPriceListModal = function () {
            $("#businessSizeModal").modal('show');
        }

        $scope.tranzilaPayment = function (item, nickname, comments) {
            $scope.formSubmitted = true;
            if (item.Id == undefined) return;
            $scope.formSubmitted = false;
            showLoader();
            //if ($scope.currentUser.TranzilaToken != null && $scope.currentUser.TranzilaToken != "") { // pay with token
            //    accountService.addLicense($scope.currentUser.Id, item.Id, item.Price, nickname, comments).then(function () {
            //        $("#businessSizeModal").modal('hide');
            //        $scope.getUserLicenses();
            //        hideLoader();
            //    });
            //} else {
            hideLoader();
            if (comments != undefined && comments !== "") {
                comments = "/" + comments;
            } else {
                comments = "";
            }
            accountService.purchaseLicenseRequest(item.Id, false, undefined).then(function (response) {
                if (response.success == true) window.location.href = "#tranzilaPayment/" + item.Price + "/" + item.Id + "/" + nickname + comments;
            });

            // }


        }


        $scope.renewLicense = function (license) {
            var priceListId = license.PriceListId;
            var priceListItem = $.grep($scope.pricesitems, function (e) { return e.Id == priceListId })[0];


            accountService.purchaseLicenseRequest(license.PriceListId, true, license.Id).then(function (response) {
                if (response.success == true) window.location.href = "#tranzilaPayment/" + priceListItem.Price + "/-1";
            });

            //  $("#renewModal").modal('show');

        }

        $scope.extendLicense = function (license) {
            var priceListId = license.PriceListId;
            var priceListItem = $.grep($scope.pricesitems, function (e) { return e.Id == priceListId })[0];


            accountService.extendLicenseRequest(license.PriceListId, license.Id).then(function (response) {
                if (response.success == true) window.location.href = "#tranzilaPayment/" + priceListItem.Price + "/-1";
            });
        }

        //$scope.renewLicense = function () {
        //    showLoader();
        //    accountService.renewLicense($scope.licenseToRenew).then(function (response) {
        //        $("#renewModal").modal('hide');
        //        hideLoader();
        //        $scope.getUserLicenses();
        //    });
        //}

        $scope.getCurrentUser = function () {
            licenseService.getCurrentUser().then(function (response) {
                $scope.currentUser = response.user;
            });
        }

        // $scope.getCurrentUser();
        // $scope.changeBg();
        // $scope.getPriceList();
        // $scope.isLogedIn();
    });
