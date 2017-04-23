(function () {
    "use strict";
    function routeConfigurator($stateProvider) {
        $stateProvider
            .state("master.gbs.hotelRegion", {
                url: "/hotelRegion?cityId&city",
                templateUrl: "app/hotelRegion/hotelRegion.tmpl.html?v=3.10",
                controller: "hotelRegionController",
                controllerAs: "vm",
                resolve: {
                    tabTitle: function (hotelService, $cookies) {
                        hotelService.GetTextMessagesAsString($cookies.get("lang"), "City").then(function (response) {
                            window.document.title = response;
                        });
                    }
                },
            });
    }

    angular
     .module("hotelRegion")
     .config(routeConfigurator);
})();