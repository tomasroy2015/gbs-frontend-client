(function () {
    "use strict";
    function contactusService($q, hotelService) {
        var vm = this;

        function getContactUsTextMessage(culture, messageCode, labelId) {
            return hotelService.getTextMessage(culture, messageCode, labelId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        
        var service = {
            getContactUsTextMessage: getContactUsTextMessage
        }

        return service;
    }

    angular
    .module("contactus")
    .service("contactusService", contactusService);
    contactusService.$inject = ["$q", "hotelService"];
})();