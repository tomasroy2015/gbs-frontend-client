(function () {
    "use strict";
    function aboutusService($q,hotelService) {
        var vm = this;


        function getAboutUs(culture) {
            return hotelService.getAboutUs(culture).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getAboutUsTextMessage(culture,messageCode,labelId) {
            return hotelService.getTextMessage(culture,messageCode,labelId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        var service = {
            getAboutUs: getAboutUs,
            getAboutUsTextMessage: getAboutUsTextMessage
        }

        return service;
    }

    angular
    .module("aboutus")
    .service("aboutusService", aboutusService);
    aboutusService.$inject = ["$q", "hotelService"];
})();