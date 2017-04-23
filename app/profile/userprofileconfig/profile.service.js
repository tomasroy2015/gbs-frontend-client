(function () {
    "use strict";
    function profileService($q, hotelService) {
        var vm = this;

        function getRecentActiveReservation(culture,userId) {
            return hotelService.getRecentActiveReservation(culture,userId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getYourReservation(culture, userId) {
            return hotelService.getYourReservation(culture, userId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getProfileTextMessage(culture, messageCode, labelId) {
            return hotelService.getTextMessage(culture, messageCode, labelId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getUserDashboardDetails(culture, userId) {
            return hotelService.getUserDashboardDetails(culture, userId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        var service = {
            getRecentActiveReservation: getRecentActiveReservation,
            getYourReservation: getYourReservation,
            getProfileTextMessage: getProfileTextMessage,
            getUserDashboardDetails: getUserDashboardDetails
        }
        return service;
    }


  
    angular
    .module("profile")
    .service("profileService", profileService)
    profileService.$inject = ["$q", "hotelService"];
    
})();