(function (app) {
    'use strict';

    app.controller('UserController', function ($scope, $http, $window) {
        $scope.user = {
            name: 'john.doe',
            password: 'foobar'
        };

        $scope.message = '';
        $scope.submit = function () {
            $http
                .post('/api/authenticate', $scope.user)
                .success(function (data, status, headers, config) {
                    $window.sessionStorage.token = data.token;
                    $scope.message = 'Welcome';
                })
                .error(function (data, status, headers, config) {
                    //Erase the token if the user fails to log in
                    delete $window.sessionStorage.token;

                    //handle login errors here
                    $scope.message = 'Error: Invalid user or password';
                });


        }

        $scope.getUsers = function () {
            $http
                .get('/api/users', {
                    headers: {'x-access-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NjdlZTQ0MTc4NjgwMGNjMjNhOGJkMzIiLCJuYW1lIjoiRnJlZGVyaWMiLCJlbWFpbCI6ImZyZWRlcmljQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA1JG9Wa3cwajR0QWJiT3pPTGZNUE5TbmU5MjE0U2VqRUFmODNNSXN4eTlJbFplQ0hhc0NlQ2hhIiwiX192IjowLCJjb25uZWN0aW9ucyI6WyI1NjdmOTk4Mjc5Y2I2ZWQwMTE2MDNkMGYiXSwic3RhdHVzIjpbIjU2N2VlNDkzNzg2ODAwY2MyM2E4YmQzMyJdLCJjcmVhdGVkT24iOiIyMDE1LTEyLTI2VDE5OjAwOjE2LjI0OFoifQ.C5uNSi-M5mHY55B-Ea9RYUZr2vAwGdj_Eic4OnCo4-A'}
                })
                .success(function (data, status, headers, config) {
                    $scope.message = data;
                });

        }
    });

})(angular.module('geofeelings'));

