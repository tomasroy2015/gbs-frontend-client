(function () {
    "use strict";
    function regionController($cookies, $stateParams, regionService, API_URL, $state) {
        var vm = this;
        vm.guestCountChange = guestCountChange;
        vm.roomCountChange = roomCountChange;
        vm.showGuestCountDropdown = false;
        vm.showRoomCountDropdown = false;
        vm.showGuestDropdown = showGuestDropdown;
        vm.showRoomDropdown = showRoomDropdown;
        vm.getRoutingDetails = getRoutingDetails;
        vm.beforeRender = beforeRender_CheckInDate;
        vm.beforeRender_CheckOutDate = beforeRender_CheckOutDate;
        vm.CheckInDate = { date: moment().add('day', 0).format() };
        vm.CheckOutDate = { date: moment().add('day', 7).format() };
        vm.roomCount = 1;
        vm.guestCount = 1;
        // callback autocomplete
        vm.URL = API_URL.URL;
        vm.selected_destination = "";
        vm.remoteUrlRequestFn = function (str) {
            var va = {
                'culture': $cookies.get("lang"),
                'keyword': str,
                'countryId': "in"
            };
            return va;
        };
        vm.focusState = 'None';
        vm.focusIn = function () {
            var focusInputElem = document.getElementById('txtDestinationSearch');
            vm.focusState = 'In';
            focusInputElem.classList.remove('small-input');
        }
        vm.focusOut = function () {
            var focusInputElem = document.getElementById('txtDestinationSearch');
            vm.focusState = 'Out';
            focusInputElem.classList.add('small-input');
        }

        activate();
        function activate() {
            var culture = $cookies.get("lang");
            var arrId = "spnHotelSearch,lblCheckIn,lblCheckOut,lblguest,lblRegionDestination,lblhoteldestinations,txtDestinationSearch,lblRoomCount,lblnohotel";
            var arrMessageCode = "HotelSearch,CheckInDate,CheckOutDate,Guests,Destinations In,Destination,HotelDestination,RoomCount,NoHotelsTodisplay";
            getRegionTextMessage(culture, arrMessageCode, arrId);
            getHotelRegions(culture, $stateParams.regionId);
            getCountryRegions(culture, $stateParams.regionId);
        }
        function roomCountChange() {
            $("#roomCount1").removeClass("active");
            $("#roomCount2").removeClass("active");
            $("#roomCount3").removeClass("active");
            switch (vm.roomCount) {
                case "1":
                    $("#roomCount1").addClass("active");
                    break;
                case "2":
                    $("#roomCount2").addClass("active");
                    break;
                case "3":
                    $("#roomCount3").addClass("active");
                    break;
                default:
                    break;
            }
        }
        function guestCountChange() {
            $("#guestCount1").removeClass("active");
            $("#guestCount2").removeClass("active");
            $("#guestCount3").removeClass("active");
            switch (vm.guestCount) {
                case "1":
                    $("#guestCount1").addClass("active");
                    break;
                case "2":
                    $("#guestCount2").addClass("active");
                    break;
                case "3":
                    $("#guestCount3").addClass("active");
                    break;
                default:
                    break;
            }
        }
        function showGuestDropdown() {
            vm.guestCount = 4;
            vm.showGuestCountDropdown = true;
        }
        function showRoomDropdown() {
            vm.roomCount = 4;
            vm.showRoomCountDropdown = true;
        }
        function getHotelRegions(culture, countryId) {
            return regionService.getHotelRegions(culture, countryId).then(function (response) {
                vm.regionHotel = response;
            }).catch(function (error) {
                return error;
            });
        }
        function getCountryRegions(culture, countryId) {
            return regionService.getCountryRegions(culture, countryId).then(function (response) {
                var _regions = response;
                vm.regionmap = _regions.slice(0, 20);
            }).catch(function (error) {
                return error;
            });
        }
        function getRoutingDetails() {
            var HotelID = vm.selected_destination.originalObject.HotelID;
            var CheckInDate = moment(vm.CheckInDate.date).format("DD/MM/YYYY");
            var CheckOutDate = moment(vm.CheckOutDate.date).format("DD/MM/YYYY");
            var RoutingName = '';
            var CountryCode = '';
            var RegionID = vm.selected_destination.originalObject.ID;
            var DestinationSearch = vm.selected_destination.originalObject.DisplayName;
            var GregionName = vm.selected_destination.originalObject.RegionName
            return regionService.getRoutingDetails(HotelID, "", "").then(function (response) {

                if (RegionID != "" && DestinationSearch != "") {
                    if ((CheckInDate != "" && CheckOutDate != "") || (CheckInDate == "" && CheckOutDate == "")) {
                        $state.go("master.gbs.searchHotel", { gregionName: GregionName, gregion: RegionID, Checkin: CheckInDate, Checkout: CheckOutDate, RoomCount: vm.roomCount, Adultcount: vm.guestCount, Childrencount: 0 });
                    }
                }

            }).catch(function (error) {
                return error;
            });
        }
        function getRegionTextMessage(culture, messageCode, labelId) {
            regionService.getRegionTextMessage(culture, messageCode, labelId).then(function (response) {
                vm.regionlabel = response;
            }).catch(function (error) {

            })
        }

        function beforeRender_CheckInDate($view, $dates, $leftDate, $upDate, $rightDate) {
            var index = Math.floor(Math.random() * $dates.length);
            var max = moment().add('day', 7).valueOf();
            var now = moment().add('day', -1).valueOf();
            angular.forEach($dates, function (dateObject) {
                dateObject.selectable = (dateObject.localDateValue() >= now)
            });
        }
        function beforeRender_CheckOutDate($view, $dates, $leftDate, $upDate, $rightDate) {
            var index = Math.floor(Math.random() * $dates.length);
            var now = moment().add('day', -1).valueOf();
            angular.forEach($dates, function (dateObject) {
                dateObject.selectable = (dateObject.localDateValue() >= now)
            });
        }
    }
    angular
    .module("region")
    .controller("regionController", regionController)
    regionController.$inject = ["$cookies", "$stateParams", "regionService", "API_URL", "$state"];
})();