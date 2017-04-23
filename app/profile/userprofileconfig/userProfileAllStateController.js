(function () {
    "use strict";
    function userProfileAllStateController($scope, $cookies, userProfileSidebarController, gbsHotelConfig) {
        var vm = this;
        vm.title = "Overview";
        activate();
        function activate() {

            $scope.$on('changeProfileTitle', function (event, arg) {
                vm.title = arg;
            });
        }
    }
    angular
    .module("profile")
    .controller("userProfileAllStateController", userProfileAllStateController);
    userProfileAllStateController.$inject = ["$scope", "$cookies", "profileService", "gbsHotelConfig"];

})();