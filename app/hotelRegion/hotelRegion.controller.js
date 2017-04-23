(function () {
    "use strict";
    function hotelRegionController($cookies, $stateParams, hotelRegionService, NgMap) {
        var vm = this;
        vm.showHotelRegion = showHotelRegion;
        vm.getSearchHotels = getSearchHotels;
        vm.showMarkerWindow = showMarkerWindow;
        vm.beforeRender = beforeRender_CheckInDate;
        vm.beforeRender_CheckOutDate = beforeRender_CheckOutDate;
        vm.APIKEY = window.location.href.indexOf('localhost') != -1 ? "AIzaSyBiS54lg8WlJN9IoFyNhyFRxzVLfDJxRvg" : "AIzaSyAJTmLxt8e5AzO46nRZpc6GbgY3426S5Yg";
        vm.CheckInDate = { date: moment().add('day', 0).format() };
        vm.CheckOutDate = { date: moment().add('day', 7).format() };

        NgMap.getMap().then(function (map) {
//            console.log('map', map);
            vm.map = map;
        });

        activate();
        function activate() {
            if (!$stateParams.cityId ) {
                window.close();
            }
            var culture = $cookies.get("lang");
            var arrId = "lblwelcome,lblEnterurdates,lblprpoerties1,lblprpoerties2,lblprpoerties3,lblFREEcancellation,lblrecommended,lblCheckInDate,lblCheckOutDate,btnfindthebestdeals";
            var arrMessageCode = "Welcometo,Enteryourdates1,Properties,Properties,Properties,FREEcancellation,Recommended,CheckInDate,CheckOutDate,HotelSearch";
            getHotelRegionTextMessage(culture, arrMessageCode, arrId);
            getCity($stateParams.cityId, culture);
            getRegions($stateParams.cityId, culture);
            getHotels($stateParams.cityId, culture, $cookies.get("currency"));
            getHotelsLocation(culture, $stateParams.cityId, "");
        }
        function getCity(cityId, culture) {
            hotelRegionService.getCity(cityId, culture).then(function (response) {
                vm.city = response;
            }).catch(function (error) {
                //toastr.error("Something goes wrong, Please try again.");
                console.log(error);
            });
        }
        function getHotels(cityId, culture, currency) {
            hotelRegionService.getHotels(cityId, culture, currency).then(function (response) {
                vm.hotels = response;
            }).catch(function (error) {
                console.log(error);
                //toastr.error("Something goes wrong, Please try again.");
            });
        }
        function getHotelRegionTextMessage(culture, messageCode, labelId) {
            hotelRegionService.getHotelRegionTextMessage(culture, messageCode, labelId).then(function (response) {
                vm.hotelRegionlabel = response;
            }).catch(function (error) {
                console.log(error);
            });
        }
        function getRegions(cityId, culture) {
            hotelRegionService.getRegions(cityId, culture).then(function (response) {
                vm.regions = response;
                console.log(vm.regions.length);
            }).catch(function (error) {
                //toastr.error("Something goes wrong, Please try again.");
                console.log(error);
            })
        }
        function getHotelsLocation(culture, cityId, hotelIds) {
            hotelRegionService.getHotelsLocation(culture, cityId, hotelIds).then(function (response) {
                vm.regionHotel = response;
                vm.regionHotel1 = vm.regionHotel.slice(0,20);
            }).catch(function (error) {
                console.log(error);
                //toastr.error("Something goes wrong, Please try again.");
            })
        }
        function getSearchHotels() {
            var search = { checkInDate: moment(vm.CheckInDate.date).format("DD/MM/YYYY"), checkOutDate: moment(vm.CheckOutDate.date).format("DD/MM/YYYY"), city: $stateParams.cityId, culture: $cookies.get("lang") }
            hotelRegionService.getSearchHotels(search).then(function (response) {
                if (response != undefined && response.length == 0) {
                    toastr.info("No result for search criteria.","Ohhh! not found!", {"timeOut":3000});
                }
                else {
                    vm.hotels = response;
                }
            }).catch(function (error) {
                console.log(error);
                //toastr.error("Something goes wrong, Please try again.");
            })
        }
        function showHotelRegion(hotel) {

            vm.hotelDetail = hotel;
        }
        function showMarkerWindow(e, markerAddress)
        {
            vm.regionHotelAddress = markerAddress; 
            vm.map.showInfoWindow('info_Region', vm.regionHotel.id);
        }

        function beforeRender_CheckInDate($view, $dates, $leftDate, $upDate, $rightDate) {
            //debugger;
            var index = Math.floor(Math.random() * $dates.length);
            var max = moment().add('day', 7).valueOf();
            var now = moment().add('day', -1).valueOf();
            angular.forEach($dates, function (dateObject) {
                //dateObject.selectable = (dateObject.localDateValue() >= now && dateObject.localDateValue() <= max)
                dateObject.selectable = (dateObject.localDateValue() >= now)
                //if (dateObject.localDateValue() >= now && dateObject.localDateValue() < max) {
                //    dateObject.addClass = "dt_dy_bg";
                //}
            });
        }
        function beforeRender_CheckOutDate($view, $dates, $leftDate, $upDate, $rightDate) {
            var index = Math.floor(Math.random() * $dates.length);
            //if (addDayDisable != undefined && addDayDisable >= 1)
            //    $dates[index + addDayDisable].selectable = false;
            //var now = moment().toDate();
            var now = moment().add('day', -1).valueOf();
            angular.forEach($dates, function (dateObject) {
                dateObject.selectable = (dateObject.localDateValue() >= now)
            });
        }
    }
    angular
    .module("hotelRegion")
    .controller("hotelRegionController", hotelRegionController)
    hotelRegionController.$inject = ["$cookies", "$stateParams", "hotelRegionService","NgMap"];
})();