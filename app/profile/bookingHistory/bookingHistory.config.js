(function () {
    "use strict";
    function routeConfigurator($stateProvider) {
        $stateProvider
            .state("master.gbs.profile.userProfile.profilebookinghistory", {
                url: "/profilebookinghistory",
                templateUrl: "app/profile/bookingHistory/profilebookinghistory.tmpl.html?v=3.10",
                controller: "profileBookingHistoryController",
                controllerAs: "vm",
                resolve: {
                    tabTitle: function (hotelService, $cookies) {
                        hotelService.GetTextMessagesAsString($cookies.get("lang"), "Bookinghistory").then(function (response) {
                            window.document.title = response;
                        });
                    }
                },
            })
    }

    angular
     .module("bookingHistory")

 // Configure the routes and route resolvers
     .config(routeConfigurator);

    routeConfigurator.$inject = ["$stateProvider"];
})();