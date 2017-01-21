angular.module('music4BizWebsite')
    .controller('userCtrl', function ($scope, $location, $rootScope, $routeParams, userService, songsService) {

        $scope.userName = "";
        $scope.logedIn = false;

        //login details
        $scope.email = "";
        $scope.password = "";
        $scope.rememberMe = true;

        $scope.contactUs = {name: '', email: ''};

        $scope.forgotPasswordEmail = "";
        $scope.showInvalidUserNameMessage = false;
        $scope.codeExists = "";
        $scope.emailDoesntExists = false;

        $scope.resetPasswordObject = {};
        $scope.wrongResetPassword = false;
        $scope.passwordChanged = false;

        $scope.contactUsThanks = false;

        $scope.songs = [];

        $scope.location = $location.path();
        $scope.$on('$routeChangeStart', function(next, current) {
            $scope.location = $location.path();
        });
        //--------------------------------------login functions-----------------------------------------------
        $scope.isLogedIn = function () {
            showLoader();
            userService.isLogedIn().then(function (response) {
                $scope.logedIn = response.isLogedIn;
                $scope.userName = response.userName;
                hideLoader();
            });
        }

        $scope.getSongsFromBucket = function () {
            showLoader();
            songsService.getSongsFromBucket().then(function (response) {
                $scope.songs = response.songs;
                $scope.songs.forEach(function (songFolders) {
                    songFolders.forEach(function (song) {
                        createjs.Sound.registerSound(song.SongUrl, song.SongUrl);
                    });
                });
                hideLoader();
            });
        }

        $scope.handleFileLoad = function (event) {
            console.log("Preloaded:", event.id, event.src);
            //$scope.play(event.id);
        }


        createjs.Sound.on("fileload", $scope.handleFileLoad);

  //  $scope.getSongsFromBucket();

        $scope.login = function () {
            if ($scope.email === "" || $scope.password === "") {
                return;
            }
            showLoader();
            userService.login($scope.email, $scope.password, $scope.rememberMe).then(function (response) {
                $("#login-modal").modal("hide");
                $scope.logedIn = response.success;
                $scope.userName = response.userName;
                if (!$scope.logedIn) {
                    $scope.showInvalidUserNameMessage = true;
                    $scope.password = "";
                }
                else {
                    $rootScope.$broadcast("userLogedIn", $scope.userName);
                    $location.path("account");
                }
                hideLoader();

            });
        }

        $scope.logOut = function () {
            window.location.href = "#";
            $scope.userName = "";
            $scope.logedIn = false;
            userService.logOut();
            $rootScope.$broadcast("userLogedOut");
        }

        //---------------------------------------Reset Password Functions------------------------------------------------

        $scope.forgotPassword = function () {
            var location = $location.absUrl().substring(0, $location.absUrl().indexOf("#"));

            userService.forgotPassword($scope.forgotPasswordEmail, location).then(function (response) {
                if (response == null || response === "") {
                    $scope.emailDoesntExists = true;
                } else {
                    $scope.forgotPasswordEmail = "";
                    $("#forgot-password-modal").modal('hide');
                }

            });
        }

        $scope.resetPassword = function () {
            if ($scope.resetPasswordObject.password == undefined || $scope.resetPasswordObject.confirmPassword == undefined) {
                return;
            }

            if ($scope.resetPasswordObject.password !== $scope.resetPasswordObject.confirmPassword) {
                $scope.wrongResetPassword = true;
                $scope.resetPasswordObject.confirmPassword = undefined;
                return;
            }
            userService.resetPassword($routeParams.resetCode, $scope.resetPasswordObject.password).then(function (response) {
                if (response === "true") {
                    $scope.passwordChanged = true;
                }
            });


        }
        //----------------------------------------------------------------------------------------------------------------

        $scope.contactUsRequest = function () {
            $scope.contactUsFormSubmitted = true;
            if ($scope.contactUs.name === '' || $scope.contactUs.email === '') {
                return;
            }
            userService.contactUsRequest($scope.contactUs).then(function (response) {
                if (response === "true") {
                    $scope.contactUsThanks = true;
                }
            });
        }

        $scope.forgotPasswordModal = function () {
            $("#login-modal").modal("hide");
            $("#forgot-password-modal").modal("show");
        }


        $scope.loginModal = function() {
            $("#login-modal").modal("show");
        }

        $scope.isActive = function (route) {
            return route === $location.path();
        }

        $scope.checkIfCodeExists = function () {
            // if ($location.path === "resetPassword" && $routeParams.resetCode == undefined) {
            if ($routeParams.resetCode == undefined) {
                return;
            }
            userService.checkIfCodeExists($routeParams.resetCode).then(function (response) {
                $scope.codeExists = response.codeExists;
            });
        }

        $scope.checkIfResetPasswordRequested = function () {
            if ($routeParams.resetPasswordRequest != undefined && $routeParams.resetPasswordRequest === "resetPasswordRequest") {
                $scope.forgotPasswordModal();
            }
        }

        $scope.$on("userSingedUp", function (e, userName) {
            $scope.logedIn = true;
            $scope.userName = userName;
        });


        $scope.$on("userLogedIn", function (e, userName) {
            $scope.logedIn = true;
            $scope.userName = userName;
        });

        $scope.removeBg = function () {
            $("body").removeClass("home-bg");
            $("body").removeClass("lib-bg");
            $("body").removeClass("portfolio-bg");
            $("body").removeClass("businessMusic-bg");
        }

        $scope.removeBg();
        // $scope.isLogedIn();
        $scope.checkIfCodeExists();
        $scope.checkIfResetPasswordRequested();

    });
