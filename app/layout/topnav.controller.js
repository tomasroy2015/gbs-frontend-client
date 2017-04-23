(function () {
    "use strict";
    function topNavigationController($scope, $uibModal, topNavigationService, $cookies, $state, languageResolve, cultureResolve, gbsHotelConfig, searchHotelService, myWishlistService,$rootScope) {
        var vm = this;
        vm.showLoginPopup = showLoginPopup;
        $rootScope.showmanagereservation = showmanagereservation;
        vm.changecurrency = changecurrency;
        vm.changeLanguage = changeLanguage;
        vm.currencyList = cultureResolve;
        vm.languageList = languageResolve;
        vm.currentCurrency = { CurrencyCode: "EUR", CurrencySymbol: "EUR" };
        vm.currentLang = { CultureCode: "en", Description: "English" };
        vm.isLoggedIn = false;
        vm.getRecentlyviewdHotels = getRecentlyviewdHotels;
        vm.DeleteMyViewedHotels = DeleteMyViewedHotels;
        activate();
        vm.logout = logout;
        vm.username = $cookies.get("username");
        var userId = '';
        vm.getMyWishlistsMaster = getMyWishlistsMaster;
        vm.DeleteMyWishListHotels = DeleteMyWishListHotels;
        vm.label = {
            login: "Login",
            logout: "Logout"
        };

    

        function logout() {
            $cookies.remove("username");
            $cookies.remove("userId");
            vm.isLoggedIn = false;
            if ($state.current.name !== "master.gbs.home") {
                $state.go("master.gbs.home");
            }

        }

        $scope.$on('userLoggedIn', function (event, arg) {
            vm.isLoggedIn = true;
            vm.username = $cookies.get("username");
        });

        function activate() {
            setLanguage();
            setCurrency();
            $(".nav-drop").dropit();
            if (gbsHotelConfig.checkLoggedIn()) {
                vm.isLoggedIn = true;
            }
            else {
                vm.isLoggedIn = false;
            }
            userId = $cookies.get("userId");
            if (userId == null || userId == "" || userId == undefined) {
                if ($cookies.get("UserCookies") != null || $cookies.get("UserCookies") != undefined) {
                    userId = $cookies.get("UserCookies");
                }
                else
                    userId = 0;
            }
        }

        function setLanguage() {
            var currLang = $cookies.get("lang");
            if (!currLang) {
                var json = 'http://ipinfo.io/json';
                if (window.location.href.indexOf("https") != -1) {
                    json = 'https://ipinfo.io/json';
                }
                //var promie = $http.get(json);
                //  promie.then(function (data) {
                $.ajax({
                    url: json,
                    async: false,
                    dataType: 'json',
                    success: function (data) {
                        var lang = 'en', currLang;
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

                        currLang = lang;
                        $cookies.put("lang", currLang, { expires: GBSHelper.helpers.getCookieExpire() });

                        //currLang = "en";
                        _.each(languageResolve, function (language) {
                            if (currLang == language.CultureCode) {
                                vm.currentLang = { CultureCode: language.CultureCode, Description: language.Description };
                            }
                        });
                    }
                });

            } else {
                _.each(languageResolve, function (language) {
                    if (currLang == language.CultureCode) {
                        vm.currentLang = { CultureCode: language.CultureCode, Description: language.Description };
                    }
                });
            }
        }

        function setCurrency() {
            var currCurrrency = $cookies.get("currency");
            if (currCurrrency == undefined) {
                $cookies.put("currency", "EUR", { expires: GBSHelper.helpers.getCookieExpire() });
                currCurrrency = "EUR";
                _.each(vm.currencyList, function (currency) {
                    if (currCurrrency == currency.CurrencyCode) {
                        vm.currentCurrency = { CurrencyName: currency.CurrencyName, CurrencySymbol: currency.CurrencySymbol, CurrencyCode: currency.CurrencyCode };
                    }
                });
            } else {
                _.each(vm.currencyList, function (currency) {
                    if (currCurrrency == currency.CurrencyCode) {
                        vm.currentCurrency = { CurrencyName: currency.CurrencyName, CurrencySymbol: currency.CurrencySymbol, CurrencyCode: currency.CurrencyCode };
                    }
                });
            }

            $rootScope.currentCurrency = vm.currentCurrency;
        }

        function changecurrency(currency) {
            if (currency) {
                $cookies.put("currency", currency.CurrencyCode, { expires: GBSHelper.helpers.getCookieExpire() })
                vm.currentCurrency = currency;
            }
             //$window.location.reload();  
             $state.reload();
        }

        function changeLanguage(language) {
            vm.currentLang = language;
            $cookies.put("lang", language.CultureCode, { expires: GBSHelper.helpers.getCookieExpire() })
            $state.reload();
        }

        function showmanagereservation() {
            vm.animationsEnabled = true;
            var modalInstance = $uibModal.open({
                animation: vm.animationsEnabled,
                size: "sm",
                templateUrl: "app/common/manageReservation/manageReservation.tmpl.html?v=3.10",
                controller: 'manageReservationController',
                controllerAs: "vm"
            });
        }

        function showLoginPopup() {
            vm.animationsEnabled = true;
            var modalInstance = $uibModal.open({
                animation: vm.animationsEnabled,
                size: "sm",
                templateUrl: "app/login/login.tmpl.html?v=3.10",
                controller: 'loginController',
                controllerAs: "vm"
            });
        }

        function getRecentlyviewdHotels() {
            var culture = $cookies.get("lang");
            var userId = $cookies.get("userId");
            if (userId == null || userId == "" || userId == undefined) {
                if ($cookies.get("UserCookies") != null && $cookies.get("UserCookies") != undefined)
                    userId = $cookies.get("UserCookies");
                else
                    userId = 0;
            }
            searchHotelService.getRecentlyviewdHotels(culture, userId).then(function (response) {
                vm.recentlyViewedHotel = response;
                if (vm.recentlyViewedHotel)
                vm.recentlyViewedHotel = vm.recentlyViewedHotel.slice(0, 3);
            }).catch(function (error) {
                toastr.error("Something goes wrong, Please try again.");
            })
        }
        function getMyWishlistsMaster() {
            var culture = $cookies.get("lang");
            var userId = $cookies.get("userId");
            if (userId == null || userId == "" || userId == undefined) {
                if ($cookies.get("UserCookies") != null && $cookies.get("UserCookies") != undefined)
                    userId = $cookies.get("UserCookies");
                else
                    userId = 0;
            }
            topNavigationService.getMyWishlistsMaster(culture, userId).then(function (response) {
                vm.mywishist = response;
            }).catch(function (error) {
                toastr.error("Something goes wrong, Please try again.");
            })
        }
        function DeleteMyViewedHotels(Id) {
            var userId = $cookies.get("userId");
            if (userId == null || userId == "" || userId == undefined) {
                if ($cookies.get("UserCookies") != null && $cookies.get("UserCookies") != undefined)
                    userId = $cookies.get("UserCookies");
                else
                    userId = 0;
            }
            searchHotelService.DeleteMyViewedHotels(Id, userId).then(function (response) {
                activate();
            }).catch(function (error) {
                toastr.error("Something goes wrong, Please try again.");
            })
        }

        function DeleteMyWishListHotels(hotelId) {
            var userId = $cookies.get("userId");
            if (userId == null || userId == "" || userId == undefined) {
                if ($cookies.get("UserCookies") != null && $cookies.get("UserCookies") != undefined)
                    userId = $cookies.get("UserCookies");
                else
                    userId = 0;
            }

            myWishlistService.insertIntoWishlist(userId, hotelId).then(function (response) {
                if (response == "Remove") {
                    vm.status = response;
                }
            }).catch(function (error) {

            })
        }
    }
    angular
    .module("app")
    .controller("topNavigationController", topNavigationController)
    .run(function ($rootScope) {
        //console.log("init topnav")
    });
    topNavigationController.$inject = ["$scope", "$uibModal", "topNavigationService", "$cookies", "$state", "languageResolve", "cultureResolve", "gbsHotelConfig", "searchHotelService", "myWishlistService","$rootScope"];
})();