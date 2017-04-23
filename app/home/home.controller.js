(function () {
    "use strict";
    function homeController($rootScope, $uibModal, $cookies, homeService, $stateParams, $timeout, $q, $log, API_URL, regionService, $state, ActivityMonitor, $scope, $location) {
        var vm = this;

        //var dat = new Date();
        //var day2 = moment().add(1, 'days').format();///.format("MMM D, ddd");
        
        //vm.CheckInDate = { date: dat };
        //vm.CheckOutDate = { date:  day2  };
        //vm.CheckInDate = { date: null }
        //vm.CheckOutDate = { date: null }
        vm.opened = false;
        vm.hotelSearch = hotelSearch;
        $rootScope.pageTitle = "Home";
        // remove click event Datepicker with Bootstrap Directive
        //vm.openCheckInDate = openCheckInDate;
        vm.beforeRender = beforeRender_CheckInDate;
        vm.beforeRender_CheckOutDate = beforeRender_CheckOutDate;
        vm.showDropdown = showDropdown;
        vm.showPersonDropdown = showPersonDropdown;
        vm.roomCountChange = roomCountChange;
        vm.personCountChange = personCountChange;
        vm.showroomCountDropdown = false;
        vm.showPersonCountDropdown = false;
        vm.getDestinationSearchResult = getDestinationSearchResult;
        vm.URL = API_URL.URL;
        
        $scope.baseUrl = $location.protocol() + "://" + $location.host+"/";
        vm.getLink = function (id,hname, ind,shareurl) {
            //return $location.$$absUrl
            //console.log($scope.baseUrl + "#/" + "hoteldetail?hotelId=" + p.Id + "&hotelname=" + p.RoutingName);
            $("#" + shareurl + ind.toString()).attr("socialshare-url", $scope.baseUrl + "#/" + "hoteldetail?hotelId=" + id + "&hotelname=" + hname);
        };
        //vm.destination_searchURL = destination_searchURL;
        vm.remoteUrlRequestFn = function (str) {
            return { q: str };
        };
        //for autocomplete
        //vm.selectedCountry = ""; 
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
        vm.personCount = 1;
        vm.roomCount = 1;
        // callback autocomplete
        vm.selected_destination = "";
        //end
         

        // how long (in seconds) until user is considered inactive
        ActivityMonitor.options.inactive = 10;

        ActivityMonitor.on('inactive', function () {
            // user is considered inactive, logout etc.
            //console.log("inactivity log");
        });

        ActivityMonitor.on('keepAlive', function () {
            // items to keep alive in the background while user is active
            //console.log("keep alive");
        });

        ActivityMonitor.on('warning', function () {
            // alert user when they're nearing inactivity
            //console.log("inactivity warning.");
        });


        function personCountChange() {
            $("#personCount1").removeClass("active");
            $("#personCount2").removeClass("active");
            $("#personCount3").removeClass("active");
            switch (vm.personCount) {
                case "1":
                    $("#personCount1").addClass("active");
                    break;
                case "2":
                    $("#personCount2").addClass("active");
                    break;
                case "3":
                    $("#personCount3").addClass("active");
                    break;
                default:
                    break;
            }
        }

        function showPersonDropdown() {
            vm.showPersonCountDropdown = true;
            $("#ddlAdultCount").val(4);
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

        // Replace with Angular Bootstrap Datepicker
        //function openCheckInDate() {
        //    vm.opened = true;
        //}

        function beforeRender_CheckInDate($view, $dates, $leftDate, $upDate, $rightDate) {
            var index = Math.floor(Math.random() * $dates.length);
            var now = moment().add('day', -1).valueOf();
            angular.forEach($dates, function (dateObject) {
                //dateObject.selectable = (dateObject.localDateValue() >= now && dateObject.localDateValue() <= max)
                dateObject.selectable = (dateObject.localDateValue() >= now)
            });
        }
        function beforeRender_CheckOutDate($view, $dates, $leftDate, $upDate, $rightDate, addDayDisable) {
            var index = Math.floor(Math.random() * $dates.length);
            //if (addDayDisable != undefined && addDayDisable >= 1)
            //    $dates[index + addDayDisable].selectable = false;
            //var now = moment().toDate();
            var now = moment().add('day', -1).valueOf();
            angular.forEach($dates, function (dateObject) {
                dateObject.selectable = (dateObject.localDateValue() >= now)
            });
        }

        function showDropdown() {
            vm.showroomCountDropdown = true;
        }

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
              mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }
        vm.currentDate = new Date();
        this.pageClass = 'page-home';
        vm.lang = $cookies.get("lang");

        // call activate function after lang get and in case we have from cookie
        function callDependFunctions() {

            var culture = $cookies.get("lang");
//            console.log(culture);
            var currency = $cookies.get("currency");
            //console.log(currency);

            if (currency == undefined && !$rootScope.currentCurrency.CurrencyCode) {
                currency = $rootScope.currentCurrency.CurrencyCode;
            }
            getLatestNews(culture);
            getPopularHotel(culture, currency);
            getRecentHotel(culture, currency);
            getPopularDestination(culture);
            var arrId = "spnHotelSearch,lblDestination,txtDestinationSearch,lblCheckIn,lblCheckOut,lblRoomCount,lblAdultCount,lblSearch,lbltopdestinations,lblmoredestination,lblFeaturedHotels,lblRecentlyHotels,GbsHotelsTextHeader,lblhotelsin,lblcountriesworldwide,lbladdyourhotels,lblLatestNews,lblOURPARTNERS";
            var arrMessageCode = "HotelSearch,Destination,HotelDestination,CheckInDate,CheckOutDate,RoomCount,AdultCount,Search,TOPDESTINATIONS,More Destinations,FeaturedHotels,RecentlyAddedHotels,GbshotelsBook,hotelsin,countriesworldwide,AddYourHotels,LatestNews,OURPARTNERS";
            getHomeTextMessage(culture, arrMessageCode, arrId);
            getWhyGbshotelsText(culture);
            getHotelCount();
        }

       
        function activate() {
            
            callDependFunctions();
             
            // check state params
            if ($stateParams.RemindCode !== null && $stateParams.RemindCode !== undefined) {
                var str = $stateParams.RemindCode;
                var res = str.split(" ");
                vm.userid = res[0];
                var modalInstance = $uibModal.open({
                    animation: true,
                    size: "sm",
                    templateUrl: "app/login/resetPassword.popup.tmpl.html?v=3.10",
                    controller: 'resetPasswordController',
                    controllerAs: "vm",
                    backdrop: 'static',
                    keyboard: false
                });
                modalInstance.userId = vm.userid;
            }

            if ($stateParams.VerificationCode !== null && $stateParams.VerificationCode !== undefined) {
                homeService.sendVerificationCode($stateParams.VerificationCode).then(function (response) {
                    if (response == true)
                        toastr.success("Account Verified Success");
                    if (response == false)
                        toastr.error("Invalid Verification Code.");
                }).catch(function (error) {

                });
            }
            
            vm.focus = function () {
                //if (document.getElementById('txtDestinationSearch') != undefined)
                //    document.getElementById('txtDestinationSearch').focus();

                $timeout(function () {
                    var searchInput = document.getElementById('txtDestinationSearch_value');
                    searchInput.focus();
                    //setTimeout(function () {
                    //    $("#txtDestinationSearch_value").focus();
                    //}, 400);

                }, 1500);

            };

        }
        activate();

        function getLatestNews(culture) {
            homeService.getLatestNews(culture).then(function (response) {
                vm.latestNews = response;
            }).catch(function (error) {

            })
        }
        function getPopularHotel(culture, currency) {
            homeService.getPopularHotel(culture, currency).then(function (response) {
                vm.popularHotels = response;
            }).catch(function (error) {

            })
        }
        function getRecentHotel(culture, currency) {
            homeService.getRecentHotel(culture, currency).then(function (response) {
                vm.recentHotels = response;
            }).catch(function (error) {

            })
        }
        function getPopularDestination(culture) {
            homeService.getPopularDestination(culture).then(function (response) {
                vm.popularDestination = response;
            }).catch(function (error) {

            })
        }
        function getHomeTextMessage(culture, messageCode, labelId) {
            homeService.getHomeTextMessage(culture, messageCode, labelId).then(function (response) {
                vm.homelabel = response;
            }).catch(function (error) {

            })
        }
        function getWhyGbshotelsText(culture) {
            homeService.getWhyGbshotelsText(culture).then(function (response) {
                vm.whyGbshotelsText = response;
            }).catch(function (error) {

            })
        }
        function getHotelCount() {
            homeService.getHotelCount().then(function (response) {
                vm.hotel = response;
            }).catch(function (error) {

            })
        }

        //For search city location
        function getDestinationSearchResult(keyword) {
            var json = { Keyword: vm.search_text, CultureCode: $cookies.get("lang"), CountryID: $stateParams.regionId }
            //$.ajaxSetup({ cache: false });
            homeService.getDestinationSearchResult(json.CultureCode, json.Keyword, json.CountryID).then(function (response) {
                vm.destination_results = response;
            }).catch(function (error) {

            })
        }
        function hotelSearch() {
            if(vm.selected_destination.originalObject === undefined)
            {
                toastr.warning("Please choose Destination/Hotel.");
                $("#txtDestinationSearch_value").focus();
                return;
            }
            var HotelID = vm.selected_destination.originalObject.HotelID;
            var CheckInDate =vm.CheckInDate ? moment(vm.CheckInDate.date).format("DD/MM/YYYY"):null;
            var CheckOutDate = vm.CheckOutDate?moment(vm.CheckOutDate.date).format("DD/MM/YYYY") :null;
            var RoutingName = '';
            var CountryCode = '';
            var RegionID = vm.selected_destination.originalObject.ID;
            var DestinationSearch = vm.selected_destination.originalObject.DisplayName;
            var GregionName =vm.selected_destination.originalObject.RegionName
            return regionService.getRoutingDetails(HotelID, "", "").then(function (response) {

                if (RegionID != "" && DestinationSearch != "") {
                    //if ((CheckInDate != "" && CheckOutDate != "") || (CheckInDate == "" && CheckOutDate == ""))
                    {
                        $state.go("master.gbs.searchHotel", {gregionName:GregionName, gregion: RegionID, Checkin: CheckInDate, Checkout: CheckOutDate, RoomCount: vm.roomCount, Adultcount: vm.personCount, Childrencount: 0 });
                    }
                }

            }).catch(function (error) {
                return error;
            });
        }
        vm.remoteUrlRequestFn = function (str) {
            var va = {
                'culture': $cookies.get("lang"),
                'keyword': str,
                'countryId': "in"
            };
            return va;
        };
        //setTimeout(
        //function () {
        //    $rootScope.isShowLoader = false;
        //}, 800);

      
    }

    angular
    .module("home")
    //.value('cgBusyDefaults',{
    //    message:'Loading Stuff',
    //    backdrop: true,
    //     delay: 300,
    //    minDuration: 700,
    //    wrapperClass: 'my-class my-class2'
    //})
    .controller("homeController", homeController)
    .run(function ($rootScope, $timeout) {
        //console.log("run home");
         
        $rootScope.isShowLoader = true;


    });
    homeController.$inject = ["$rootScope", "$uibModal", "$cookies", "homeService", "$stateParams", "$timeout", "$q", "$log", "API_URL", "regionService", "$state", "ActivityMonitor", "$scope","$location"];
})();