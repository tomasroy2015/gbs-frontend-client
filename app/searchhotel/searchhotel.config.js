(function () {
    "use strict";
    function routeConfigurator($stateProvider) {
        $stateProvider
            .state("master.gbs.searchHotel", {
                url: "/searchHotel?gregionName&gregion&Checkin&Checkout&RoomCount&Adultcount&Childrencount",
                templateUrl: "app/searchhotel/searchhotel.tmpl.html?v=3.10",
                controller: "searchHotelController",
                controllerAs: "vm",
                resolve: {
                    tabTitle: function (hotelService, $cookies) {
                        hotelService.GetTextMessagesAsString($cookies.get("lang"), "SearchResults").then(function (response) {
                            window.document.title = response;
                        });
                    }
                }
            });
    }

    angular
     .module("searchHotel")

 // Configure the routes and route resolvers
     .config(routeConfigurator);

    //routeConfigurator.$inject = ["$stateProvider"];
})();