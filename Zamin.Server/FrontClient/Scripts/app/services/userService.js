angular.module('music4BizWebsite').factory('userService', function ($q, $http, consts) {
    return {
        isLogedIn: function () {
            var deferred = $q.defer();
            $.ajax({
                url: consts.serverUrl + 'Website/IsLogedIn',
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true
            }).done(function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        },
        login: function (userName, password, rememberMe) {
            var deferred = $q.defer();
            $.ajax({
                type: "POST",
                url: consts.serverUrl + 'Website/Login',
                xhrFields: {
                    withCredentials: true
                },
                data: { userName: userName, password: password, rememberMe: rememberMe },
                crossDomain: true
            }).done(function (response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        },
        logOut: function () {
            $.ajax({
                url: consts.serverUrl + 'Website/LogOut',
                xhrFields: {
                    withCredentials: true
                }
            });
        },
        forgotPassword: function (email, location) {
            var deferred = $q.defer();
            $http.post(consts.serverUrl + 'Website/ForgotPassword', { email: email, location: location }).then(function (response) {
                deferred.resolve(response.data);
            });
            return deferred.promise;
        },
        contactUsRequest: function (contactUs) {
            var deferred = $q.defer();
            $http.post(consts.serverUrl + 'Website/ContactUs', { name: contactUs.name, email: contactUs.email, text: contactUs.text }).then(function (response) {
                deferred.resolve(response.data);
            });
            return deferred.promise;
        },
        resetPassword: function (resetCode, password) {
            var deferred = $q.defer();
            $http.post(consts.serverUrl + 'Website/ResetUserPassword', { resetCode: resetCode, password: password }).then(function (response) {
                deferred.resolve(response.data);
            });
            return deferred.promise;
        },
        checkIfCodeExists: function (resetCode) {
            var deferred = $q.defer();
            $http.get(consts.serverUrl + 'Website/CheckIfResetCodeExists?resetCode=' + resetCode).then(function (response) {
                deferred.resolve(response.data);
            });
            return deferred.promise;
        }
    };
});