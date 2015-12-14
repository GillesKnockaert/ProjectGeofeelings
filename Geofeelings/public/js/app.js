/**
 * Created by Frederic on 10/12/2015.
 */

var app = angular.module('Geofeelings',['ngRoute']);

app.config(function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: '../partials/index.html'
        })
        .when('/instructions',{
            templateUrl: '../partials/instructions.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});