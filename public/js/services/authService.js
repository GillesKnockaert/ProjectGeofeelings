(function () {
    "use strict";

    var AuthService = function ($window, $http, $rootScope) {

        var logIn = function (userCredentials) {
            var url = "/api/users/login";

            return $http.post(url, userCredentials).then(function (response) {
                $window.sessionStorage.token = response.data.data;
                response.success = true;

                $rootScope.$emit('login', getUserId());

                return response;
            }, function (error) {
                delete $window.sessionStorage.token;
                return error;
            });

        };

        var register = function (userInfo) {
            var url = "/api/users/register";

            return $http.post(url, userInfo).then(function (response) {
                //save token in session storage
                var expToken = response.data.data;
                saveToken(expToken);

                response.success = true;
                return response;
            }, function (error) {
                return error;
            });
        };


        var isLoggedIn = function () {
            //controle of een gebruiker ingelogd is obv sessionStorage
            if (!$window.sessionStorage.token) {
                return false;
            }
            return true;
        };

        var getTokenInfo = function () {
            var expToken = $window.sessionStorage.token;

            var base64Url = expToken.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');

            var tokenPayload = JSON.parse($window.atob(base64));
            return tokenPayload;

        };

        var getUserId = function(){
            var userId;

            var userToken = getTokenInfo();

            userId = userToken._id;

            return userId;
        };


        var saveToken = function (expToken) {
            $window.sessionStorage.token = expToken;
        };

        var removeToken = function () {
            delete $window.sessionStorage.token;
        };

        var logout = function(){
            removeToken();
        };

        return {
            isLoggedIn: isLoggedIn,
            register: register,
            logIn: logIn,
            getTokenInfo: getTokenInfo,
            getUserId : getUserId,
            logout: logout
        };
    };


    angular.module("geofeelings").factory("AuthService", ["$window", "$http","$rootScope", AuthService]);
})();