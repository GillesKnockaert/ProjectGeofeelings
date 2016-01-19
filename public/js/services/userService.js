(function () {
    "use strict";

    var UserService = function ($http) {

        var getAllUserData = function (userId) {
            var url = '/api/users/' + userId;

            return $http.get(url).then(function (response) {
                //success
                //return user data
                var rawUser = response.data.data;

                var userStatus = [];
                var userConnections = [];
                var connectionStatus = [];

                angular.forEach(rawUser.status, function (status, key) {
                    //Location(statusId,name,longitude, latitude)
                    var newLocation = new Location(
                        status._location._id,
                        status._location.name,
                        status._location.location.coordinates[0],//longitude
                        status._location.location.coordinates[1] //latitude
                    );

                    var newStatus = new Status();
                    newStatus.user = userId;
                    newStatus.isHappy = status.isHappy;
                    newStatus.message = status.message;
                    newStatus.createdOn = status.createdOn;
                    newStatus.location = newLocation;

                    userStatus.push(newStatus);
                });

                angular.forEach(rawUser.connections, function(connection,key){

                    angular.forEach(connection.status, function(status, key){
                        var newLocation = new Location(
                            status._location._id,
                            status._location.name,
                            status._location.location.coordinates[0],//longitude
                            status._location.location.coordinates[1] //latitude
                        );

                        var newStatus = new Status();
                        newStatus.user = userId;
                        newStatus.isHappy = status.isHappy;
                        newStatus.message = status.message;
                        newStatus.createdOn = status.createdOn;
                        newStatus.location = newLocation;

                        connectionStatus.push(newStatus);
                    });

                    //Connection(userId, name, isContactable, status, createdOn, isAdmin)
                    var newConnection = new Connection(
                        connection._id,
                        connection.name,
                        connection.isContactable,
                        connectionStatus,
                        connection.createdOn,
                        connection.isAdmin
                    );

                    userConnections.push(newConnection);
                });

                //User(name, password, isContactable, connections, status, createdOn, isAdmin)
                var user = new User(
                    rawUser.name,
                    rawUser.password,
                    rawUser.isContactable,
                    userConnections,
                    userStatus,
                    rawUser.createdOn,
                    rawUser.isAdmin
                );

                return user;

            });
        };

        var getAllStatus = function(){
            var url = "/api/status";
            return $http.get(url).then(function (response) {
                //success
                //return user data
                var rawStatus = response.data.data;

                var userStatus = [];

                angular.forEach(rawStatus, function (status, key) {
                    //Location(statusId,name,longitude, latitude)
                    var newLocation = new Location(
                        status._location._id,
                        status._location.name,
                        status._location.location.coordinates[0],//longitude
                        status._location.location.coordinates[1] //latitude
                    );

                    var newStatus = new Status();
                    newStatus.user = status._creator._id;
                    newStatus.isHappy = status.isHappy;
                    newStatus.message = status.message;
                    newStatus.createdOn = status.createdOn;
                    newStatus.location = newLocation;

                    userStatus.push(newStatus);
                });

                return userStatus;

            });

        };


        return {
            getAllUserData: getAllUserData,
            getAllStatus : getAllStatus
        };
    };


    angular.module('geofeelings').factory("UserService", ["$http", UserService]);
})();