(function () {
    "use strict";
    function termsandconditionService($q, hotelService) {
        var vm = this;


        function getTermsCondition(culture) {
            return hotelService.getTermsCondition(culture).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }

        function getTeamConditionTextMessage(culture, messageCode, labelId) {
            return hotelService.getTextMessage(culture, messageCode, labelId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        var service = {
            getTermsCondition: getTermsCondition,
            getTeamConditionTextMessage: getTeamConditionTextMessage
        }

        return service;
    }

    angular
    .module("termsandcondition")
    .service("termsandconditionService", termsandconditionService);
    termsandconditionService.$inject = ["$q", "hotelService"];
})();