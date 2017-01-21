angular.module('music4BizApp')
    .controller('chartsCtrl', function ($scope, chartsService) {

        // ---------------------------- scope variables ----------------------

        //song by publishers
        $scope.publisherBySongsData = {};
        $scope.songsByPublisherEmailAdress = "";
        $scope.songsByPublisherEmailAdressInvalid = false;
        $scope.openSongByPublisherEmailBox = false;

        //songs by performers
        $scope.songsByPerformersEmailAdress = "";
        $scope.songsByPerformersEmailAdressInvalid = false;
        $scope.openSongByPerformersEmailBox = false;

        //licenses
        $scope.licenseChartData = {};
        $scope.licensesEmailAdress = "";
        $scope.licensesEmailAdressInvalid = false;
        $scope.openLicensesEmailBox = false;

        //playLists
        $scope.playListChartData = {};
        $scope.playlistsEmailAdress = "";
        $scope.playlistsEmailAdressInvalid = false;
        $scope.openPlaylistsEmailBox = false;

        //active licenses count
        $scope.activeLicensesNum = 0;
        $scope.activeLicensesEmailAdress = "";
        $scope.activeLicensesEmailAdressInvalid = false;
        $scope.openActiveLicensesEmailBox = false;

        //trial licenses
        $scope.trialLicensesNum = 0;
        $scope.trialLicensesEmailAdress = "";
        $scope.trialLicensesEmailAdressInvalid = false;
        $scope.openTrialLicensesEmailBox = false;

        //incomes chart
        $scope.incomesChartDate = {};
        $scope.incomesFromDate = "";
        $scope.incomesToDate = "";
        $scope.incomesEmailAdress = "";
        $scope.incomesEmailAdressInvalid = false;
        $scope.openIncomesEmailBox = false;


        // --------------------------- functions ----------------------

        $scope.getInitData = function () {
            showLoader();
            chartsService.getInitData().then(function (response) {
                $scope.trialLicensesNum = response.trialLicensesNum;
                $scope.activeLicensesNum = response.activeLicensesNum;
                $scope.incomesFromDate = response.fromDate;
                $scope.incomesToDate = response.toDate;
                $scope.getIncomesChartData($scope.incomesFromDate, $scope.incomesToDate);
                hideLoader();
            });
        }


        // ---------------------------charts functions ----------------------

        $scope.getPublisherBySongChartData = function () {
            chartsService.getPublisherBySongChartData().then(function (response) {
                $scope.publisherBySongsData = response;
                $.plot($("#songsPublisher"), $scope.publisherBySongsData, {
                    series: {
                        pie: {
                            show: true,
                            radius: 1,
                            label: {
                                show: true,
                                radius: 3 / 4,
                                formatter: function (label, series) {
                                    if (series.percent < 1) {
                                        return "";
                                    }
                                    return "<div style='font-size:8pt; text-align:center; padding:1px; color:white;'>" + Math.round(series.percent * 100) / 100 + "%</div>";
                                },
                                background: {
                                    opacity: 0
                                }
                            }
                        }
                    },
                    legend: {
                        show: true
                    },
                    colors: ["#fc8675", "#6bafbd", "#65cea7", "#f3ce85"]
                });
            });
        }

        $scope.getLicenseChartData = function () {
            chartsService.getLicenseChartData().then(function (response) {
                $scope.licenseChartData = response;
                $.plot($("#licenseChart"), $scope.licenseChartData, {
                    series: {
                        pie: {
                            show: true,
                            radius: 1,
                            label: {
                                show: true,
                                radius: 1 / 2,
                                formatter: function (label, series) {
                                    return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>" + Math.round(series.percent * 100) / 100 + "%</div>";
                                },
                                background: {
                                    opacity: 0
                                }
                            }
                        }
                    },
                    legend: {
                        show: true
                    }
                });
            });
        }

        $scope.getPlayListChartData = function () {
            chartsService.getPlayListChartData().then(function (response) {
                $scope.playListChartData = response;
                $.plot($("#playListChart"), $scope.playListChartData, {
                    series: {
                        pie: {
                            show: true,
                            radius: 1,
                            label: {
                                show: true,
                                radius: 1 / 2,
                                formatter: function (label, series) {
                                    return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>" + Math.round(series.percent * 100) / 100 + "%</div>";
                                },
                                background: {
                                    opacity: 0
                                }
                            }
                        }
                    }
                });
            });
        }


        //---------------------------------------- incomes start -----------------------------------------------
        var init = {
            data: [[0, 5], [1, 8], [2, 5], [3, 8], [4, 7], [5, 9], [6, 8], [7, 8], [8, 10], [9, 12], [10, 10]]
        }

        var incomesOptions = {
            series: {
                lines: {
                    show: true,
                    fill: true,
                    fillColor: 'rgba(121,206,167,0.2)'
                },
                points: {
                    show: true,
                    radius: '4.5'
                }
            },
            xaxis: { mode: "time", timeformat: "%b %Y" },
            grid: {
                hoverable: true,
                clickable: true
            },
            colors: ["#37b494"]
        };
        $scope.refreshIncomesChart = function () {
            showLoader();
            $scope.incomesFromDate = $("#fromDate").val();
            $scope.incomesToDate = $("#toDate").val();
            chartsService.getIncomesChartData($scope.incomesFromDate, $scope.incomesToDate).then(function (response) {
                $scope.incomesChartData = response.data;
                $scope.plotIncomesChart();
                hideLoader();
            });
        }

        $scope.getIncomesChartData = function (from, to) {
            chartsService.getIncomesChartData(from, to).then(function (response) {
                $scope.incomesChartData = response.data;
                $scope.plotIncomesChart();
            });
        }

        $scope.plotIncomesChart = function () {
            var init = { data: [] };
            $scope.incomesChartData.forEach(function (item) {
                init.data.push([new Date(item.Year, item.Month - 1, 1).getTime(), item.Sum]);
            });
            console.log(init.data);
            var plot = $.plot($('#incomesChart'), [init], incomesOptions);
        }
        //---------------------------------------- incomes end -----------------------------------------------


        // ---------------------------email functions ----------------------

        $scope.sendSongsByPublishersMail = function () {
            if ($scope.songsByPublisherEmailAdress === undefined) {
                $scope.songsByPublisherEmailAdressInvalid = true;
            } else {
                $scope.songsByPublisherEmailAdressInvalid = false;
                chartsService.sendSongsByPublishersMail($scope.songsByPublisherEmailAdress);
                $scope.openSongByPublisherEmailBox = false;
                getCookieMessages();
            }
        }

        $scope.sendSongsByPerformersMail = function () {
            if ($scope.songsByPerformersEmailAdress === undefined) {
                $scope.songsByPerformersEmailAdressInvalid = true;
            } else {
                $scope.songsByPerformersEmailAdressInvalid = false;
                chartsService.sendSongsByPerformersMail($scope.songsByPerformersEmailAdress);
                $scope.openSongByPerformersEmailBox = false;
                getCookieMessages();
            }
        }

        $scope.sendLicensesMail = function () {
            if ($scope.licensesEmailAdress === undefined) {
                $scope.licensesEmailAdressInvalid = true;
            } else {
                $scope.licensesEmailAdressInvalid = false;
                chartsService.sendLicensesMail($scope.licensesEmailAdress);
                $scope.openLicensesEmailBox = false;
                getCookieMessages();
            }
        }

        $scope.sendPlaylistsMail = function () {
            if ($scope.playlistsEmailAdress === undefined) {
                $scope.playlistsEmailAdressInvalid = true;
            } else {
                $scope.playlistsEmailAdressInvalid = false;
                chartsService.sendPlaylistsMail($scope.playlistsEmailAdress);
                $scope.openPlaylistsEmailBox = false;
                getCookieMessages();
            }
        }

        $scope.sendActiveLicensesMail = function () {
            if ($scope.activeLicensesEmailAdress === undefined) {
                $scope.activeLicensesEmailAdressInvalid = true;
            } else {
                $scope.activeLicensesEmailAdressInvalid = false;
                chartsService.sendActiveLicensesMail($scope.activeLicensesEmailAdress);
                $scope.openActiveLicensesEmailBox = false;
                getCookieMessages();
            }
        }
        $scope.sendTrialLicensesMail = function () {
            if ($scope.trialLicensesEmailAdress === undefined) {
                $scope.trialLicensesEmailAdressInvalid = true;
            } else {
                $scope.trialLicensesEmailAdressInvalid = false;
                chartsService.sendTrialLicensesMail($scope.trialLicensesEmailAdress);
                $scope.openTrialLicensesEmailBox = false;
                getCookieMessages();
            }
        }

        $scope.sendIncomesMail = function () {
            if ($scope.incomesEmailAdress === undefined) {
                $scope.incomesEmailAdressInvalid = true;
            } else {
                $scope.incomesEmailAdressInvalid = false;
                chartsService.sendIncomesMail($scope.incomesEmailAdress, $("#fromDate").val(), $("#toDate").val());
                $scope.openIncomesEmailBox = false;
                getCookieMessages();
            }
        }

        $scope.printIncomes = function () {
            $scope.incomesFromDate = $("#fromDate").val();
            $scope.incomesToDate = $("#toDate").val();
            window.open("/Home/PrintIncomes?fromDate=" + $scope.incomesFromDate + "&toDate=" + $scope.incomesToDate, true);
        }

        $scope.excelIncomes = function () {
            $scope.incomesFromDate = $("#fromDate").val();
            $scope.incomesToDate = $("#toDate").val();
            window.open("/Home/ExcelIncomes?fromDate=" + $scope.incomesFromDate + "&toDate=" + $scope.incomesToDate, true);
        }
        // ---------------------------- flow start ---------------------------

        $scope.getPlayListChartData();
        $scope.getPublisherBySongChartData();
        $scope.getLicenseChartData();
        $scope.getInitData();
    });