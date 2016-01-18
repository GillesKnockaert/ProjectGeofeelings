/**
 * Created by gilles on 18-Jan-16.
 */
(function () {
    "use strict";

    var DashboardController = function ($scope, $rootScope, userService) {
        var vm = this;

        $rootScope.$on('login', function (e, userId) {
            //user has logged in --> fetch data
            userService.getAllUserData(userId).then(onDataDownloaded, onDataDownloadError);
        });

        var onDataDownloaded = function(data){
            vm.user = data;
        };

        var onDataDownloadError = function(error){
            console.log(error);
        };

        return {};
    };


    angular.module("geofeelings")
        .controller("DashboardController", ["$scope", "$rootScope", "UserService", DashboardController]);

})();