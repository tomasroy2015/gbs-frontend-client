(function () {
    "use strict";
    function routeConfigurator($stateProvider) {
        $stateProvider
            .state("master.gbs.book", {
                //OLD url: "/book?confirmbook",
                url: "/book?\
                    &cultureid\
                    &checkdatefrom\
                    &checkdateto\
                    &hotelcity\
                    &hotelid\
                    &address\
                    &mainphotoname\
                    &hotelclass\
                    &hotelname\
                    &roomid\
                    &uniqueid\
                    &accommodationtypeid\
                    &accommodationtypename\
                    &accommodationtypedescription\
                    &pricepolicytypeid\
                    &pricepolicytypename\
                    &singlerate\
                    &doublerate\
                    &dailyroomprices\
                    &originalroomprice\
                    &currencyid\
                    &currencysymbol\
                    &roomcount\
                    &maxpeoplecount\
                    &roomprice\
                    &currencycode\
                    &hoteltypename\
                    &pricetype\
                    &creditcardnotrequired\
                    &currentcurrency\
                    &hasdiscount\
                     ",
                templateUrl: "app/book/book.tmpl.html?v=3.10",
                controller: "bookController",
                controllerAs: "vm",
                resolve: {
                    tabTitle: function (hotelService, $cookies) {
                        hotelService.GetTextMessagesAsString($cookies.get("lang"), "Bookings").then(function (response) {
                            window.document.title = response;
                        });
                    },
                    signInTitle: function (hotelService, $cookies) {
                        return hotelService.GetTextMessagesAsString($cookies.get("lang"), "SignBookFaster").then(function (response) {
                            return response;
                        });
                    },
                    dontMissOutMessage: function (hotelService, $cookies) {
                        return hotelService.GetTextMessagesAsString($cookies.get("lang"), "DontMissOutMessage").then(function (response) {
                            return response;
                        });
                    },
                    luckyDayMessgae: function (hotelService, $cookies) {
                        return hotelService.GetTextMessagesAsString($cookies.get("lang"), "LuckyDayMessgae").then(function (response) {
                            return response;
                        });
                    }
                }
            });
    }

    angular
     .module("book")

 // Configure the routes and route resolvers
     .config(routeConfigurator);
      
    //routeConfigurator.$inject = ["$stateProvider"];
})();