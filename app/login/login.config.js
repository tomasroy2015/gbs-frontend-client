(function () {
    "use strict";
    function routeConfigurator($stateProvider) {
        $stateProvider
            .state("master.gbs.login", {
                url: "/login",
                templateUrl: "app/Home/home.tmpl.html?v=3.10",
                controller: "homeController",
                controllerAs: "vm"
            });
    }

    angular
    .module("login")
    .config(routeConfigurator);
})();