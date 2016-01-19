(function () {
    "use strict";

    var UserMapController = function ($scope, $rootScope, userService, authService) {
        var vm = this;

        vm.markers = {};

        var local_icons = {
            happy_icon: {
                iconUrl: '/img/markerHappy.png',
                shadowUrl: '/img/marker-shadow.png',
                iconSize: [40, 64], // size of the icon
                shadowSize: [50, 64], // size of the shadow
                iconAnchor: [20, 64], // point of the icon which will correspond to marker's location
                shadowAnchor: [4, 62],  // the same for the shadow
                popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
            },
            sad_icon: {
                iconUrl: '/img/markerSad.png',
                shadowUrl: '/img/marker-shadow.png',
                iconSize: [40, 64], // size of the icon
                shadowSize: [50, 64], // size of the shadow
                iconAnchor: [20, 64], // point of the icon which will correspond to marker's location
                shadowAnchor: [4, 62],  // the same for the shadow
                popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
            }
        };


        $scope.icons = local_icons;

        var onDataDownloaded = function (data) {
            vm.user = data;
            //vm.loadMarkersFromStatus(vm.user.status); //user status
            //vm.loadMarkersFromConnections(vm.user.connections);
            //vm.loadAllMarkers();
        };

        var onDataDownloadError = function (error) {
            console.log(error);
        };


        $rootScope.$on('login', function (e, userId) {
            //user has logged in --> fetch data
            userService.getAllUserData(userId).then(onDataDownloaded, onDataDownloadError);
        });



        angular.extend($scope, {
            defaults: {
                scrollWheelZoom: false
            }
        });

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

        vm.loadMarkersFromConnections = function(arrConnections){
            vm.markers = {};

            arrConnections.forEach(function(connection){
                connection.status.forEach(function(status){
                    var lat = status.location.latitude;
                    var lng = status.location.longitude;

                    var htmlBuilder = "<ul>";
                    htmlBuilder += "<li>" + status.location.name + "</li>";
                    htmlBuilder += "<li>" + status.message + "</li>";
                    htmlBuilder += "<li>" + status.createdOn + "</li>";
                    htmlBuilder += "</ul>";

                    //markers opnieuw aanvullen
                    vm.markers[status.location.id] = {
                        lat: parseFloat(lat),
                        lng: parseFloat(lng),
                        icon: status.isHappy ? local_icons.happy_icon : local_icons.sad_icon,
                        message: htmlBuilder
                    };
                });
            });
        };

        vm.loadMarkersFromStatus = function (arrStatus) {
            
            //huidige markers leegmaken
            vm.markers = {};

            arrStatus.forEach(function (status) {

                var lat = status.location.latitude;
                var lng = status.location.longitude;

                var htmlBuilder = "<ul>";
                htmlBuilder += "<li>" + status.location.name + "</li>";
                htmlBuilder += "<li>" + status.message + "</li>";
                htmlBuilder += "<li>" + status.createdOn + "</li>";
                htmlBuilder += "</ul>";

                //markers opnieuw aanvullen
                vm.markers[status.location.id] = {
                    lat: parseFloat(lat),
                    lng: parseFloat(lng),
                    icon: status.isHappy ? local_icons.happy_icon : local_icons.sad_icon,
                    message: htmlBuilder
                };
            });
        };

        vm.loadAllMarkers = function(){
            userService.getAllStatus().then(function(data){
                vm.loadMarkersFromStatus(data);
            }, function(error){});
        };
    };


    angular.module("geofeelings")
        .controller("UserMapController", ["$scope", "$rootScope", "UserService", "AuthService", UserMapController]);

})();