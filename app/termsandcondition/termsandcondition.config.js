(function () {
    "use strict";
    function routeConfigurator($stateProvider) {
        $stateProvider
            .state("master.gbs.termsandcondition", {
                url: "/termsandcondition",
                templateUrl: "app/termsandcondition/termsandcondition.tmpl.html?v=3.10",
                controller: "termsandconditionController",
                controllerAs: "vm",
                resolve: {
                    tabTitle: function (hotelService, $cookies) {
                        hotelService.GetTextMessagesAsString($cookies.get("lang"), "TermsAndConditions").then(function (response) {
                            window.document.title = response;
                        });
                    }
                },
            });
    }

    angular
     .module("termsandcondition")
     .config(routeConfigurator);
})();