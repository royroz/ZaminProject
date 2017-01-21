angular.module('music4BizApp')
    .controller('genresCtrl', function ($scope, $filter, genresService) {

        // ---------------------------- scope variables ----------------------
        $scope.genres = [];
        $scope.newGenreName = "";
        $scope.filter = {};
        $scope.filter.keyword = "";
        $scope.orderDescending = true;
        $scope.LargeImageFile = null;
    $scope.SmallImageFile = null;

        //-----------------------------filter --------------------------------

        $scope.filterChange = function () {
            $scope.filteredItems = $filter('filter')($scope.genres, $scope.filterFunction);
        };

        $scope.filterFunction = function (element) {
            if (element.Name.toLowerCase().indexOf($scope.filter.keyword.toLowerCase()) === -1) {
                return false;
            }
            return true;
        };
        $scope.orderList = function () {
            var orderedGenres = [];
            if ($scope.orderDescending === true) {
                orderedGenres = $filter('orderBy')($scope.genres, 'Name', true);
                $scope.orderDescending = false;
            }
            else if ($scope.orderDescending === false) {
                orderedGenres = $filter('orderBy')($scope.genres, 'Name');
                $scope.orderDescending = true;
            }
            $scope.genres = orderedGenres;
        };

        // ---------------------------- functions ----------------------------

        $scope.getAllGenres = function () {
            genresService.getAllGenres().then(function(response) {
                $scope.genres = response;
            });
        }
        $scope.EditGenre = function(genre) {
            genresService.editGenre(genre);
        }
        $scope.addGenre = function () {
            genresService.addGenre($scope.newGenreName, $scope.LargeImageFile, $scope.SmallImageFile);
        };

        $scope.removeGenre = function (genre) {
            genresService.removeGenre(genre);
        };


        $scope.$on('refreshGenres', function () {
            $scope.newGenreName = "";
            $scope.getAllGenres();
        });


        // ---------------------------- flow start ---------------------------
        $scope.getAllGenres();

    });