(function(){
    "use strict";

    var UserService = function($http){

        var getUserData = function(){

        }

        return {
            getUserData : getUserData
        }
    }



    angular.module('geofeelings').factory("UserService",["$http", UserService]);
})();