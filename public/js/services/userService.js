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

                angular.forEach(rawUser.status, function (status, key) {

                    var newLocation = new Location(
                        status._location.name,
                        status._location.location.coordinates[0],//longitude
                        status._location.location.coordinates[1] //latitude
                    );

                    var newStatus = new Status();
                    newStatus.user = userId;
                    newStatus.mood = status.mood;
                    newStatus.message = status.message;
                    newStatus.createdOn = status.createdOn;
                    newStatus.location = newLocation;

                    userStatus.push(newStatus);
                });

                angular.forEach(rawUser.connections, function(connection,key){
                    //Connection(userId, name)
                    var newConnection = new Connection(
                        connection._id,
                        connection.name
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

            }, function (error) {
                return error;
            });
        };


        return {
            getAllUserData: getAllUserData
        }
    };


    angular.module('geofeelings').factory("UserService", ["$http", UserService]);
})();