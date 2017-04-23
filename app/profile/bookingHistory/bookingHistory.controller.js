(function () {
    "use strict";
    function profileBookingHistoryController($rootScope, $cookies, $state, bookingHistoryService, gbsHotelConfig, hotelService) {
        var vm = this;
        activate();
        vm.manageReservation = manageReservation;
        function activate() {
            gbsHotelConfig.setTitle("Booking History");
            var culture = $cookies.get("lang");
            getYourReservation(culture, $cookies.get("userId"));

            var arrId = "lblNoRecordFoundMessage,lblAll,lblPending,lblComplete,lblCancelled,lblReservationID1,lblProperty1,lblPinCode1,lblReservationDate1,lblCheckInDate1,lblCheckOutDate1,lblPayableAmount1,lblStatus1,lbloperations1";
            var arrMessageCode = "NoRecordFoundMessage,All,Pending,Complete,Cancelled,ReservationID,Property,PinCode,ReservationDate,CheckInDate,CheckOutDate,PayableAmount,Status,Operation";
            getBookingHistoryTextMessage(culture, arrMessageCode, arrId);
        }
        function getYourReservation(culture, userId) {
            bookingHistoryService.getYourReservation(culture, userId).then(function (response) {
                vm.bookingHistory = response;
            }).catch(function (error) {

            })
        }

        function manageReservation(id,pinCode) {
            hotelService.showReservation(id, pinCode, $cookies.get("lang")).then(function (response) {
                $state.go("master.gbs.manageReservation", {
                    "rid": id, "pc": pinCode, "cid": $cookies.get("lang")
                });
            }).catch(function (error) {
                toastr.error(error.Message);
            });
        }

        function getBookingHistoryTextMessage(culture, messageCode, labelId) {
            bookingHistoryService.getBookingHistoryTextMessage(culture, messageCode, labelId).then(function (response) {
                vm.bookinglabel = response;
            }).catch(function (error) {
            });
        }
    }
    angular
    .module("bookingHistory")
    .controller("profileBookingHistoryController", profileBookingHistoryController)
    profileBookingHistoryController.$inject = ["$rootScope", "$cookies", "$state", "bookingHistoryService", "gbsHotelConfig", "hotelService"];
})();