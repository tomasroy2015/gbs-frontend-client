(function () {
    "use strict";
    function regionService($q, hotelService) {
        var vm = this;

        function getHotelRegions(culture, countryId) {
            return hotelService.getHotelRegions(culture, countryId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getCountryRegions(culture, countryId) {
            return hotelService.getCountryRegions(culture, countryId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getRoutingDetails(HotelId, DestinationName, GuestCountdetails) {
            return hotelService.getRoutingDetails(HotelId, DestinationName, GuestCountdetails).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getRegionTextMessage(culture, messageCode, labelId) {
            return hotelService.getTextMessage(culture, messageCode, labelId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        var service = {
            getHotelRegions: getHotelRegions,
            getCountryRegions:getCountryRegions,
            getRegionTextMessage: getRegionTextMessage,
            getRoutingDetails: getRoutingDetails
        }

        return service;
    }

    angular
    .module("region")
    .service("regionService", regionService);
    regionService.$inject = ["$q", "hotelService"];
})();