(function () {
    "use strict";
    function manageReservationController($state,$uibModalInstance, hotelService, $cookies) {
        var vm = this;
        vm.closePopup = closePopup;
        vm.showReservaion = showReservaion;
        activate();
        function activate() {
        }
        function showReservaion() {
            if (vm.pinCode == null || vm.reservationId == null || vm.reservationId == "" || vm.pinCode == "") {
                toastr.error("ReservationID and PinCode Both Required")
            }
            else {
                hotelService.showReservation(vm.reservationId, vm.pinCode, $cookies.get("lang")).then(function (response) {
                    $uibModalInstance.close();
                    $state.go("master.gbs.manageReservation", { reservationData: response });
                }).catch(function (error) {
                    toastr.error(error.Message);
                });
            }
        }

        function closePopup() {
            $uibModalInstance.close();
        }
    }
    angular
    .module("app")
    .controller("manageReservationController", manageReservationController);
    manageReservationController.$inject = ["$state", "$uibModalInstance", "hotelService", "$cookies"];

})();