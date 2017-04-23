(function () {
    "use strict";
    function routeConfigurator($stateProvider) {

        $stateProvider
        .state("master.gbs.profile", {
            abstract: true,
            templateUrl: "app/profile/userprofileconfig/userProfileAllState.tmpl.html?v=3.10",
            controller: "userProfileAllStateController",
            controllerAs: "vm",
            resolve: {
                isLoggedIn: function ($q,$cookies) {
                    var username = $cookies.get("username");
                    var userId = $cookies.get("userId");
                    if (username === null || username === undefined || username === "" || userId === "" || userId === undefined || userId === null)
                    {
                        toastr.error("you are not allowed to view this");
                        return $q.reject();
                    }
                }

            }
        })
        .state("master.gbs.profile.userProfile", {
            abstract: true,
            views: {
                "UserSidebarView": {
                    templateUrl: "app/profile/userprofileconfig/userSidebar.tmpl.html?v=3.10",
                    controller: "userProfileSidebarController",
                    controllerAs: "vm"
                },
                "UserContentView": {
                    templateUrl: "app/profile/userprofileconfig/userContainer.tmpl.html?v=3.10"
                }
            },
           
        });
    }

    angular
     .module("profile")

 // Configure the routes and route resolvers
     .config(routeConfigurator);

    routeConfigurator.$inject = ["$stateProvider"];
})();