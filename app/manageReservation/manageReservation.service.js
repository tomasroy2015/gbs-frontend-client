(function () {
    "use strict";
    function manageReservationService($q, hotelService) {
        var vm = this;


        function writereView(culture) {
            return hotelService.writereView(culture).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getTypeReview(culture) {
            return hotelService.getTypeReview(culture).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getManageReservationTextMessage(culture, messageCode, labelId) {
            return hotelService.getTextMessage(culture, messageCode, labelId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }

        function saveReview(review)
        {
            return hotelService.saveHotelReview(review).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function updatereservationdetails(updateData)
        {
            return hotelService.updatereservationdetails(updateData).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function cancelSelectedItems(updateData)
        {
            return hotelService.cancelSelectedItems(updateData).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        var service = {
            getTypeReview: getTypeReview,
            writereView: writereView,
            getManageReservationTextMessage: getManageReservationTextMessage,
            saveReview: saveReview,
            updatereservationdetails: updatereservationdetails,
            cancelSelectedItems: cancelSelectedItems
        }

        return service;
    }

    angular
    .module("manageReservation")
    .service("manageReservationService", manageReservationService);
    manageReservationService.$inject = ["$q", "hotelService"];
})();