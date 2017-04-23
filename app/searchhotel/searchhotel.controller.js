(function () {
    "use strict";
    function searchHotelController($cookies, $stateParams, searchHotelService, $scope, API_URL, $sce, $compile) {
        var vm = this;
        var userId = '';
        vm.showmap = true;
        vm.DeleteMyViewedHotels = DeleteMyViewedHotels;
        vm.adultCountChange = adultCountChange;
        vm.roomCountChange = roomCountChange;
        vm.another_toggle = another_toggle;
        vm.childrenCountChange = childrenCountChange;
        vm.showAdultCountDropdown = false;
        vm.showRoomCountDropdown = false;
        vm.showChildCountDropdown = false;
        vm.showAdultDropdown = showAdultDropdown;
        vm.showRoomDropdown = showRoomDropdown;
        vm.showChildDropdown = showChildDropdown;
        vm.searchResultView = searchResultView;
        vm._filterHotelDetails = _filterHotelDetails;
        vm.ShowHideMap = ShowHideMap;
        //get all hotel in given date range
        //vm.CheckInDate = { date: moment().add('day', 0).format() };
        //vm.CheckOutDate = { date: moment().add('day', 7).format() };

        vm.beforeRender = beforeRender_CheckInDate;
        vm.beforeRender_CheckOutDate = beforeRender_CheckOutDate;
        vm.hotelSearch = hotelSearch;
        vm.childCount = 0;
        vm.pageSize = 15;
        vm.pageIndex = 1;
        vm.total = 0;
        vm.currentPage = 1;
        vm.hoteSearchPageWise = hoteSearchPageWise;
        vm.filterHotelDetails = filterHotelDetails;
        vm.bindRegion = bindRegion;
        //Slider config with custom display function
        vm.slider = {
            minValue: 0,
            maxValue: 1500,
            options: {
                ceil: 1500,
                floor: 0,
                showTicks: false,
                id: 'translate-slider',
                translate: function (value, id, which) {
                    // console.info(value, id, which);
                    return $cookies.get("currency") + " " + value;
                },
                onEnd: function (id) {
                    _filterHotelDetails();
                },
            }
        };

        // callback autocomplete
        vm.URL = API_URL.URL;
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

        //get sort value on selection
        vm.setSortValue = function (obj) {
            vm.getSortValue = obj.Sort;
            _filterHotelDetails();
        }


        function searchprice_saveResult(data) {
            vm.min = data.from;
            vm.max = data.to;
        }

        var culture = $cookies.get("lang");
        activate();
        function activate() {

            userId = $cookies.get("userId");
            if (userId) {
                if ($cookies.get("UserCookies") != null && $cookies.get("UserCookies") != undefined)
                    userId = $cookies.get("UserCookies");
                else
                    userId = 0;
            }
            else
            {
                if ($cookies.get("UserCookies") != null && $cookies.get("UserCookies") != undefined)
                    userId = $cookies.get("UserCookies");
            }
            if ($stateParams.RoomCount) {
                vm.roomCount = $stateParams.RoomCount;
                roomCountChange();
            }
            if ($stateParams.Adultcount) {
                vm.adultCount = $stateParams.Adultcount;
                adultCountChange();
            }
            if ($stateParams.gregion && $stateParams.gregionName) {
                vm.gregion =$stateParams.gregion
                getDestinationSearchResultById(culture, $stateParams.gregion, $stateParams.gregionName);
            }

            if ($stateParams.Checkin) {
                vm.CheckInDate = { date: moment(unescape($stateParams.Checkin), "DD/MM/YYYY").format() };
                vm.CheckInDateFormatted = moment(vm.CheckInDate.date).format("DD/MM/YYYY")
            }
            else {
                vm.CheckInDate = { date: moment().add('day', 0).format() };
                vm.CheckInDateFormatted = moment(vm.CheckInDate.date).format("DD/MM/YYYY")
            }
            if ($stateParams.Checkout) {
                vm.CheckOutDate = { date: moment(unescape($stateParams.Checkout), "DD/MM/YYYY").format() };
                vm.CheckOutDateFormatted = moment(vm.CheckOutDate.date).format("DD/MM/YYYY")
            }
            else {
                vm.CheckOutDate = { date: moment().add('day', 7).format() };
                vm.CheckOutDateFormatted = moment(vm.CheckOutDate.date).format("DD/MM/YYYY")
            }

            var arrId = "lblDestination,txtDestinationSearch,lblCheckIn,lblCheckOut,lblRoomCount,lblAdultCount,lblChildCount,lblSearch,lblFilterSearch," +
                         "lblHotelClass,lblHotelType,lblHotelAttribute,lblHotelRegion,lblPrice,SpnHotelsIn,SpnHotelsFoundIn,lblmyViewdHotel,lnkShowMap,lnkHideMap,lblHotelSort," +
                         "lblNoDestinationFound,lblon,lblfor,lbladult";
            var arrMessageCode = "Destination,HotelDestination,CheckInDate,CheckOutDate,RoomCount,AdultCount,ChildCount,Search,FilterSearch," +
                          "HotelClass,HotelType,HotelFacilities,HotelRegion,PriceRange,hotelsin,HotelsFoundIn,MyViewedHotel,ShowMap,HideMap,Sort," +
                           "NoDestinationFound,On,For,Adult";
            getSearchHotelTextMessage(culture, arrMessageCode, arrId);
            getRecentlyviewdHotels(culture, userId)
            getPropertyClass(culture);
            getPropertyType(culture);
            getSortValues(culture);
            getPropertyFacilities(culture);
            //call when click on showmap
            //getRegionsSearch(culture, vm.gregion);
            //getHotelsLocation(culture, vm.gregion);
            vm.iscallmap = false;
            //added by AB
            if (vm.selected_destination && vm.selected_destination.originalObject)
                getPropertyRegion(culture, vm.selected_destination.originalObject.ID)



        }
        function bindRegion(selected) {
            if (selected)
                getPropertyRegion(culture, selected.ID)
        }
        function searchResultView(type) {
            if (type == "List") {
                $('#Grid').removeClass('active');
                $('#List').addClass('active');
                document.getElementById("gridView").style.display = 'none';
                document.getElementById("listType").style.display = '';
            }
            else if (type == "Grid") {
                $('#List').removeClass('active');
                $('#Grid').addClass('active');
                document.getElementById("gridView").style.display = '';
                document.getElementById("listType").style.display = 'none';
            }
        }
        function getRegionsSearch(culture, regionId) {
            searchHotelService.getRegionsSearch(culture, regionId).then(function (response) {
                vm.regionSearch = response;
            }).catch(function (error) {
                toastr.error("Something goes wrong, Please try again.");
            })
        }
        function getHotelsLocation(culture, regionId) {
            var hids = [];
            if (vm.searchHotel) {
                for (var i = 0; i < vm.searchHotel.length ; i++) {
                    hids.push(vm.searchHotel[i].ID);
                }
                searchHotelService.getHotelsLocation(culture, regionId, hids.join(',')).then(function (response) {
                    vm.HotelsLocation = response;
                }).catch(function (error) {
                    toastr.error("Something goes wrong, Please try again.");
                })
            }
        }
        function getRecentlyviewdHotels(culture, userId) {
            searchHotelService.getRecentlyviewdHotels(culture, userId).then(function (response) {
                vm.recentlyViewedHotel = response;
            }).catch(function (error) {
                toastr.error("Something goes wrong, Please try again.");
            })
        }
        function DeleteMyViewedHotels(Id) {
            searchHotelService.DeleteMyViewedHotels(Id, userId).then(function (response) {
                activate();
            }).catch(function (error) {
                toastr.error("Something goes wrong, Please try again.");
            })
        }
        function getSearchHotelTextMessage(culture, messageCode, labelId) {
            searchHotelService.getSearchHotelTextMessage(culture, messageCode, labelId).then(function (response) {
                vm.searchHotellabel = response;
            }).catch(function (error) {

            })
        }
        function getPropertyClass(culture) {
            searchHotelService.getPropertyClass(culture).then(function (response) {
                vm.hotelclass = response;
            }).catch(function (error) {

            })
        }
        function getDestinationSearchResultById(culture, regionId, regionName) {
            searchHotelService.getDestinationSearchResultById(culture, regionId, regionName).then(function (response) {
                if (response) {
                    vm.selected_destination = response[0];
                    bindRegion(vm.selected_destination);
                    vm.regionName = vm.selected_destination.RegionName || vm.selected_destination.originalObject.RegionName;
                    hotelSearch();
                }
            }).catch(function (error) {

            })
        }
        function getSortValues(culture) {
            searchHotelService.getSortValues(culture).then(function (response) {
                vm.searchsort = response;
                if (response[0].Name)
                    vm.getSortValue = response[0].Sort;
                $scope.$broadcast('dataloaded');
                console.log("datasort compiled");
            }).catch(function (error) {

            })
        }
        function getPropertyType(culture) {
            searchHotelService.getPropertyType(culture).then(function (response) {
                vm.hotelPropertyType = response;
            }).catch(function (error) {

            })
        }
        function getPropertyFacilities(culture) {
            searchHotelService.getPropertyFacilities(culture).then(function (response) {
                vm.hotelFacility = response;
            }).catch(function (error) {

            })
        }
        function getPropertyRegion(cultureid, regionid) {
            searchHotelService.getPropertyRegion(cultureid, regionid).then(function (response) {
                vm.hotelPropertyRegion = response;
            }).catch(function (error) {
                console.log(error);
            })
        }
        function roomCountChange() {
            $("#roomCount1").removeClass("active");
            $("#roomCount2").removeClass("active");
            $("#roomCount3").removeClass("active");
            $("#roomCount4").removeClass("active");
            $("#roomCount5").removeClass("active");
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
                case "4":
                    $("#roomCount4").addClass("active");
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                case "10":
                case "11":
                case "12":
                case "13":
                case "14":
                    vm.showRoomCountDropdown = true;
                    break;
            }
        }
        function adultCountChange() {
            $("#adultCount1").removeClass("active");
            $("#adultCount2").removeClass("active");
            $("#adultCount3").removeClass("active");
            $("#adultCount4").removeClass("active");
            $("#adultCount5").removeClass("active");

            switch (vm.adultCount) {
                case "1":
                    $("#adultCount1").addClass("active");
                    break;
                case "2":
                    $("#adultCount2").addClass("active");
                    break;
                case "3":
                    $("#adultCount3").addClass("active");
                    break;
                case "4":
                    $("#adultCount4").addClass("active");
                    break;
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                case "10":
                case "11":
                case "12":
                case "13":
                case "14":
                    vm.showAdultCountDropdown = true;
                    break;
            }
        }
        function childrenCountChange() {
            $("#childCount0 ,#childCount1,#childCount2,#childCount3,#childCount4,#childCount5").removeClass("active");
            switch (vm.childCount) {
                case "0":
                    $("#childCount0").addClass("active");
                case "1":
                    $("#childCount1").addClass("active");
                    break;
                case "2":
                    $("#childCount2").addClass("active");
                    break;
                case "3":
                    $("#childCount3").addClass("active");
                    break;
                case "4":
                    $("#childCount4").addClass("active");
                    break;
                case "5":
                    $("#childCount5").addClass("active");
                    break;
                default:
                    break;
            }
        }
        function showAdultDropdown() {
            vm.showAdultCountDropdown = true;
        }
        function showRoomDropdown() {
            vm.showRoomCountDropdown = true;
        }
        function showChildDropdown() {
            vm.showChildCountDropdown = true;
        }
        function another_toggle($event) {

            var obj = $event.target;
            if ($(obj).hasClass('active')) {
                $(obj).removeClass('active');
                $(obj).next('.another-toggle-content').slideUp();
            } else {
                $(obj).addClass('active');
                $(obj).next('.another-toggle-content').slideDown();
            }
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

        function hotelSearch() {
            var currentCurrency = $cookies.get("currency");
            var culture = $cookies.get("lang");
            var regionId = vm.selected_destination.ID || vm.selected_destination.originalObject.ID;

            //commented it.. it was uncomment for testing to get all search hotel in any dates..
            var checkInDate = vm.CheckInDate?
                (window.location.href.indexOf('localhost') != -1 ? moment(vm.CheckInDate.date).format("DD/MM/YYYY") : moment(vm.CheckInDate.date).format("DD/MM/YYYY"))
                :"";
            var checkOutDate = vm.CheckOutDate ? (window.location.href.indexOf('localhost') != -1 ? moment(vm.CheckOutDate.date).format("DD/MM/YYYY") : moment(vm.CheckOutDate.date).format("DD/MM/YYYY"))
                : "";

            //var checkInDate = moment(vm.CheckInDate.date).format("DD/MM/YYYY");
            //var checkOutDate = moment(vm.CheckOutDate.date).format("DD/MM/YYYY");

            var roomCount = vm.roomCount;
            var adultCount = vm.adultCount;
            var childrenCount = vm.childCount;

            searchHotelService.getFeaturedHotelSearch(currentCurrency, culture, regionId, checkInDate, checkOutDate , roomCount, adultCount, childrenCount, vm.pageSize, vm.currentPage).then(function (response) {
                vm.searchHotel = response;

                //taking time to load
                ////async call to get region map for google map
                //getRegionsSearch(culture, vm.gregion);
                //getHotelsLocation(culture, vm.gregion);
                //vm.iscallmap = true;

                 if (response.length > 0)
                    vm.total = response[0].Count
            }).catch(function (error) {

            })
        }
        function ShowHideMap(isShown) {
            if (isShown)
                vm.showmap = true;
            else {
                if (!vm.iscallmap || vm.HotelsLocation == undefined) {
                    getRegionsSearch(culture, vm.gregion);
                    getHotelsLocation(culture, vm.gregion);
                    vm.iscallmap = true;
                }
                vm.showmap = false;
            }
        }
        function hoteSearchPageWise(page) {
            vm.currentPage = page
            filterHotelDetails();
        }
        function _filterHotelDetails() {
            vm.currentPage = 1;
            filterHotelDetails();
        }
        function filterHotelDetails() {

            if (!vm.selected_destination)
                return;
            var regionID = vm.selected_destination.ID || vm.selected_destination.originalObject.ID;
            var currentCurrency = $cookies.get("currency");
            var culture = $cookies.get("lang");
             
            var checkInDate = vm.CheckInDate?
                (window.location.href.indexOf('localhost') != -1 ? moment(vm.CheckInDate.date).format("DD/MM/YYYY") : moment(vm.CheckInDate.date).format("DD/MM/YYYY"))
                :"";
            var checkOutDate = vm.CheckOutDate ? (window.location.href.indexOf('localhost') != -1 ? moment(vm.CheckOutDate.date).format("DD/MM/YYYY") : moment(vm.CheckOutDate.date).format("DD/MM/YYYY"))
                : "";
            
            //if (!vm.selected_destination.originalObject) {
            //    $("#txtDestinationSearch_value").focus();
            //    return;
            //}

            //var regionID = vm.selected_destination.originalObject.ID;
            var roomCount = vm.roomCount;
            var adultCount = vm.adultCount;
            var childrenCount = vm.childCount;

            var chkTypeHotel = [];
            var chkfiltertypehotelclass = [];
            var chkfilterTypeFacilities = [];
            var chkfiltertyperegion = [];

            $(".filtertypehotel:checked").each(function () {
                chkTypeHotel.push($(this).attr("value"));
            });

            $(".filtertypehotelclass:checked").each(function () {
                chkfiltertypehotelclass.push($(this).attr("value"));
            });

            $(".filtertypefacilities:checked").each(function () {
                chkfilterTypeFacilities.push($(this).attr("value"));
            });
            //for regions
            $(".filtertyperegion:checked").each(function () {

                chkfiltertyperegion.push($(this).attr("value"));
            });

            var typeHotel = ""
            , typeHotelClass = ""
            , typeFacilities = ""
            , typeRegion = ""
            , startBudgetValue = 0
            , endBudgetValue = 0
            , selectedSortValue = "", checkInDate = "", checkOutDate = "";

            typeHotel = chkTypeHotel.join(';');
            typeHotelClass = chkfiltertypehotelclass.join(';');
            typeFacilities = chkfilterTypeFacilities.join(';');
            typeRegion = chkfiltertyperegion.join(';');
            startBudgetValue = vm.slider.minValue;
            endBudgetValue = vm.slider.maxValue;
            selectedSortValue = vm.getSortValue;
            
            checkInDate = vm.CheckInDate ? vm.CheckInDate.date : null;
            checkOutDate = vm.CheckOutDate ? vm.CheckOutDate.date : null;

            searchHotelService.filterHotelDetails(currentCurrency, culture, typeHotelClass, typeHotel, typeFacilities, typeRegion, currentCurrency,
            startBudgetValue, endBudgetValue, selectedSortValue, checkInDate, checkOutDate, regionID, vm.pageSize, vm.currentPage, roomCount, adultCount, childrenCount).then(function (response) {
                vm.searchHotel = response;
                if (response.length > 0)
                    vm.total = response[0].Count
            }).catch(function (error) {

            })
        }

         
    }
    angular
    .module("searchHotel")
    .controller("searchHotelController", searchHotelController)
    .directive('magnificImage', function () {

        return {
            restrict: 'A',
            link: function (scope, iElement) {
                //var AiElement = $(iElement).attr("id");
                scope.$evalAsync(function () {
                     iElement.magnificPopup({
                        type: 'image',
                        //delegate: 'li',
                        gallery: {
                            enabled: true,
                            navigateByImgClick: true,
                            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
                            tPrev: 'Previous (Left arrow key)',
                            tNext: 'Next (Right arrow key)',
                            tCounter: '<span class="mfp-counter">%curr% of %total%</span>'
                        }
                    });
                });
            }
        };
    });
     
    //.directive('dynamicElement', ['$compile', function ($compile) {
    //    return {
    //        restrict: 'E',
    //        scope: {
    //            message: "="
    //        },
    //        replace: true,
    //        link: function (scope, element, attrs) {
    //            var template = $compile(scope.message)(scope);
    //            element.replaceWith(template);
    //        },
    //        controller: ['$scope', function ($scope) {
    //            //$scope.clickMe = function () {
    //            //    alert("hi")
    //            //};
    //        }]
    //    }
    //}]);
    //.directive('bindstuffS', ['$timeout', function ($timeout) {
    //    return {
    //        // restrict: "A", // attribute only
    //        link: function ($scope, element, attrs) {
    //            $scope.$on('dataloaded', function () {
    //                $timeout(function () { // You might need this timeout to be sure its run after DOM render.
    //                    //element.width()
    //                    //element.height()
    //                    $(".nav-drop").dropit();
    //                    console.log("drop bind");
    //                }, 0, false);
    //            })
    //        }
    //    };
    //}])

    searchHotelController.$inject = ["$cookies", "$stateParams", "searchHotelService", "$scope", "API_URL", "$sce", "$compile"];
})();