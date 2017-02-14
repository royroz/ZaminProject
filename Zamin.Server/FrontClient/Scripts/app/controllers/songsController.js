angular.module('zamin')
    .controller('songsCtrl', function ($scope, $location, $rootScope, songsService) {

        //$scope.songs = [];
        $scope.genres = [{ id: 1, text: "שקט ורומנטי" }, { id: 2, text: "ג'אז" }, { id: 3, text: "צ'יל / לאונג'" },
                        { id: 4, text: "להיטים" }, { id: 5, text: "קלאב פאשן" }, { id: 6, text: "קלאסי" }, { id: 7, text: "דאנס" }];
        $scope.currentGenre = {};
        $scope.currentSongIndex = 0;
        $scope.currentSongPlayingObject = undefined;

        $scope.showPause = false;

        $scope.getSongsFromBucket = function () {
            showLoader();
            songsService.getSongsFromBucket().then(function (response) {
                $scope.songs = response.songs;
                hideLoader();
            });
        }


        $scope.handleFileCompleted = function () {
            $scope.removeSong();
            $scope.currentSongIndex++;
           // $scope.currentSongPlayingObject = undefined;
            $scope.playGenre($scope.currentGenre.id - 1);
        }

        $scope.openPricesTable = function () {
            $("#pricesTable").modal('show');
        }

        //---------------------------------- Player ------------------------------------------------------------

        $scope.playGenre = function (index, pause) {
            if (pause === true) {
                $scope.pauseGenre(index);
                return;
            }
            var songsFolder = $scope.songs[index];
            if ($scope.currentSongPlayingObject != undefined) $scope.currentSongPlayingObject.pause(true);
            $scope.showPause = true;
            if ($scope.currentGenre === $scope.genres[index]) {
                if ($scope.currentSongPlayingObject != undefined) {
                    $scope.currentSongPlayingObject.play();
                } else if ($scope.songs[index][$scope.currentSongIndex] != undefined) {
                    $scope.currentSongPlayingObject = new Audio(songsFolder[$scope.currentSongIndex].SongUrl);
                    $scope.currentSongPlayingObject.onended = $scope.handleFileCompleted;
                    $scope.currentSongPlayingObject.play();
                } else {
                    $scope.currentGenre = {}
                    $scope.currentSongIndex = 0;
                    $scope.$apply();
                }

            } else {
                $scope.currentGenre = $scope.genres[index];
                $scope.currentSongIndex = 0;
                $scope.currentSongPlayingObject = new Audio(songsFolder[$scope.currentSongIndex].SongUrl);
                $scope.currentSongPlayingObject.onended =  $scope.handleFileCompleted;
                $scope.currentSongPlayingObject.play();
            }

        }


        $scope.pauseGenre = function () {
            if ($scope.currentSongPlayingObject != undefined) {
                $scope.currentSongPlayingObject.pause(true);
                $scope.showPause = false;
            }

        }

        $scope.removeSong = function() {
            $scope.currentSongPlayingObject.pause();
            delete $scope.currentSongPlayingObject;
            $($scope.currentSongPlayingObject).remove();
            $scope.currentSongPlayingObject = undefined;
        }

        //-----------------------------------Buttons------------------------------------------------------------------

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
            //if ($("#ng-view .businessMusic")[0] != undefined) $("#ng-view .businessMusic")[0].style.marginTop = "9%";
        }


        $scope.pricesTable = [];

        $scope.getPriceList = function () {
            songsService.getPriceList().success(function (response) {
                $scope.pricesTable = response;
            });
        }

        $scope.goToSignUp = function (itemId) {
            $("#pricesTable").modal('hide');
            if (!$scope.logedIn) window.location.href = "#signup/" + itemId;
            else window.location.href = "#account";
        }

        createjs.Sound.on("fileload", $scope.handleFileLoad);

        $scope.changeBg($location.path());
        //  $scope.getSongsFromBucket();
        // $scope.getPriceList();
    })
