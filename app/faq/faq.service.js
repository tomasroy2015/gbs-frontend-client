(function () {
    "use strict";
    function faqService($q, hotelService) {
        var vm = this;


        function getFAQ(culture) {
            return hotelService.getFAQ(culture).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getFAQTextMessage(culture, messageCode, labelId) {
            return hotelService.getTextMessage(culture, messageCode, labelId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        var service = {
            getFAQ: getFAQ,
            getFAQTextMessage: getFAQTextMessage
        }

        return service;
    }

    angular
    .module("faq")
    .service("faqService", faqService);
    faqService.$inject = ["$q", "hotelService"];
})();