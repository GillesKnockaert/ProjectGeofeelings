(function () {

    var StatusController = function ($scope) {
        var vm = this;

        vm.status = {
            mood : "happy",
            message: "",
            location: ""
        };

        return {};
    };

    angular.module("geofeelings")
        .controller("StatusController", ["$scope", StatusController]);

})();