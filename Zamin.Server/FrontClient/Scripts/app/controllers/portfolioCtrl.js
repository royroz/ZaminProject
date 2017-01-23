angular.module('music4BizWebsite')
    .controller('portfolioCtrl', function ($scope, $location, $sce, $rootScope, portfolioService) {
        $scope.maxIndex = 7;
        $scope.video = '';

        $scope.images = [];

        $scope.getPortfolioImages = function () {
            portfolioService.getPortfolioImages().success(function(response) {
                $scope.images = response;
            });
        }

        $scope.showNext = function () {
            if ($scope.maxIndex >= $scope.images.length - 1) {
                $scope.maxIndex = 7;
            } else {
                $scope.maxIndex = $scope.maxIndex + 8;
                //if ($scope.maxIndex > $scope.images.length) $scope.maxIndex = $scope.images.length;
            }

        }


        $scope.showPrev = function () {
            if ($scope.maxIndex < 8) {
                $scope.maxIndex = $scope.images.length - 1;//+ (7 - ($scope.images.length%8));
            } else {
                $scope.maxIndex = $scope.maxIndex - 8;
                //if ($scope.maxIndex < 7) $scope.maxIndex = 7;
            }

        }

        $scope.changeBg = function (path) {
            $("body").removeClass("home-bg");
            $("body").removeClass("lib-bg");
            $("body").removeClass("portfolio-bg");
            $("body").removeClass("businessMusic-bg");

            var className = "";
            if (path === "/") className = "home-bg";
            if (path === "/libraries") className = "lib-bg";
            if (path === "/portfolio") className = "portfolio-bg";
            if (path === "/businessMusic") className = "businessMusic-bg";
            $("body").addClass(className);
            //if ($("#ng-view .portfolio")[0] != undefined) $("#ng-view .portfolio")[0].style.marginTop = "21%";
        }

        $scope.playMovie = function (src) {
            if (src === '') return;
            src = src.replace("watch?v=", "v/");
            $scope.video = $sce.trustAsResourceUrl(src);
            $('#video-modal').modal('show');
        }

        $scope.changeBg($location.path());
    $scope.getPortfolioImages();
});