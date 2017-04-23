(function () {
    "use strict";
    function routeConfigurator($stateProvider) {
        $stateProvider
            .state("master.gbs.manageReservation", {
                url: "/manageReservation?rid&pc&cid",
                templateUrl: "app/manageReservation/manageReservationList.tmpl.html?v=3.10",
                controller: "manageReservationListController",
                controllerAs: "vm",
                resolve: {
                    tabTitle: function (hotelService, $cookies) {
                        hotelService.GetTextMessagesAsString($cookies.get("lang"), "HotelReservations").then(function (response) {
                            window.document.title = response;
                        });
                    },
                    reservationResolveData: function (hotelService, $stateParams) {
                        if ($stateParams.reservationData) {
                            return hotelService.getReservationData($stateParams.reservationData).then(function (response) {
                                return response;
                            }).catch(function (error) {

                            });
                        }
                        else {
                           // toastr.error("Please try again, something going wrong!");
                        }
                    }
                },
                params: {
                    reservationData:null
                }
            });
    }

    angular
     .module("manageReservation")

 // Configure the routes and route resolvers
     .config(routeConfigurator);

    routeConfigurator.$inject = ["$stateProvider"];
})();