(function () {
    "use strict";
    function routeConfigurator($stateProvider) {
        $stateProvider
           .state("master.gbs.profile.userProfile.profilecreditcard", {
               url: "/profilecreditcard",
               templateUrl: "app/profile/manageCard/profilecreditcard.tmpl.html?v=3.10",
               controller: "profileCreditCardController",
               controllerAs: "vm",
               resolve: {
                   tabTitle: function (hotelService, $cookies) {
                       hotelService.GetTextMessagesAsString($cookies.get("lang"), "CreditCardInfo").then(function (response) {
                           window.document.title = response;
                       });
                   }
               }
           });
    }

    angular
     .module("manageCard")

 // Configure the routes and route resolvers
     .config(routeConfigurator);

    routeConfigurator.$inject = ["$stateProvider"];
})();