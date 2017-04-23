(function () {
    "use strict";
    function manageCardService($q, $cookies, hotelService) {
        var vm = this;

        function saveCreditCard(cardDetails) {
            return hotelService.saveCrediCard(cardDetails).then(function (response) {
                return response;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getUserCreditCard(culture, userId) {
            return hotelService.getUserCreditCard(culture, userId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getCreditCardTextMessage(culture, messageCode, labelId) {
            return hotelService.getTextMessage(culture, messageCode, labelId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }

        function updateCard(cardDetail) {
            return hotelService.updateCard(cardDetail).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }

        function removeCard(cardId) {
            return hotelService.removeCard(cardId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }

        var service = {
            saveCreditCard: saveCreditCard,
            getUserCreditCard: getUserCreditCard,
            getCreditCardTextMessage: getCreditCardTextMessage,
            updateCard: updateCard,
            removeCard: removeCard
        }

        return service;
    }

    angular
    .module("manageCard")
    .service("manageCardService", manageCardService);
    manageCardService.$inject = ["$q", "$cookies", "hotelService"];
})();