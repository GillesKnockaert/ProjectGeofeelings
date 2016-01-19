/**
 * Created by gilles on 18-Jan-16.
 */
(function () {
    "use strict";

    var DashboardController = function ($scope, $rootScope, userService) {
        /*
        var vm = this;

        vm.markers = {};
        vm.user = {};

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

        vm.arrStatus = [];


        var onStatusDownloaded = function (status) {

            loadMarkersFromStatus(status);


            status.forEach(function (status) {

                var lat = status.location.latitude;
                var lng = status.location.longitude;

                var htmlBuilder = "<ul>";
                htmlBuilder += "<li>"+ status.location.name +"</li>";
                htmlBuilder += "<li>"+ status.message +"</li>";
                htmlBuilder += "<li>"+ status.createdOn +"</li>";
                htmlBuilder += "</ul>";


                $scope.markers[status.location.id] = {
                    lat: parseFloat(lat),
                    lng: parseFloat(lng),
                    icon: status.isHappy? local_icons.happy_icon : local_icons.sad_icon,
                    message: htmlBuilder
                };
            });

        };

        var onStatusDownloadError = function (error) {
            console.log(error);
        };


        var loadMarkersFromStatus = function(arrStatus){
            //huidige markers leegmaken
            vm.markers = {};

            arrStatus.forEach(function (status) {

                var lat = status.location.latitude;
                var lng = status.location.longitude;

                var htmlBuilder = "<ul>";
                htmlBuilder += "<li>"+ status.location.name +"</li>";
                htmlBuilder += "<li>"+ status.message +"</li>";
                htmlBuilder += "<li>"+ status.createdOn +"</li>";
                htmlBuilder += "</ul>";

                //markers opnieuw aanvullen
                vm.markers[status.location.id] = {
                    lat: parseFloat(lat),
                    lng: parseFloat(lng),
                    icon: status.isHappy? local_icons.happy_icon : local_icons.sad_icon,
                    message: htmlBuilder
                };
            });
        };

        userService.getAllStatus().then(onStatusDownloaded, onStatusDownloadError);
        */


    };


    angular.module("geofeelings")
        .controller("DashboardController", ["$scope", "$rootScope", "UserService", DashboardController]);

})();