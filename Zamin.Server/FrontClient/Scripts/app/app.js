var app = angular.module('zamin', ['ngRoute']);
app.constant("consts", {
    //production
    //serverUrl: 'http://admin.music4.biz/'
    //dev
   // serverUrl: 'http://music4biz/'
    serverUrl: 'http://zamin/'
});
app.config([
    '$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'Partials/home.html',
                controller: 'homeCtrl'
            })
            .when('/home/:resetPasswordRequest', {
                templateUrl: 'Partials/home.html',
                controller: 'userCtrl'
            })
            .when('/libraries', {
                templateUrl: 'Partials/libraries.html',
                controller: 'librariesCtrl'
            })
            .when('/portfolio', {
                templateUrl: 'Partials/portfolio.html',
                controller: 'portfolioCtrl'
            })
            .when('/businessMusic', {
                templateUrl: 'Partials/businessMusic.html',
                controller: 'songsCtrl'
            })
            .when('/account', {
                templateUrl: 'Partials/account.html',
                controller: 'accountCtrl'
            })
            .when('/signup/:priceItemId?', {
                templateUrl: 'Partials/signup.html',
                controller: 'accountCtrl'
            })
            .when('/resetPassword/:resetCode', {
                templateUrl: 'Partials/resetPassword.html',
                controller: 'userCtrl'
            })
            .when('/packages', {
                templateUrl: 'Partials/packages.html',
                controller: 'licenseCtrl'
            })
            .when('/licenseUpgrade/:LicenseSalesForceId', {
                templateUrl: 'Partials/licenseUpgrade.html',
                controller: 'licenseCtrl'
            })
            .when('/licenseExtension/:LicenseSalesForceId', {
                templateUrl: 'Partials/licenseExtension.html',
                controller: 'licenseCtrl'
            })
            .when('/tranzilaPayment/:sum/:priceListItem?/:nickname?/:isDiskOnKey?', {
                templateUrl: 'Partials/tranzilaPayment.html',
                controller: 'licenseCtrl'
            })
            .when('/resetPassword', {
                templateUrl: 'Partials/resetPassword.html',
                controller: 'userCtrl'
            })
            .when('/login', {
                templateUrl: 'Partials/login.html',
                controller: 'userCtrl'
            })
            .when('/media', {
                templateUrl: 'Partials/media.html',
                controller: 'mediaCtrl'
            });
    }
]);

function showLoader() {
    $('#loader').show();
}

function hideLoader() {
    $('#loader').hide();
}

var VAT = 1.17;
