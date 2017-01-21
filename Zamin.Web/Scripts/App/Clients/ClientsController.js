angular.module("music4BizApp")
    .controller("clientsCtrl", function ($scope, $filter, clientsService, metaDataService) {

        $scope.specialServices = [];
        $scope.licenseTypes = [];
        $scope.clients = [];
        $scope.pricesList = [];

        $scope.selectedService = null;

        // ---------------- init start ----------------------

        $scope.getClients = function () {
            showLoader();
            clientsService.getClients()
                .then(function (response) {
                    $scope.clients = response;
                    $scope.filterChange();
                }).finally(function () {
                    hideLoader();
                });
        };

        $scope.getClients();


        $scope.getSpecialServices = function () {

            metaDataService.getSpecialServices()
                .then(function (response) {
                    $scope.specialServices = response;
                });
        };

        $scope.getSpecialServices();

        $scope.getLicenseTypes = function () {

            metaDataService.getLicenseTypes()
                .then(function (response) {
                    $scope.licenseTypes = response;
                });
        };

        $scope.getPricesList = function () {
            metaDataService.getPricesList().success(function (response) {
                $scope.pricesList = response;
            });
        }

        $scope.getLicenseTypes();
        $scope.getPricesList();

        // ---------------- init end ----------------------

        $scope.selectedClient = null;

        $scope.showServices = function (index) {
            $scope.selectedClient = $scope.filteredItems[index];
            $("#servicesModal").modal({
                show: true
            });
        };

        $scope.showLicenses = function (index) {
            $scope.selectedClient = $scope.filteredItems[index];
            $("#licensesModal").modal({
                show: true
            });
        };

        $scope.printClients = function () {
            window.print();
        }

        $scope.exportClientsToCsv = function () {
            var licenseTypeId = -1;
            var serviceId = -1;
            var text = "";
            var expiration = "";
            if ($scope.filter.freeText != undefined) text = $scope.filter.freeText;
            if ($scope.filter.expiration != undefined) expiration = $scope.filter.expiration;
            if ($scope.filter.licenseType != undefined) licenseTypeId = $scope.filter.licenseType.Id;
            if ($scope.filter.specialService != undefined) serviceId = $scope.filter.specialService.Id;
            window.open('/Clients/ExportClientsToCsv?FreeText=' + text + '&Expiration=' + expiration + '&LicenseTypeId=' + licenseTypeId + '&SpecialServiceId=' + serviceId, '_blank', '');
        }



        $scope.clientToDelete = undefined;
        $scope.clientToDeleteIndex = undefined;

        $scope.openDeleteClient = function (clientId, index) {
            $scope.clientToDelete = clientId;
            $scope.clientToDeleteIndex = index;
            $("#deleteClientModel").modal('show');
        }

        $scope.deleteClient = function () {
            showLoader();
            clientsService.deleteClient($scope.clientToDelete).success(function (response) {
                if (response) {
                    $scope.clients.splice($scope.clientToDeleteIndex, 1);
                    $("#deleteClientModel").modal('hide');
                }
                hideLoader();
            });
        }



        $scope.emailLicenses = function (clientId, index) {
            showLoader();
            $scope.selectedClient = $scope.filteredItems[index];
            var licenseHtmlTable = $("#licesnesEmailTable")[0];
            var htmlStr = $scope.getHTML(licenseHtmlTable, true);
            clientsService.emailLicenses(clientId, htmlStr).success(function (response) {
                hideLoader();
                getCookieMessages();
            });
        }


        $scope.getHTML = function (who, deep) {
            if (!who || !who.tagName) return '';
            var txt, ax, el = document.createElement("div");
            el.appendChild(who.cloneNode(false));
            txt = el.innerHTML;
            if (deep) {
                ax = txt.indexOf('>') + 1;
                txt = txt.substring(0, ax) + who.innerHTML + txt.substring(ax);
            }
            el = null;
            return txt;
        }

        // -------------------------------------- filter start ---------------------------------------------
        $scope.filter = {};


        $scope.filterFunction = function (element) {
            var now = new Date();
            var exp = '';
            var keep = false;
            //filter by expiration
            if ($scope.filter.expiration === "lastWeek") {
                keep = false;
                element.Licenses.forEach(function (license) {
                    exp = license.Expiration;
                    var diff = now.getTime() - exp.substring(6, exp.length - 2);
                    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
                    if (days <= 7 && days > 0) {
                        keep = true;
                    }
                });
                if (!keep) return false;
            }

            if ($scope.filter.expiration === "lastMonth") {
                keep = false;
                var lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
                element.Licenses.forEach(function (license) {
                    var expArr = license.ExpirationStr.split("/");
                    var expDate = new Date(expArr[2], expArr[1] - 1, expArr[0]);
                    if (expDate < now && expDate >= lastMonth) {
                        keep = true;
                    }
                });
                if (!keep) return false;
            }

            if ($scope.filter.freeText != undefined && $scope.filter.freeText !== '') {
                if ((element.FirstName == undefined || element.FirstName.toLowerCase().indexOf($scope.filter.freeText.toLowerCase()) == -1) &&
                    (element.LastName == undefined || element.LastName.toLowerCase().indexOf($scope.filter.freeText.toLowerCase()) == -1) &&
                    (element.BusinessName == undefined || element.BusinessName.toLowerCase().indexOf($scope.filter.freeText.toLowerCase()) == -1) &&
                    (element.BusinessNumber == undefined || element.BusinessNumber.toLowerCase().indexOf($scope.filter.freeText.toLowerCase()) == -1) &&
                    (element.Phone == undefined || element.Phone.toLowerCase().indexOf($scope.filter.freeText.toLowerCase()) == -1) &&
                    (element.CellPhone == undefined || element.CellPhone.toLowerCase().indexOf($scope.filter.freeText.toLowerCase()) == -1)) {
                    return false;
                }
            }


            if ($scope.filter.licenseType != undefined) {
                keep = false;
                element.Licenses.forEach(function (license) {
                    if (license.LicenseTypeId === $scope.filter.licenseType.Id) {
                        keep = true;
                    }
                });
                if (!keep) return false;
            }

            if ($scope.filter.specialService != undefined) {
                keep = false;
                element.Services.forEach(function (service) {
                    if (service.ServiceId === $scope.filter.specialService.Id) {
                        keep = true;
                    }
                });
                if (!keep) return false;
            }

            if ($scope.filter.priceListItem != undefined) {
                keep = false;
                element.Licenses.forEach(function (license) {
                    if (license.PriceListId === $scope.filter.priceListItem.Id) {
                        keep = true;
                    }
                });
                if (!keep) return false;
            }

            return true;
        };

        $scope.clearFilter = function () {
            $scope.filter = {};
            $scope.filterChange();

        };

        $scope.filterChange = function () {
            $scope.filteredItems = $filter("filter")($scope.clients, $scope.filterFunction);
        };

        // -------------------------------------- filter end ---------------------------------------------
    });