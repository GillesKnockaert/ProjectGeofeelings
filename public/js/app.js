/**
 * Created by Frederic on 10/12/2015.
 */
(function () {
    var app = angular.module('geofeelings', ['ngRoute','leaflet-directive']);

    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '../partials/index.html'
            })
            .when('/main', {
                templateUrl: '../js/main/main.html'
            })
            .when('/instructions', {
                templateUrl: '../views/instructions.html'
            })
            .when('/register', {
                templateUrl: '../js/register/register.html'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }]);

    app.factory('authInterceptor', function ($rootScope, $q, $window) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($window.sessionStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
                }
                return config;
            },
            response: function (response) {
                if (response.status == 401) {
                    //handle the case where the user is not authenticated
                }
                return response || $q.when(response);
            }
        };
    });

    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    })

}());
