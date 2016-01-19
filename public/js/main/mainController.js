(function () {
    "use strict";

    var MainController = function ($scope, $window, $rootScope, authService, userService) {
        var vm = this;

        vm.newStatus = {
            _creator: "",
            isHappy: '',
            message: '',
            _location: {
                location: {
                    coordinates: []
                },
                name: ''
            }
        };

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

        vm.submitStatus = function () {
            vm.newStatus._location.location.coordinates[0] = mapstatus.getCenter().lng;
            vm.newStatus._location.location.coordinates[1] = mapstatus.getCenter().lat;
            vm.newStatus._creator = authService.getUserId();

            userService.postStatus(vm.newStatus).then(function (response) {
                console.log("success");

                $rootScope.$emit('newStatus');

            }, function (error) {

                console.log("error");
            });

            console.log('submit status');
        };

        vm.logout = function () {
            authService.logout();
            vm.isUserLoggedIn = false;
        };

        vm.loadAllUsers = function () {
            userService.getAllUsers().then(function (response) {
                vm.allUsers = response;
            }, function (error) {
                console.log(error);
            });
        }
    };

    angular.module("geofeelings")
        .controller("MainController", ["$scope", "$window", "$rootScope", "AuthService", "UserService", MainController]);

})();