(function () {
    "use strict";
    function routeConfigurator($stateProvider) {
        $stateProvider
            .state("master.gbs.hoteldetail", {
                url: "/hoteldetail?hotelId&hotelname&checkin&checkout",
                templateUrl: "app/hoteldetail/hoteldetail.tmpl.html?v=3.10",
                controller: "hoteldetailController",
                //  css:"content/HotelInformation.css",
                controllerAs: "vm",
                resolve: {
                    tabTitle: function (hotelService, $cookies, $http) {
                        //hotelService.GetTextMessagesAsString($cookies.get("lang"), "PropertyInfo").then(function (response) {
                        //    window.document.title = response;
                        //});
                       // console.log("hotelService resolve");

                        var lang = $cookies.get("lang");
                        if (lang == null || lang == undefined) {
                            var json = 'http://ipinfo.io/json';
                            if (window.location.href.indexOf("https") != -1) {
                                json = 'https://ipinfo.io/json';
                            }
                            //var promie = $http.get(json);
                            //promie.then(function (data) {
                            $.ajax({
                                url: json,
                                async: false,
                                dataType: 'json',
                                success: function (data) {
                                    lang = "en";
                                    //var data = data.data;
                                    if (data.country == 'FR')
                                        lang = "fr";
                                    if (data.country == 'RU')
                                        lang = "ru";
                                    if (data.country == 'DE')
                                        lang = "de";
                                    if (data.country == 'GB')
                                        lang = "en";
                                    if (data.country == 'TR')
                                        lang = "tr";
                                    if (data.country == 'SA')
                                        lang = "ar";

                                    $cookies.put("lang", lang, { expires: GBSHelper.helpers.getCookieExpire() });
                                 
                                    hotelService.GetTextMessagesAsString($cookies.get("lang"), "PropertyInfo").then(function (response) {
                                        window.document.title = response;
                                    });

                                }, 
                                error:function(response) {
                                    console.log(response);
                                }
                                // failure call back
                        });
                     
                        }
                        else {
                            hotelService.GetTextMessagesAsString($cookies.get("lang"), "PropertyInfo").then(function (response) {
                                window.document.title = response;
                            });
                        }
                    }
                },
                params: {
                    hotelId: null,
                    hotelname: null,
                    checkin: null,
                    checkout: null
                }
            });

    }
    angular
     .module("hoteldetail")
 // Configure the routes and route resolvers
     .config(routeConfigurator)
    .run(function ($rootScope) {
        //console.log("hdetails config");
        $rootScope.hotelname = unescape(getUrlParameter("hotelname")).trunc(20);
        $rootScope.isShowLoader = true;
    });
    //routeConfigurator.$inject = ["$stateProvider"];
})();