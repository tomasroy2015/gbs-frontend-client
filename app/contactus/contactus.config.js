(function () {
    "use strict";
    function routeConfigurator($stateProvider) {
        $stateProvider
            .state("master.gbs.contactus", {
                url: "/contactus",
                templateUrl: "app/contactus/contactus.tmpl.html?v=3.10",
                controller: "contactusController",
                controllerAs: "vm",
                resolve: {
                    tabTitle: function (hotelService, $cookies) {
                        hotelService.GetTextMessagesAsString($cookies.get("lang"), "ContactUs").then(function (response) {
                            window.document.title = response;
                        });
                    }
                },
            });
    }

    angular
     .module("contactus")

 // Configure the routes and route resolvers
     .config(routeConfigurator);

    //routeConfigurator.$inject = ["$stateProvider"];
})();