(function () {
    "use strict";
    function routeConfigurator($stateProvider) {
        $stateProvider
            .state("master.gbs.region", {
                url: "/region?regionId",
                templateUrl: "app/region/region.tmpl.html?v=3.10",
                controller: "regionController",
                controllerAs: "vm"
            }).state("master.gbs.hotelCountry", {
                url: "/region?regionId",
                templateUrl: "app/region/region.tmpl.html?v=3.10",
                controller: "regionController",
                controllerAs: "vm"
            });
    }

    angular
     .module("region")

 // Configure the routes and route resolvers
     .config(routeConfigurator);

    //routeConfigurator.$inject = ["$stateProvider"];
})();