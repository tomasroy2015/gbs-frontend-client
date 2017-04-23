(function () {
    "use strict";
    function topNavigationService($q, hotelService) {
        var vm = this;

        function getCulture() {
            return hotelService.getCulture().then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }

        function getCurrencyLoad(culture) {
            return hotelService.getCurrencyLoad(culture).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function showReservation(reservationId, pinCode, culture) {
            return hotelService.showReservation(reservationId, pinCode, culture).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getMyWishlistsMaster(culture, userId) {
            return hotelService.getMyWishlistsMaster(culture, userId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        var service = {
            getCulture: getCulture,
            getCurrencyLoad: getCurrencyLoad,
            showReservation: showReservation,
            getMyWishlistsMaster: getMyWishlistsMaster
        }
        return service;
    }
    angular
    .module("app")
    .service("topNavigationService", topNavigationService);
    topNavigationService.$inject = ["$q", "hotelService"];
})();