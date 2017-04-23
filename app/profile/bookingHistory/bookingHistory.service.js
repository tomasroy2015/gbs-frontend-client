(function () {
    "use strict";
    function bookingHistoryService($q,hotelService) {
        var vm = this;

        function getYourReservation(culture, userId) {
            return hotelService.getYourReservation(culture, userId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getBookingHistoryTextMessage(culture, messageCode, labelId) {
            return hotelService.getTextMessage(culture, messageCode, labelId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        var service = {
            getYourReservation: getYourReservation,
            getBookingHistoryTextMessage: getBookingHistoryTextMessage
        }

        return service;
    }

    angular
    .module("bookingHistory")
    .service("bookingHistoryService", bookingHistoryService);
    bookingHistoryService.$inject = ["$q", "hotelService"];
})();