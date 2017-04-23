(function () {
    "use strict";
    function footerService(hotelService) {
        var vm = this;

        function sendSubscribe(subscribeData) {
            return hotelService.sendSubscribe(subscribeData).then(function (data) {
            }).catch(function (error) {
                
            });
        }
        function getFooterTextMessage(culture, messageCode, labelId) {
            return hotelService.getTextMessage(culture, messageCode, labelId).then(function (data) {
                return data;
            }).catch(function (error) {
                return error;
            });
        }

        var service = {
            sendSubscribe: sendSubscribe,
            getFooterTextMessage: getFooterTextMessage
        }
        return service;
    }
    angular
    .module("app")
    .service("footerService", footerService);
    footerService.$inject = ["hotelService"];
})();