(function () {
    "use strict";
    function myWishlistService($q, hotelService) {
        var vm = this;

        function getMyWishlists(culture, userId) {
            return hotelService.getMyWishlists(culture, userId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function insertIntoWishlist(userId,hotelId) {
            return hotelService.insertIntoWishlist(userId, hotelId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        var service = {
            getMyWishlists: getMyWishlists,
            insertIntoWishlist: insertIntoWishlist
        }

        return service;
    }

    angular
    .module("mywishList")
    .service("myWishlistService", myWishlistService);
    myWishlistService.$inject = ["$q", "hotelService"];
})();