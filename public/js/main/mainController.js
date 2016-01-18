(function () {
    "use strict";

    var MainController = function ($scope, $window, $rootScope, authService, userService) {
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


        $rootScope.$on('login', function (e, userId) {
            vm.isUserLoggedIn = true;
            //$window.location.href = '/main';
        });


        vm.logIn = function () {
            authService.logIn(vm.userCredentials).then(function (response) {
                if (response.success) {
                    console.log('successful login');
                    //user info uit token ophalen
                    //vm.user = authService.getTokenInfo();
                    //$window.location.href = '/main';
                    //userService.getAllUserData(vm.user._id);

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
                    //vm.user = authService.getTokenInfo();
                    //vm.isUserLoggedIn = true;

                    //$window.location.href = '/main.html';

                } else {
                    console.log('Error registration');
                }
            });
        };
    };

    angular.module("geofeelings")
        .controller("MainController", ["$scope", "$window", "$rootScope", "AuthService", "UserService", MainController]);

})();