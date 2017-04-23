(function () {
    "use strict";
    function propertyService($q, hotelService) {
        var vm = this;
      
        function getCountry(culture) {
            return hotelService.getCountryForDropdown(culture).then(function (response) {
               return response;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        
        function saveProperty(propertyData) {
            return hotelService.saveProperty(propertyData).then(function (response) {
                return response;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }

        function getIpAddress(culture) {
            return hotelService.getIpAddress().then(function (response) {
                return response;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }

        function getCancelationPolicy(culture) {
           return hotelService.getCancelationPolicy(culture).then(function (response) {
                return response;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }

        var service = {
            getCountry: getCountry,
            saveProperty: saveProperty,
            getCancelationPolicy: getCancelationPolicy,
            getIpAddress: getIpAddress
        }

        return service;
    }

    angular
    .module("property")
    .service("propertyService", propertyService);
    propertyService.$inject = ["$q", "hotelService"];
})();