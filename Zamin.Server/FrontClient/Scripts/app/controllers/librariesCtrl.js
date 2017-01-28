angular.module('zamin')
    .controller('librariesCtrl', function ($scope, $location, $rootScope) {
        $scope.index = 1;
        $scope.interval = undefined;

        $scope.openTab = function (url) {
            window.open(url, '_blank');
        }

        $scope.changeBg = function () {
            $("body").removeClass("home-bg");
            $("body").removeClass("lib-bg");
            $("body").removeClass("portfolio-bg");
            $("body").removeClass("businessMusic-bg");
        }


        $('.carousel').carousel({
            interval: 5000
        });
        $scope.changeBg();

    });