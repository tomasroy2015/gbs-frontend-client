(function () {
    "use strict";
    function searchHotelService($q, hotelService) {
        var vm = this;

        function getRegionsSearch(culture, regionId) {
            return hotelService.getRegionsSearch(culture, regionId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getHotelsLocation(culture, regionId,hids) {
            return hotelService.getHotelsLocation(culture, regionId, hids).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getRecentlyviewdHotels(culture, userId) {
            return hotelService.getRecentlyviewdHotels(culture, userId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function DeleteMyViewedHotels(Id, userId) {
            return hotelService.DeleteMyViewedHotels(Id, userId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getSearchHotelTextMessage(culture, messageCode, labelId) {
            return hotelService.getTextMessage(culture, messageCode, labelId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getPropertyClass(culture) {
            return hotelService.getPropertyClass(culture).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getPropertyType(culture) {
            return hotelService.getPropertyType(culture).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getPropertyFacilities(culture) {
            return hotelService.getPropertyFacilities(culture).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getSortValues(culture) {
            return hotelService.getSortValues(culture).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getDestinationSearchResultById(culture, regionId, regionName) {
            return hotelService.getDestinationSearchResultById(culture, regionId, regionName).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getFeaturedHotelSearch(currentCurrency, culture, regionId, checkInDate, checkOutDate, roomCount, adultcount, childrenCount, pageSize, pageIndex) {
            return hotelService.getFeaturedHotelSearch(currentCurrency, culture, regionId, checkInDate, checkOutDate, roomCount, adultcount, childrenCount, pageSize, pageIndex).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getPropertyRegion(cultureId, regionId) {
            return hotelService.getPropertyRegion(cultureId, regionId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function filterHotelDetails(currentCurrency, culture, typeHotelClass, typeHotel, typeFacilities, typeRegion, currencyId,
            startBudgetValue, endBudgetValue, selectedSortValue, checkInDate, checkOutDate, regionID, pageSize, pageIndex, roomCount, adultcount, childrencount) {

            return hotelService.filterHotelDetails(currentCurrency, culture, typeHotelClass, typeHotel, typeFacilities, typeRegion, currencyId,
            startBudgetValue, endBudgetValue, selectedSortValue, checkInDate, checkOutDate, regionID, pageSize, pageIndex, roomCount, adultcount, childrencount).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        var service = {
            getHotelsLocation:getHotelsLocation,
            getRegionsSearch:getRegionsSearch,
            getPropertyFacilities:getPropertyFacilities,
            getFeaturedHotelSearch:getFeaturedHotelSearch,
            getRecentlyviewdHotels: getRecentlyviewdHotels,
            DeleteMyViewedHotels: DeleteMyViewedHotels,
            getSearchHotelTextMessage: getSearchHotelTextMessage,
            getPropertyClass: getPropertyClass,
            getPropertyType: getPropertyType,
            getSortValues: getSortValues,
            getPropertyRegion:getPropertyRegion,
            filterHotelDetails: filterHotelDetails,
            getDestinationSearchResultById: getDestinationSearchResultById
        }

        return service;
    }

    angular
    .module("searchHotel")
    .service("searchHotelService", searchHotelService);
    searchHotelService.$inject = ["$q", "hotelService"];
})();