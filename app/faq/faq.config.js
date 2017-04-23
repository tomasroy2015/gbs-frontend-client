(function () {
    "use strict";
    function routeConfigurator($stateProvider) {
        $stateProvider
            .state("master.gbs.faq", {
                url: "/faq",
                templateUrl: "app/faq/faq.tmpl.html?v=3.10",
                controller: "faqController",
                controllerAs: "vm",
                resolve: {
                    tabTitle: function (hotelService, $cookies) {
                        hotelService.GetTextMessagesAsString($cookies.get("lang"), "FAQ").then(function (response) {
                            window.document.title = response;
                        });
                    }
                },
            });
    }

    angular
     .module("faq")

 // Configure the routes and route resolvers
     .config(routeConfigurator);

    //routeConfigurator.$inject = ["$stateProvider"];
})();