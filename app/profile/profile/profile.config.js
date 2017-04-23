(function () {
    "use strict";
    function routeConfigurator($stateProvider) {
        $stateProvider
            .state("master.gbs.profile.userProfile.View", {
                url: "/profile",
                templateUrl: "app/profile/profile/profile.tmpl.html?v=3.10",
                controller: "profileController",
                controllerAs: "vm",
                resolve: {
                    tabTitle: function (hotelService, $cookies) {
                        hotelService.GetTextMessagesAsString($cookies.get("lang"), "Profile").then(function (response) {
                            window.document.title = response;
                        });
                    }
                },
            });
    }

    angular
     .module("profileView")

 // Configure the routes and route resolvers
     .config(routeConfigurator);

    routeConfigurator.$inject = ["$stateProvider"];
})();