(function () {
    "use strict";
    function hotelRegionService($q, hotelService) {
        var vm = this;
        function getCity(cityId,culture) {
            return hotelService.getCity(cityId, culture).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getHotels(cityId, culture, currency) {
            return hotelService.getHotels(cityId, culture, currency).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getHotelRegionTextMessage(culture, messageCode, labelId) {
            return hotelService.getTextMessage(culture, messageCode, labelId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getRegions(cityId, culture) {
            return hotelService.getRegions(cityId, culture).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getHotelsLocation(culture, cityId, hotelIds) {
            return hotelService.getHotelsLocation(culture, cityId, hotelIds).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getSearchHotels(search) {
            return hotelService.getSearchHotels(search).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        var service = {
            getCity: getCity,
            getHotels: getHotels,
            getHotelRegionTextMessage: getHotelRegionTextMessage,
            getRegions: getRegions,
            getHotelsLocation: getHotelsLocation,
            getSearchHotels: getSearchHotels
        }

        return service;
    }

    angular
    .module("hotelRegion")
    .service("hotelRegionService", hotelRegionService);
    hotelRegionService.$inject = ["$q", "hotelService"];
})();