angular.module('music4BizApp')
    .controller('recommendationsCtrl', function ($scope, $filter, $location, recommendationsService) {

        // ---------------------------- scope variables ----------------------

        $scope.nicknames = [];
        $scope.genres = [];
        $scope.atmospheres = [];
        $scope.bpms = [];
        $scope.recommendationName = "";
        $scope.recommendations = [];
        $scope.recommendationId = null;
        $scope.songsByRecommendation = [];
        $scope.songsPositions = [];
        $scope.songNewIndex = null;
        $scope.songToChangePosition = null;
        $scope.songsPositionEdit = false;
        $scope.downloadSelected = false;
        $scope.recommendationToDownload = -1;
        //filter
        $scope.filter = {};
        $scope.filter.keyword = "";
        $scope.filterOrdered = {};
        $scope.filterOrdered.keyword = "";
        $scope.filteredSongsPositions = $scope.songsPositions;

        //sortable
        $scope.sortableRecom = [];

        $scope.sortableRecom = {
            stop: function (e, ui) {
                for (var i = 0; i < $scope.recommendations.length; i++) {
                    $scope.recommendations[i].Order = i + 1;
                }
                recommendationsService.saveReommendationsOrder($scope.recommendations).success(function() {
                    getCookieMessages();
                });
            }
        };

        // -------------------------- filter functions --------------------------

        $scope.filterOrderedChange = function () {
            $scope.filteredSongsPositions = $filter('filter')($scope.songsPositions, $scope.filterOrderedFunction);
        };


        $scope.filterFunction = function (element) {
            if (element.FullName.toLowerCase().indexOf($scope.filter.keyword.toLowerCase()) === -1) {
                return false;
            }
            return true;
        };
        $scope.filterOrderedFunction = function (element) {
            if (element.FullName.toLowerCase().indexOf($scope.filterOrdered.keyword.toLowerCase()) === -1) {
                return false;
            }
            return true;
        }
        // ----------------------------get functions ----------------------------

        $scope.getCreateEditData = function () {
            if (window.location.href.indexOf("SongRecomendationPositions") !== -1) return;
            showLoader();
            recommendationsService.getCreateEditData(($location.search()).id).then(function (response) {
                $scope.atmospheres = response.atmospheres;
                $scope.genres = response.genres;
                $scope.bpms = response.bpms;
                $scope.nicknames = response.nicknames;
                $scope.recommendationName = response.recommendationName;
                hideLoader();
            });
        }

        $scope.getIndexData = function () {
            if (window.location.href.indexOf("SongRecomendationPositions") !== -1) return;
            showLoader();

            recommendationsService.getIndexData().then(function (response) {
                $scope.recommendations = response;
                hideLoader();
            });
        }

        $scope.getSongsByRecommendations = function () {
            if (window.location.href.indexOf("SongRecomendationPositions") === -1) return;
            showLoader();
            var recommendationId = window.location.href.substring(window.location.href.lastIndexOf("/") + 1, window.location.href.length);
            recommendationsService.getSongsByRecommedation(recommendationId).then(function (response) {
                $scope.songsByRecommendation = response.songsWeb;
                $scope.recommendationName = response.recommendationName;
                response.songsWithPosition.forEach(function (song) {
                    if (song.position != null) {
                        $scope.songsPositions.push(song);
                    }
                });
                $scope.songsPositions = $scope.songsPositions.sort(function (a, b) { return a.position - b.position });
                if ($scope.songsPositions.length > 0) {
                    $scope.songsPositionEdit = true;
                }
                hideLoader();
            });

        }

        // ---------------------------functions -----------------------------------

        $scope.SaveRecommendation = function () {
            showLoader();
            recommendationsService.SaveRecommendation(
                $scope.genres,
                $scope.atmospheres,
                $scope.bpms,
                $scope.nicknames,
                $scope.recommendationName, ($location.search()).id).then(function (response) {
                    hideLoader();
                    getCookieMessages();
                    if (response > 0) {
                        window.location.href = "SongRecomendationPositions/" + response;
                    }
                });
        }

        $scope.clearSelection = function () {
            showLoader();
            $scope.genres.forEach(function (item) {
                item.Selected = false;
            });
            $scope.atmospheres.forEach(function (item) {
                item.Selected = false;
            });
            $scope.bpms.forEach(function (item) {
                item.Selected = false;
            });
            hideLoader();
        }

        $scope.deleteRecommendation = function (recomnmendationId) {
            showLoader();
            recommendationsService.deleteRecommendation(recomnmendationId);
        }

        $scope.setRecommendationToDownload = function (recomnmendationId) {
            $scope.recommendationToDownload = recomnmendationId;
        }

        $scope.downloadFiles = function () {
            $scope.downloadSelected = true;
            recommendationsService.downloadFiles($scope.recommendationToDownload);
        }

        $scope.enableDownload = function () {
            $scope.downloadSelected = false;
        }

        //***************************************song positions*****************************************************

        $scope.removeFromSongsPosition = function (index) {
            var recommendationId = window.location.href.substring(window.location.href.lastIndexOf("/") + 1, window.location.href.length);
            $scope.songsPositions[index].oldPosition = $scope.songsPositions[index].position;
            recommendationsService.deleteSongPosition(recommendationId, $scope.songsPositions[index]);
            $scope.songsPositions.splice(index, 1);
            $scope.filterOrderedChange();
        }

        $scope.addSongToPositionsList = function (song) {
            var recommendationId = window.location.href.substring(window.location.href.lastIndexOf("/") + 1, window.location.href.length);
            var newSong = jQuery.extend(true, {}, song);
            if ($scope.songsPositions.length === 0) {
                newSong.position = 1000;
            } else {
                newSong.position = $scope.songsPositions[$scope.songsPositions.length - 1].position + 1000;
            }

            $scope.songsPositions.push(newSong);
            recommendationsService.createSongPosition(recommendationId, newSong);
        }

        $scope.changeSongPosition = function (indexToChange, songNewIndexStr) {

            if (songNewIndexStr == undefined) return;
            var songNewIndex = parseInt(songNewIndexStr);
            var recommendationId = window.location.href.substring(window.location.href.lastIndexOf("/") + 1, window.location.href.length);
            if (songNewIndex.NaN) return;

            if (songNewIndex >= $scope.songsPositions.length) songNewIndex = $scope.songsPositions.length - 1;
            if (songNewIndex < 0) songNewIndex = 0;
            $scope.songsPositions[indexToChange].oldPosition = $scope.songsPositions[indexToChange].position;
            var position = $scope.songsPositions[indexToChange].position;
            var positionAfter = 0;
            var positionBefore = 0;
            if (indexToChange < songNewIndex) {
                positionBefore = $scope.songsPositions[songNewIndex].position;
                if ($scope.songsPositions[songNewIndex + 1] == undefined) {
                    positionAfter = $scope.songsPositions[songNewIndex].position + 2000;
                } else {
                    positionAfter = $scope.songsPositions[songNewIndex + 1].position;
                }
                position = (positionBefore + positionAfter) / 2;
            }
            else if (indexToChange > songNewIndex) {
                positionAfter = $scope.songsPositions[songNewIndex].position;
                if (songNewIndex - 1 < 0) {
                    positionBefore = 0;
                } else {
                    positionBefore = $scope.songsPositions[songNewIndex - 1].position;
                }

                position = (positionBefore + positionAfter) / 2;
            }


            $scope.songsPositions[indexToChange].position = position;
            recommendationsService.updateSongPosition(recommendationId, $scope.songsPositions[indexToChange]);
            $scope.songsPositions = $scope.songsPositions.sort(function (a, b) { return a.position - b.position });
            $scope.songNewIndex = null;
            $scope.songToChangePosition = -1;

        }

        $scope.saveSongsWithoutPositions = function () {
            showLoader();
            var recommendationId = window.location.href.substring(window.location.href.lastIndexOf("/") + 1, window.location.href.length);

            recommendationsService.saveSongsWithoutPositions(recommendationId).success(function (response) {
                hideLoader();
                getCookieMessages();
                if (response === "true") {
                    window.location.href = "/Recommendations";
                }
            });

        }

        $scope.setSongToChangePosition = function (index) {
            if ($scope.songToChangePosition === index) $scope.songToChangePosition = null;
            else $scope.songToChangePosition = index;
        }



        $scope.$on("hideRecommendationLoader", function () {
            getCookieMessages();
            hideLoader();
            location.replace("/Recommendations/Index");
        });

        $scope.$on("refreshRecommendations", function () {
            $scope.getIndexData();
            hideLoader();
        });

        $scope.getCreateEditData();
        $scope.getIndexData();
        $scope.getSongsByRecommendations();
    });