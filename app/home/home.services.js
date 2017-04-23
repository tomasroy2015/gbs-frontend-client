(function () {
    "use strict";
    function homeService($q, hotelService) {
        var vm = this;
        function getLatestNews(culture) {
            return hotelService.getLatestNews(culture).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }

        function getPopularHotel(culture, currency) {
            return hotelService.getPopularHotel(culture, currency).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }

        function getRecentHotel(culture, currency) {
            return hotelService.getRecentHotel(culture, currency).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getPopularDestination(culture) {
            return hotelService.getPopularDestination(culture).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getHomeTextMessage(culture, messageCode, labelId) {
            return hotelService.getTextMessage(culture, messageCode, labelId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getWhyGbshotelsText(culture) {
            return hotelService.getWhyGbshotelsText(culture).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getHotelCount() {
            return hotelService.getHotelCount().then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }

        function sendVerificationCode(code) {
            return hotelService.sendVarificationCode(code).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getDestinationSearchResult(culture, keyword, countryId) {
            return getDestinationSearchResult(culture, keyword, countryId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        var service = {
            getLatestNews: getLatestNews,
            getPopularHotel: getPopularHotel,
            getRecentHotel: getRecentHotel,
            getPopularDestination: getPopularDestination,
            getHomeTextMessage: getHomeTextMessage,
            getWhyGbshotelsText: getWhyGbshotelsText,
            getHotelCount: getHotelCount,
            sendVerificationCode: sendVerificationCode,
            getDestinationSearchResult: getDestinationSearchResult,
        }
        return service;

    }

    angular
    .module("home")
    .service("homeService", homeService);
    homeService.$inject = ["$q", "hotelService"];
})();