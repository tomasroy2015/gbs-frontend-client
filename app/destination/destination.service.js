(function () {
    "use strict";
    function destinationService($q, hotelService) {
        var vm = this;

        function getContinentsCountry(culture) {
            return hotelService.getContinentsCountry(culture).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getContinents(culture) {
            return hotelService.getContinents(culture).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getCountryWithContinents(culture, continetId) {
            return hotelService.getCountryWithContinents(culture, continetId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        var service = {
            getContinentsCountry: getContinentsCountry,
            getContinents: getContinents,
            getCountryWithContinents: getCountryWithContinents
        }

        return service;
    }

    angular
    .module("destination")
    .service("destinationService", destinationService);
    destinationService.$inject = ["$q", "hotelService"];
})();