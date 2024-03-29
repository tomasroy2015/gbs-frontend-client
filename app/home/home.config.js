﻿(function () {
    "use strict";
    function routeConfigurator($stateProvider) {
        $stateProvider
            .state("master.gbs.home", {
                url: "/home?RemindCode?VerificationCode",
                templateUrl: "app/home/home.tmpl.html?v=3.10",
                controller: "homeController",
                controllerAs: "vm",
                resolve : {
                    tabTitle: function (hotelService, $cookies, $http) {
                        if (!$cookies.get("lang")) {
                            //set default language
                            var json = 'http://ipinfo.io/json';
                            if (window.location.href.indexOf("https") != -1) {
                                json = 'https://ipinfo.io/json';
                            }
                          //  var promie = $http.get(json);
                            $.ajax({
                                url: json,
                                async: false,
                                dataType: 'json',
                                success: function (data) {
                                    var lang = 'en';
                                  //  var data = data.data;
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
                                    hotelService.GetTextMessagesAsString($cookies.get("lang"), "HomePage").then(function (response) {
                                        window.document.title = response;
                                    });
                                }
                            });

                        }
                        else {
                            hotelService.GetTextMessagesAsString($cookies.get("lang"), "HomePage").then(function (response) {
                                window.document.title = response;
                            });
                        }
                    }
                },
                params : {
                    RemindCode: null,
                    VerificationCode: null,
                }
            });
    }
    angular
     .module("home")
     .config(routeConfigurator);
})();