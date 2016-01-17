(function () {

    var StatusController = function ($scope) {
        var vm = this;

        vm.status = {};

        return {};
    };

    angular.module("geofeelings")
        .controller("StatusController", ["$scope", StatusController]);

})();