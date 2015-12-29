/**
 * Created by Frederic on 10/12/2015.
 */
(function(){
    var app = angular.module('geofeelings',['ngRoute']);

    app.config(function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: '../partials/index.html'
            })
            .when('/instructions',{
                templateUrl: '../partials/instructions.html'
            })
            .when('/login',{
                templateUrl: '../partials/login.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    });



    app.factory('authInterceptor', function($rootScope, $q, $window){
        return{
            request: function(config){
                config.headers = config.headers || {};
                if($window.sessionStorage.token){
                    config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
                }
                return config;
            },
            response: function(response){
                if(response.status == 401){
                    //handle the case where the user is not authenticated
                }
                return response || $q.when(response);
            }
        };
    });

    app.config(function($httpProvider){
        $httpProvider.interceptors.push('authInterceptor');
    })

}());
