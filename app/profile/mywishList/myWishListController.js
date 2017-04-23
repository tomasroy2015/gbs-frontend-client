(function () {
    "use strict";
    function profileMyWishlistController($rootScope, $uibModal, $cookies, myWishlistService) {
        var vm = this;
        vm.remove = Remove
        activate();
        function activate() {
            var culture = $cookies.get("lang");
            getMyWishlists(culture, $cookies.get("userId"));
        }
        function getMyWishlists(culture, userId) {
            myWishlistService.getMyWishlists(culture, userId).then(function (response) {
                vm.mywishlist = response;
            }).catch(function (error) {

            })
        }



        function Remove(hotelId,name) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: "app/common/confirmDialogue/confirm.popup.tmpl.html?v=3.10",
                controller: 'confirmPopupController',
                controllerAs: "vm"
            });
            modalInstance.Message = name + " Will be Removed From WishList";

            modalInstance.result.then(function (data) {
                myWishlistService.insertIntoWishlist($cookies.get("userId"), hotelId).then(function (response) {
                    if (response == "Remove") {
                        vm.status = response;
                        getMyWishlists($cookies.get("lang"), $cookies.get("userId"));
                    }
                }).catch(function (error) {

                })
            })
        }
    }

    angular
    .module("mywishList")
    .controller("profileMyWishlistController", profileMyWishlistController)
    profileMyWishlistController.$inject = ["$rootScope", "$uibModal", "$cookies", "myWishlistService"];

})();