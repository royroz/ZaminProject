angular.module('music4BizApp').factory('chartsService', function ($q, $http, $rootScope) {
    return {
        getPublisherBySongChartData: function () {
            var deferred = $q.defer();
            $http.get('/Home/GetPublishersBySongsChartData').then(function (response) {
                deferred.resolve(response.data);
            });
            return deferred.promise;
        },
        getLicenseChartData : function()
        {
            var deferred = $q.defer();
            $http.get('/Home/GetLicenseChartData').then(function (response) {
                deferred.resolve(response.data);
            });
            return deferred.promise;
        },
        getPlayListChartData: function() {
            var deferred = $q.defer();
            $http.get('/Home/GetPlayListChartData').then(function (response) {
                deferred.resolve(response.data);
            });
            return deferred.promise;
        },
        getInitData : function() {
            var deferred = $q.defer();
            $http.get('/Home/GetInitData').then(function (response) {
                deferred.resolve(response.data);
            });
            return deferred.promise;
        },
        sendSongsByPublishersMail : function(emailAddress) {
            $http.post('/Home/MailSongsByPublisherChart', { emailAddress: emailAddress }).success(function(data) {

            });
        },
        sendLicensesMail: function (emailAddress) {
            $http.post('/Home/MailLicensesChart', { emailAddress: emailAddress }).success(function (data) {

            });
        },
        sendPlaylistsMail: function(emailAddress) {
            $http.post('/Home/MailPlayListsChart', { emailAddress: emailAddress }).success(function (data) {

            });
        },
        sendSongsByPerformersMail: function(emailAddress) {
            $http.post('/Home/MailSongsByPerformersChart', { emailAddress: emailAddress }).success(function (data) {

            });
        },
        sendActiveLicensesMail: function(emailAddress) {
            $http.post('/Home/MailActiveLicensesCount', { emailAddress: emailAddress }).success(function (data) {

            });
        },
        sendTrialLicensesMail: function (emailAddress) {
            $http.post('/Home/MailTrialLicenses', { emailAddress: emailAddress }).success(function (data) {

            });
        },
        sendIncomesMail: function(emailAddress, from, to) {
            $http.post('/Home/MailIncomes', { emailAddress: emailAddress, fromDate: from, toDate: to }).success(function(data) {
                
            });
        },
        getIncomesChartData: function(from, to) {
            return $http({
                method: "GET",
                url: "/Home/GetIncomeChartData",
                params: {fromDate: from, toDate: to}
            });
        }

    }
})