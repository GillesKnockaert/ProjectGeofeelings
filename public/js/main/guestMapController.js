(function () {
    "use strict";

    var GuestMapController = function ($scope, userService) {
        var vm = this;

        var local_icons = {
            happy_icon: {
                iconUrl: '/img/markerHappy.png',
                shadowUrl: '/img/marker-shadow.png',
                iconSize:     [40, 64], // size of the icon
                shadowSize:   [50, 64], // size of the shadow
                iconAnchor:   [20, 64], // point of the icon which will correspond to marker's location
                shadowAnchor: [4, 62],  // the same for the shadow
                popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
            },
            sad_icon:{
                iconUrl: '/img/markerSad.png',
                shadowUrl: '/img/marker-shadow.png',
                iconSize:     [40, 64], // size of the icon
                shadowSize:   [50, 64], // size of the shadow
                iconAnchor:   [20, 64], // point of the icon which will correspond to marker's location
                shadowAnchor: [4, 62],  // the same for the shadow
                popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
            }
        };

        $scope.icons = local_icons;

        angular.extend($scope, {
            defaults: {
                scrollWheelZoom: false
            }
        });

        $scope.markers = {};

        //define mapbox as the map
        $scope.layers = {
            baselayers: {
                mapbox_terrain: {
                    name: 'Mapbox Terrain',
                    url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
                    type: 'xyz',
                    layerOptions: {
                        apikey: 'pk.eyJ1IjoiZ2lsbGVza25vY2thZXJ0IiwiYSI6ImNpamllenNmczAyd2l0aG01bjRnbnpndDAifQ.SFHo6SL-fytksGkN-NvHUQ',
                        mapid: 'gillesknockaert.ongk0729'
                    }
                }
            }
        };

        var onStatusDownloaded = function (status) {

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


        $scope.init = function () {
            userService.getAllStatus().then(onStatusDownloaded, onStatusDownloadError);
        }();


    };


    angular.module("geofeelings")
        .controller("GuestMapController", ["$scope", "UserService", GuestMapController]);

})();