(function () {
    "use strict";
    function routeConfigurator($stateProvider) {
        $stateProvider
             .state("master.gbs.profile.userProfile.profilesetting", {
                 url: "/profilesetting",
                 templateUrl: "app/profile/profileSettings/profileSetting.tmpl.html?v=3.10",
                 controller: "profileSettingController",
                 controllerAs: "vm",
                 resolve: {
                     tabTitle: function (hotelService, $cookies) {
                         hotelService.GetTextMessagesAsString($cookies.get("lang"), "ProfileSettings").then(function (response) {
                             window.document.title = response;
                         });
                     }
                 }
             })
    }

    angular
     .module("profileSetting")
     .config(routeConfigurator);

    routeConfigurator.$inject = ["$stateProvider"];
})();