(function () {
    "use strict";
    function routeConfigurator($stateProvider) {
        $stateProvider
            .state("master.gbs.profile.userProfile.profilemywishlist", {
                url: "/profilemywishlist",
                templateUrl: "app/profile/myWishList/profilemywishlist.tmpl.html?v=3.10",
                controller: "profileMyWishlistController",
                controllerAs: "vm",
                resolve: {
                    tabTitle: function (hotelService, $cookies) {
                        hotelService.GetTextMessagesAsString($cookies.get("lang"), "Mywishlists").then(function (response) {
                            window.document.title = response;
                        });
                    }
                }
            });
    }

    angular
     .module("mywishList")

 // Configure the routes and route resolvers
     .config(routeConfigurator);

    routeConfigurator.$inject = ["$stateProvider"];
})();