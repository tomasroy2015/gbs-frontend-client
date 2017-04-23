(function () {
    "use strict";
    function routeConfigurator($stateProvider) {
        $stateProvider
            .state("master.gbs.aboutus", {
                url: "/aboutus",
                templateUrl: "app/aboutus/aboutus.tmpl.html?v=3.10",
                controller: "aboutusController",
                controllerAs: "vm",
                resolve: {
                    tabTitle: function (hotelService, $cookies) {
                        hotelService.GetTextMessagesAsString($cookies.get("lang"), "Aboutus").then(function (response) {
                            window.document.title = response;
                        });
                    }
                },
            });
    }

    angular
     .module("aboutus")
     .config(routeConfigurator);
})();