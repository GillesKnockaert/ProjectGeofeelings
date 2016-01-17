(function () {
    "use strict";

    var MainController = function ($scope, $window, authService) {
        var vm = this;

        vm.userCredentials = {
            name: '',
            password: ''
        };

        vm.userRegistration = {
            name: '',
            password: '',
            isContactable: ''
        };

        vm.isUserLoggedIn = authService.isLoggedIn();


        if (vm.isUserLoggedIn) {
            //when user is logged in --> fetch his data from the api

        }

        vm.logIn = function () {
            authService.logIn(vm.userCredentials).then(function (response) {
                if (response.success) {
                    console.log('successful login');
                    //user info uit token ophalen
                    vm.user = authService.getTokenInfo();
                    vm.isUserLoggedIn = true;
                    //$window.location.href = '/main';

                } else {
                    console.log('Error login');
                }
            });
        };

        vm.register = function () {
            authService.register(vm.userRegistration).then(function (response) {
                if (response.success) {
                    console.log('Successful registration');

                    //user info uit token ophalen
                    vm.user = authService.getTokenInfo();
                    vm.isUserLoggedIn = true;

                    //$window.location.href = '/main.html';

                } else {
                    console.log('Error registration');
                }
            });
        };
    };

    angular.module("geofeelings")
        .controller("MainController", ["$scope", "$window", "AuthService", MainController]);

})();