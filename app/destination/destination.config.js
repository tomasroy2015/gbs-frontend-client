(function () {
    "use strict";
    function routeConfigurator($stateProvider) {
        $stateProvider
            .state("master.gbs.destination", {
                url: "/destination",
                templateUrl: "app/destination/destination.tmpl.html?v=3.10",
                controller: "destinationController",
                controllerAs: "vm",
                resolve: {
                    tabTitle: function (hotelService, $cookies) {
                        hotelService.GetTextMessagesAsString($cookies.get("lang"), "Destinations").then(function (response) {
                            window.document.title = response;
                        });
                    }
                },
                
            });
    }

    angular
     .module("destination")

 // Configure the routes and route resolvers
     .config(routeConfigurator);

    //routeConfigurator.$inject = ["$stateProvider"];
})();