(function () {
    "use strict";
     
    function hoteldetailController($uibModal,$state, $cookies, $stateParams, hoteldetailService, searchHotelService, NgMap, topNavigationService, $rootScope, $scope, cssInjector, base64) {
        var vm = this;

        vm.selectedRooms = 0;
        vm.subcount = 0;
        vm.selectedRoomsPrice=0;
        vm.DeleteMyViewedHotels = DeleteMyViewedHotels;
        vm.scrolltoHref = scrolltoHref;
        vm.HotelRoomBook = HotelRoomBook;
        var userId = '';
        vm.showroomCountDropdown = false;
        vm.showDropdown = showDropdown;
        vm.checkRoomAvailability = checkRoomAvailability;
        vm.beforeRender = beforeRender_CheckInDate;
        vm.beforeRender_CheckOutDate = beforeRender_CheckOutDate;
        vm.CheckInDate1 = { date: moment().add('day', 0).format() };
        vm.CheckOutDate1 = { date: moment().add('day', 7).format() };
         vm.hotelname = unescape(getUrlParameter("hotelname")).trunc(20);
         $rootScope.hotelname = vm.hotelname;
         $rootScope.callDismiss = callDismiss;
         vm.changecurrency = changecurrency;
         vm.hotelBooking = hotelBooking; 
         vm.setSelectedHotel = setSelectedHotel;
         vm.UpdateRoomCountListsRadio = UpdateRoomCountListsRadio;
         vm.selectedRoomCountArray = [];
         vm.UpdateRoomCountLists = UpdateRoomCountLists;
         vm.selectedRoomsCurrencySymbol = $cookies.get("currency");
         //vm.searchIcon = searchIconFacility;
         //vm.iList = iList;
        // insert to wishlist
         vm.showHotelPhotos = showHotelPhotos;
         vm.addtoWishlist = insertIntoWishlist;

         cssInjector.add("/content/HotelInformation.css");

        //filter the hotel policy
         //vm.filter_hotelpolicy= filter_hotelpolicy;
        activate();
        function activate() {
            var culture = $cookies.get("lang");
            vm.culture = culture;
            if ($stateParams.checkin || $stateParams.checkout)
                HotelRoomBook();
            if ($stateParams.hotelId == null || $stateParams.hotelId == undefined || $stateParams.hotelId == '') {
                //window.close();
                $state.go("master.gbs.home");
            }
            else {
                // set HotelID to vm object
                // and use it for the Add to wishlist service method
                vm.hotelId = $stateParams.hotelId;

                getHotelSlideShowImage(culture, vm.hotelId);
                getReservationReviews(culture, vm.hotelId);
                getSummary(culture, vm.hotelId);
                getHotelBasicInfo(culture, vm.hotelId);

                // uncomment to get call for new policy from below
                //try {
                //    getHotelPolicy(vm.hotelId);
                //}
                //catch (exc) {
                //    //toastr.error(exc.message);
                //}
                getHotelSpecifications(culture, vm.hotelId);
                getAllReviews(culture, vm.hotelId);
                getHotelsLocationByHotelID(culture, vm.hotelId);
                getTypeReview(culture);

                getCurrencyLoad(culture);
                
                 
                userId = $cookies.get("userId");

               var processed_data = new Object(),data="";
                
                //filter user & guest ID : by AB on 11-11-2016 : 15:00
                if (!userId) {
                    if ($cookies.get("UserCookies") != null || $cookies.get("UserCookies") != undefined) {
                        userId = $cookies.get("UserCookies");
                        //data = $cookies.get("UserCookies");
                        //data = data.split("&")
                        //for (var i = 0; i < data.length; i++){
                        //    var m = data[i].split("=");
                        //    processed_data[m[0]] = m[1];
                        //}
                        //userId = processed_data["GuestID"];
                    }
                    else {
                        userId = 0;
                    }
                }
                vm.userId = userId;
                updateHotelSearchHistory(userId, vm.hotelId);

                //check the holel wishlisted by user or not!
                checkuserWishlistStaus();
            }


            var arrId = "divAvailableRooms,divFacilities,divConditions,lblprpoerties1,lblprpoerties2,lblSpecification,lblNearByCity,lblmyViewdHotel," +
        "lblAllReviewsTab,lblCheckOut1,lblCheckIn1,lblenterDates,btnCheckAvailability,lblLocationMap,lblFantasticPrice,lblBookLaterWarning,lbladdedtowishlist,lblRemovedtowishlist,lbldatediffWarning,lblRoomNotFound,PnoRoomSelectWarning,lbldisplayratein," +
        "lblDistancetoAirport,lblCustomerlikethis,lblmylist,lblReviews,lblWritereview,lblTravelreview,lblWritereview1,btnbooknowHI3,lblSelectedRoomText1,lblTravelerrating,lblSummary,btnbooknowHI,lblmainregions";
            var arrMessageCode = "AvailableRooms,Facilities,Conditions,Properties,Properties,Specification,Near by,MyViewedHotel," +
                "SeeAllReviews,CheckOutDate,CheckInDate,RoomPriceDisplayWarning,CheckAvailability,Location,Fantasticprice,BookLaterWarningMeaasge,AddtoWishlist,RemoveWishlist,HotelSearchDateBookDaysWarning,RoomNotAvailableWarning,NoRoomSelectedWarning,Displayratein," +
                "DistancetoAirport,Customerslikethishotelfor,Mylists,Reviews,Writeareview,Travelerreviews,Writeareview,BookNow,SelectedRoomCountAndPrice,Travelerrating,Summary,BookNow,MainRegion";
            getHoteldetailTextMessage(culture, arrMessageCode, arrId);

        }

        //var iList =  {
        //    "air conditioning": '<i class="im im-air"></i>'
        //    , "iron": '<i class="im im-tv"></i>'
        //    , "ironing facilities": '<i class="im im-tv"></i>'
        //    , "bath": '<i class="im im-bathtub"></i>'
        //    , "shower": '<i class="im im-shower"></i>'
        //    , "toilet": '<i class="im im-tv"></i>'
        //    , "flat-screen tv": '<i class="im im-tv"></i>'
        //    , "satellite channels": '<i class="im im-tv"></i>'
        //    , "kitchen": '<i class="im im-kitchen"></i>'
        //    , "bar": '<i class="im im-bar"></i>'
        //};
        //function searchIconFacility(key, val)
        //{
        //    var obj = vm.iList;
        //    function getObjects(obj, key, val) {
        //        var objects = [];
        //        for (var i in obj) {
        //            if (!obj.hasOwnProperty(i)) continue;
        //            if (typeof obj[i] == 'object') {
        //                objects = objects.concat(getObjects(obj[i], key, val));
        //            } else if (i == key && obj[key] == val) {
        //                objects.push(obj);
        //            }
        //        }
        //        return objects;
        //    }

        //}

        function showHotelPhotos(hotelSpecification)
        {

            //console.log("show specification event");
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: "app/hoteldetail/hotelspecification.tmpl.html?v=3.10",
                controller: 'hotelspecificationController',
                controllerAs: 'vm',
                size: "lg",
                scope: $scope,
                backdrop: 'static',
                keyboard: false,
                resolve: {
                    specification: function () {
                        return hotelSpecification;
                    },
                    culture: function () {
                        return vm.culture;
                    }
                }
            });
            modalInstance.result.then(function (data) {
                if( data=="book")
                {
                    HotelRoomBook();
                }
            }, function () {
                console.info('Modal dismissed at: ' + new Date());
            });


        }
        function GetRecent() {
            var culture = $cookies.get("lang");
            //userId = $cookies.get("userId");

            //if (userId == null || userId == "" || userId == undefined) {
            //    if ($cookies.get("UserCookies") != null && $cookies.get("UserCookies") != undefined)
            //        userId = $cookies.get("UserCookies");
            //    else
            //        userId = 0;
            //}
            getRecentlyviewdHotels(culture, vm.userId)
        }

        //vm.selectView = false; //   make this vm.selectView=true when your promise get resolve
        //$scope.$watch('vm.selectView', function (newValue, oldValue) {
        //    $scope.$broadcast('MarqueesliderDataChangeEvent');
        //});

        $scope.slideshow = function runSlideshow() {
                setTimeout(function () {
                    $('.gallery-slideshow').slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        speed: 500,
                        arrows: true,
                        fade: true,
                        autoplay: true,
                        autoplaySpeed: 2000,
                        asNavFor: '.gallery-nav'
                    });

                    //alert("Gallery Slideshow - slick1")
                    $('.gallery-nav').slick({
                        slidesToShow: 7,
                        slidesToScroll: 1,
                        speed: 500,
                        asNavFor: '.gallery-slideshow',
                        dots: false,
                        centerMode: true,
                        focusOnSelect: true,
                        infinite: true,
                        responsive: [
                            {
                                breakpoint: 1199,
                                settings: {
                                    slidesToShow: 7,
                                }
                            },
                            {
                                breakpoint: 991,
                                settings: {
                                    slidesToShow: 5,
                                }
                            },
                            {
                                breakpoint: 767,
                                settings: {
                                    slidesToShow: 5,
                                }
                            },
                            {
                                breakpoint: 480,
                                settings: {
                                    slidesToShow: 3,
                                }
                            }
                        ]
                    });


            }, 800);
        }


        function getHotelSlideShowImage(culture, hotelId) {
            hoteldetailService.getHotelSlideShowImage(culture, hotelId).then(function (response) {
                //console.log("getHotelSlideShowImage");
                vm.hotelImage = response;
                //runSlieshow();
            }).catch(function (error) {

            })
        }

        function getReservationReviews(culture, hotelId) {
            hoteldetailService.getReservationReviews(culture, hotelId).then(function (response) {
                vm.hotelReservationReviews = response;
            }).catch(function (error) {

            })
        }
        function getHoteldetailTextMessage(culture, messageCode, labelId) {
            hoteldetailService.getHoteldetailTextMessage(culture, messageCode, labelId).then(function (response) {
                vm.hoteldetaillabel = response;
            }).catch(function (error) {

            })
        }
        function getSummary(culture, hotelId) {
            hoteldetailService.getSummary(culture, hotelId).then(function (response) {
                vm.hotelSummary = response;
            }).catch(function (error) {

            })
        }
        function getHotelBasicInfo(culture, hotelId) {
            hoteldetailService.getHotelBasicInfo(culture, hotelId).then(function (response) {
                vm.hotelInfo = response;
                getHotelMainregion($cookies.get("lang"), hotelId, vm.hotelInfo[0].RegionID, vm.hotelInfo[0].CountryID)
            }).catch(function (error) {
                toastr.error(error.message);
            })
        }

        //call for new policy here
        function getHotelPolicy(hotelId) {
            hoteldetailService.getHotelPolicy(hotelId).then(function (response) {
                if(response)
                vm.newpolicy = response;
                
            }).catch(function (error) {
                //toastr.error(error.message);
                console.log("error: get policy exception")
            })
        }
        function getHotelSpecifications(culture, hotelId) {
            hoteldetailService.getHotelSpecifications(culture, hotelId).then(function (response) {
                vm.hotelSpecification = response;
            }).catch(function (error) {

            })
        }
        function getAllReviews(culture, hotelId) {
            hoteldetailService.getAllReviews(culture, hotelId).then(function (response) {
                vm.hotelAllReview = response;
            }).catch(function (error) {

            })
        }
        function getTypeReview(culture) {
            hoteldetailService.getTypeReview(culture).then(function (response) {
                vm.hotelReviewType = response;
            }).catch(function (error) {

            })
        }

        //use to booking selected Hotel
        function hotelBooking() {

            // Comment it- No need to default Hotel Room selected on avaialbility load
            // Date: 15-Nov-2016
            //if (!vm.initCallBook)
            //{
            //    //trigger to set initial object of the 
            //    if ($("#roomCount1_" + vm.initRoomObj).length)
            //        $("#roomCount1_" + vm.initRoomObj).trigger("click");
            //}

            var culture = $cookies.get("lang");
             
            var hd = vm.hotelInfo[0];
            //Note: we have to choose availablity object based on the selection of the HotelRoom from Chooseavailability data.
           // var hd_available = vm.hotelAvaibility[0];// changed it..
            var json = {
                cultureid: culture,
                checkdatefrom: moment(vm.confirm_CheckInDate1).format("DD-MMM-YYYY"),
                checkdateto: moment(vm.confirm_CheckOutDate1).format("DD-MMM-YYYY"),
                hotelcity: hd.CityName,
                hotelid: hd.Id,
                address: hd.Address,
                mainphotoname: hd.MainPhotoName,
                hotelclass: hd.HotelClassValue,
                hotelname: hd.RoutingName,
                roomid: vm.selectedHotelRoomIDs.join(","),
                 uniqueid: vm.selectedHotelUniqeIDs.join(","),
                 accommodationtypeid: getHotelConfirmData("AccommodationTypeID"),
                 accommodationtypename: getHotelConfirmData("AccommodationTypeName"),
                 accommodationtypedescription: getHotelConfirmData("AccommodationTypeDescription"),
                 pricepolicytypeid: getHotelConfirmData("PricePolicyTypeID"),
                 pricepolicytypename: getHotelConfirmData("PricePolicyTypeName"),
                 singlerate: getHotelConfirmData("SingleRate"),
                 doublerate: getHotelConfirmData("DoubleRate"),
                 dailyroomprices: getHotelConfirmData("DailyRoomPrices"),
                 originalroomprice: getHotelConfirmData("OriginalRoomPrice"),
                 currencyid: getHotelConfirmData("CurrencyID"),
                 currencysymbol: getHotelConfirmData("CurrencySymbol"),
                 roomcount: vm.selectedRoomCountArray.join(","),
                 maxpeoplecount: getHotelConfirmData("MaxPeopleCountval"),
                 roomprice: getHotelConfirmData("RoomPrice"),
                 currencycode: getHotelConfirmData("CurrencyCode"),
                 hoteltypename: getHotelConfirmData("HotelTypeName"),
                 pricetype: getHotelConfirmData("PriceType"),
                 creditcardnotrequired: getHotelConfirmData("CreditCardNotRequired"),
                 currentcurrency: vm.selectedRoomsCurrencySymbol
            }
            
            //service call and redirect to Booking final URL
            storeHotelRoomInfo(json);
        }

        function storeHotelRoomInfo(json)
        {
            vm.storeHotelConfirms = json;
            hoteldetailService.storeHotelRoomInfo(
                                    json.cultureid,
                                    json.checkdatefrom,
                                    json.checkdateto,
                                    json.hotelcity,
                                    json.hotelid,
                                    json.address,
                                    json.mainphotoname,
                                    json.hotelclass,
                                    json.hotelname,
                                    json.roomid,
                                    json.uniqueid,
                                    json.accommodationtypeid,
                                    json.accommodationtypename,
                                    json.accommodationtypedescription,
                                    json.pricepolicytypeid,
                                    json.pricepolicytypename,
                                    json.singlerate,
                                    json.doublerate,
                                    json.dailyroomprices,
                                    json.originalroomprice,
                                    json.currencyid,
                                    json.currencysymbol,
                                    json.roomcount,
                                    json.maxpeoplecount,
                                    json.roomprice,
                                    json.currencycode,
                                    json.hoteltypename,
                                    json.pricetype,
                                    json.creditcardnotrequired,
                                    json.currentcurrency
                ).then(function (response) {
                    vm.hotelBookingConfirm = response;
                    //console.log(vm.hotelBookingConfirm);
                    vm.hotelBookingConfirm.pricetype = vm.storeHotelConfirms.pricetype;
                    vm.hotelBookingConfirm.roomcount = vm.storeHotelConfirms.roomcount;
                    vm.hotelBookingConfirm.roomid = vm.storeHotelConfirms.roomid;
                    vm.hotelBookingConfirm.pricepolicytypeid = vm.storeHotelConfirms.pricepolicytypeid;

                    //set has discount object if not empty
                    vm.hotelBookingConfirm.hasDiscount = vm.hasDiscount;

                    //set store confirm objects for ChangeDate function at booking module.
                    if (vm.storeHotelConfirms)
                        vm.hotelBookingConfirm.storeHotelConfirms = vm.storeHotelConfirms;

                    //check value must be > 0
                    if (vm.hotelBookingConfirm.total && vm.hotelBookingConfirm.total > 0) {
                        //set below for object for hotelbooking
                        setSelectedHotel(vm.hotelBookingConfirm);

                        //set discount for next bookcontroller state
                        vm.storeHotelConfirms.hasdiscount = vm.hasDiscount;

                        //var base64EncodedString = $base64.encode(JSON.stringify(vm.storeHotelConfirms));
                        //var str_storeHotelConfirms = encodeURIComponent(base64EncodedString);

                        $state.go("master.gbs.book",
                            //{ confirmbook: str_storeHotelConfirms }
                            {
                                cultureid                       : encode_params( vm.storeHotelConfirms.cultureid                   ),
                                checkdatefrom                   : encode_params( vm.storeHotelConfirms.checkdatefrom               ),
                                checkdateto                     : encode_params( vm.storeHotelConfirms.checkdateto                 ),
                                hotelcity                       : encode_params( vm.storeHotelConfirms.hotelcity                   ),
                                hotelid                         : encode_params( vm.storeHotelConfirms.hotelid                     ),
                                address                         : encode_params( vm.storeHotelConfirms.address                     ),
                                mainphotoname                   : encode_params( vm.storeHotelConfirms.mainphotoname               ),
                                hotelclass                      : encode_params( vm.storeHotelConfirms.hotelclass                  ),
                                hotelname                       : encode_params( vm.storeHotelConfirms.hotelname                   ),
                                roomid                          : encode_params( vm.storeHotelConfirms.roomid                      ),
                                uniqueid                        : encode_params( vm.storeHotelConfirms.uniqueid                    ),
                                accommodationtypeid             : encode_params( vm.storeHotelConfirms.accommodationtypeid         ),
                                accommodationtypename           : encode_params( vm.storeHotelConfirms.accommodationtypename       ),
                                accommodationtypedescription    : encode_params( vm.storeHotelConfirms.accommodationtypedescription),
                                pricepolicytypeid               : encode_params( vm.storeHotelConfirms.pricepolicytypeid           ),
                                pricepolicytypename             : encode_params( vm.storeHotelConfirms.pricepolicytypename         ),
                                singlerate                      : encode_params( vm.storeHotelConfirms.singlerate                  ),
                                doublerate                      : encode_params( vm.storeHotelConfirms.doublerate                  ),
                                dailyroomprices                 : encode_params( vm.storeHotelConfirms.dailyroomprices             ),
                                originalroomprice               : encode_params( vm.storeHotelConfirms.originalroomprice           ),
                                currencyid                      : encode_params( vm.storeHotelConfirms.currencyid                  ),
                                currencysymbol                  : encode_params( vm.storeHotelConfirms.currencysymbol              ),
                                roomcount                       : encode_params( vm.storeHotelConfirms.roomcount                   ),
                                maxpeoplecount                  : encode_params( vm.storeHotelConfirms.maxpeoplecount              ),
                                roomprice                       : encode_params( vm.storeHotelConfirms.roomprice                   ),
                                currencycode                    : encode_params( vm.storeHotelConfirms.currencycode                ),
                                hoteltypename                   : encode_params( vm.storeHotelConfirms.hoteltypename               ),
                                pricetype                       : encode_params( vm.storeHotelConfirms.pricetype                   ),
                                creditcardnotrequired           : encode_params( vm.storeHotelConfirms.creditcardnotrequired       ),
                                currentcurrency                 : encode_params( vm.storeHotelConfirms.currentcurrency             ),
                                hasdiscount: (vm.hasDiscount? encode_params(vm.hasDiscount):"")
                        }
                        );
                    }
                    else {
                        toastr.error("total value can't be zero, try again!");
                    }

                }).catch(function (error) {
                    console.log(error);
                });
        }
        //Encode URL parameter to encrypted format
        function encode_params(obj)
        {
            return encodeURIComponent(base64.urlencode($.trim(obj)));
        }
        function getHotelsLocationByHotelID(culture, hotelId) {
            hoteldetailService.getHotelsLocationByHotelID(culture, hotelId).then(function (response) {
                vm.hotelcordinate = response;
            }).catch(function (error) {

            })
        }

        //function to use bind policy , facility area on load
        function getRoomAvailabilityDetails(culture, hotelId, currentCurrency) {
            hoteldetailService.getRoomAvailabilityDetails(culture, hotelId, currentCurrency).then(function (response) {
                vm.hotelRoomAvailability = response;
                vm.hotelPolicy = [];
                if (vm.hotelRoomAvailability.HotelRoomCondition != null) {
                    $.each(vm.hotelRoomAvailability.HotelRoomCondition, function (key, value) {
                        if (value.HotelRoomCondition[0].AttributeTypeID == "2") {
                            vm.hotelPolicy.push(value);
                        }
                    });
                }
                //need to set to map
            }).catch(function (error) {

            })
        }
        //function filter_hotelpolicy()
        //{
        //    if(vm.hotelRoomAvailability.HotelRoomAvailability)
        //    {

        //    }
        //}
        //vm.policyFilter = function (item) {
        //    debugger;
        //    return item.RoomDataTableType == "RoomCarddetails";
        //};
        vm.attID = function (r) {
            return attID.HotelRoomCondition[0].AttributeTypeID == 1;
        };
        function getRecentlyviewdHotels(culture, userId) {
            searchHotelService.getRecentlyviewdHotels(culture, userId).then(function (response) {
                vm.recentlyViewedHotel = response;

              
                //noty.closeAll();
                //for(var i=0;i<vm.recentlyViewedHotel.length;i++)
                //{
                //    //noty.show1(getHTML(vm.recentlyViewedHotel[i]), 'alert');
                //}
                 
              //  for (var i = 0; i < (vm.recentlyViewedHotel.length>2?2:vm.recentlyViewedHotel.length); i++) {

                    // Hide toaster notification as per EMAD 
                    //    toastr.success(getHTML(vm.recentlyViewedHotel[i]), '', {
                    //    closeButton: true,
                    //    positionClass: 'toast-bottom-left',
                    //    //closeHtml: '<button onclick=callDismiss("'+vm.recentlyViewedHotel[i].SearchId+'")>x</button>',
                    //    //dismissOnClick: callDismiss(vm.recentlyViewedHotel[i].SearchId),
                    //    onDismiss: onDismiss,
                    //    preventDuplicates: true,
                    //    newestOnTop: true,
                    //    debug: false,
                    //    "hideDuration": "1500",
                    //    "extendedTimeOut": "5000",
                    //    "showDuration": "300",
                    //    progressBar:true,
                    //    "timeOut": "5000",
                    //    "onclick": function () {  },
                    //    dismissOnTimeout: false,
                    //    className:'success recentToast'
                    //}); 
                //}

                //setTimeout(function () {
                //    $("ul#recentseen > li").each(function (i, o) {
                //        noty.show($(o).html(), 'information');
                //    });
                //}, 2500);

            }).catch(function (error) {
                console.log(error.message);
            })
        }
        function callDismiss(obj) {
            console.log('dismissOnClick ' + obj);
            DeleteMyViewedHotels(obj);
        }
        function onDismiss() {
            console.log('onDismiss');
        }
        //$scope.$on('$viewContentLoaded', function () {
        //    //SomeSerive.getHistory().then(function (data) {
        //    //    $scope.requiedData = data;
        //    //    $rootScope.$broadcast("history-updation");
        //    //});
        //});
        //directly get from html
        function getHTML(val)
        {
            return  "<ul class='booking-list'>\
                         <li class='relative' >\
                             <div class='booking-item booking-item-small alt-booking-item-title'>\
                                <div class='row gap-15'>\
                                    <div class='col-xs-4 col-md-4'>\
                                        <img src='"+val.MainPhotoName+"'>\
                                    </div>\
                                    <div class='col-xs-8 col-md-8'>\
                                        <ul class='icon-group booking-item-rating-stars'>\
                                            <li 'style=display:" + ( val.IsPreferred == 'True' ? '':'none' ) + "'><img src='/Images/preferred.png'></li>\
                                            <li>\
                                                "+val.HotelClass +"\
                                            </li>\
                                        </ul>\
                                        <h5 class='booking-item-title'>\
                                            <a target='_blank' href='/#/hoteldetail?hotelId=" + val.Id + "&hotelname=" + escape(val.Name) + "' >\
                                            "+val.Name+"\
                                            </a>\
                                        </h5><p class='thumb-location'>\
                                            <span class='font700'><i class='fa fa-map-marker'></i> "+val.CityName+" </span> -  "+val.ClosestAirportDistance+ 'Km From '+ val.ClosestAirportName+"\
                            </p>\
                            <p class='font-italic' 'style=display:" + (val.AverageReviewPoint == undefined ? 'none' : '') + "' >\
                                <span class='booking-item-rating-number'>\
                                    " + val.ReviewTypeScaleName + " " + val.AverageReviewPoint + "\
                            </span> - <small>("+val.ReviewCount+ " "+ val.Reviews+")</small>\
                        </p>\
                        </div>\
                    </div>\
                    </div>\
                    <a class='hidden' onclick='vm.DeleteMyViewedHotels(&quote;" + val.SearchId + "&quote;)' class='notification-close'><i class='fa fa-times'></i></a>\
                 </li>\
                </ul>";
        }
        function getPromoHtml(i)
        {
            return "<div class='booking-item booking-item-small alt-booking-item-title'>\
                    <div class='row gap-15'>\
                        <div class='col-xs-12 col-md-12'>\
                            You will get " + vm.hotelPromotion[i].DiscountPercentage + "% discount on Room " + vm.roomTitle[i] + "\
                        </div>\
                    </div>\
                </div>";
        }
        function DeleteMyViewedHotels(Id) {
            searchHotelService.DeleteMyViewedHotels(Id, userId).then(function (response) {
                GetRecent();
                console.log('deleted' + Id);
            }).catch(function (error) {

            })
        }
        function getHotelMainregion(CurrentCulture, HotelID, RegionID, CountryID) {
            hoteldetailService.getHotelMainregion(CurrentCulture, HotelID, RegionID, CountryID).then(function (response) {
                vm.distance = response;
            }).catch(function (error) {

            })
        }
      
        function setSelectedHotel(obj) {
            hoteldetailService.setSelectedHotel(obj);
        }
        function changecurrency(currency) {
            if (currency) {
                $cookies.put("currency", currency.CurrencyCode, { expires: GBSHelper.helpers.getCookieExpire() })
                vm.currentCurrency = currency;
            }
            $state.reload();
        }
        function setCurrency() {
            var currCurrrency = $cookies.get("currency");
            if (currCurrrency == undefined) {
                $cookies.put("currency", "EUR", { expires: GBSHelper.helpers.getCookieExpire() });
                currCurrrency = "EUR";
                _.each(vm.currency, function (currency) {
                    if (currCurrrency == currency.CurrencyCode) {
                        vm.currentCurrency = { CurrencyName: currency.CurrencyName, CurrencySymbol: currency.CurrencySymbol };
                    }
                });
            } else {
                _.each(vm.currency, function (currency) {
                    if (currCurrrency == currency.CurrencyCode) {
                        vm.currentCurrency = { CurrencyName: currency.CurrencyName, CurrencySymbol: currency.CurrencySymbol };
                    }
                });
            }
        }
        function scrolltoHref($event) {

            var obj = $event.target;

            var href = $(obj).data("href"),
                    offsetTop = href === "#" ? 0 : $(href).offset().top - 60;
            // offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
            $('html, body').stop().animate({
                scrollTop: offsetTop
            }, 300);
            $event.preventDefault();
        }

        // copied HotelRoomBook function from MVC app : by Abhishek
        function HotelRoomBook() {
            try{ 
                // var obj = $event.target;
                var obj = $("#divAvailableRooms");
                var href = $(obj).data("href"), offsetTop = href === "#" ? 0 : $(href).offset().top - 60;
                $('html, body').stop().animate({
                    scrollTop: offsetTop
                }, 300);
                //$event.preventDefault();
            }
            catch(ert)
            {
                console.log(ert);
            }
        }
        function updateHotelSearchHistory(userId, hotelId) {
            hoteldetailService.updateHotelSearchHistory(userId, hotelId).then(function (response) {
                if (response) {
                    if (response.substring(0, 5) == "GUEST")
                        $cookies.put('UserCookies', response, { expires: GBSHelper.helpers.getCookieExpire() });
                    else
                        $cookies.put("userId", response, { expires: GBSHelper.helpers.getCookieExpire() });
                }
                GetRecent();

            }).catch(function (error) {

            })
        }
        function getCurrencyLoad(culture) {
            return topNavigationService.getCurrencyLoad(culture).then(function (response) {
                vm.currency = response;
                setCurrency();
                //call after currency checked and load accurate
                getRoomAvailabilityDetails(culture, vm.hotelId, $cookies.get("currency"));
                $scope.$broadcast('dataloaded');
            }).catch(function (err) {
                console.log(err);
            })
        }
        function checkRoomAvailability() {

            clearRoomAvailability();

            var culture = $cookies.get("lang");
            var hotelId = $stateParams.hotelId;
            var dateFrom = moment(vm.CheckInDate1.date).format("DD/MM/YYYY");
            var dateTo = moment(vm.CheckOutDate1.date).format("DD/MM/YYYY");
            var currentCurrency = $cookies.get("currency");
            hoteldetailService.checkRoomAvailbility(culture, hotelId, dateFrom, dateTo, currentCurrency).then(function (response) {
                vm.hotelAvaibility = response;

                //check if discount has available.
                var localhasDisc="";
                for (var rs = 0; rs < response.length;rs++)
                {
                    var rsroom=response[rs].room;
                    for(var r =0; r<rsroom.length;r++ )
                    {
                        if(rsroom[r].PromotionPercentage)
                        {
                            localhasDisc = rsroom[r].PromotionPercentage;
                        }
                    }
                }
                if(localhasDisc!="")
                {
                    vm.hasDiscount = localhasDisc; 
                }

                checkHotelPromotion(culture, hotelId, dateFrom, dateTo);
                //create new object to make separate on after availabe Data
                vm.confirm_CheckInDate1 = vm.CheckInDate1.date;
                vm.confirm_CheckOutDate1 = vm.CheckOutDate1.date;
                //if (response.length > 0) {
                //    initRoomBookingobject(response[0].room[0]);
                //}
            }).catch(function (err) {

            })
           

        }
        function checkHotelPromotion(culture, hotelId, dateFrom, dateTo) {
                hoteldetailService.getHotelPromotion(culture, hotelId, dateFrom, dateTo).then(function (response) {
                    vm.hotelPromotion = response;
                    vm.roomIds = [];
                    vm.roomTitle = [];
                    if (vm.hotelAvaibility.length > 0)
                        for (var rs = 0; rs < vm.hotelAvaibility.length; rs++) {
                            var rsroom = vm.hotelAvaibility[rs].room;
                            if (rsroom[0].HotelTypeName) {
                                vm.roomTitle.push(rsroom[0].HotelTypeName);
                                vm.roomIds.push(rsroom[0].HotelRoomID)
                            }
                        }
                      // show promition pop up
                    for(var i=0;i<vm.hotelPromotion.length;i++){ 
                        toastr.success(getPromoHtml(i), 'Promotions', {
                            closeButton: true,
                            positionClass: 'toast-bottom-left pr_pop',
                            onDismiss: onDismiss,
                            preventDuplicates: true,
                            newestOnTop: true,
                            debug: false,
                            "hideDuration": "2500",
                            "extendedTimeOut": "5000",
                            "showDuration": "300",
                            progressBar: true,
                            "timeOut": "5000",
                            "onclick": function () { },
                            dismissOnTimeout: false,
                            className: 'success recentToast'
                        });
                    }
                }).catch(function (err) {

                });
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
        function showDropdown($event) {
            var $this = $($event.target).data("rel");
            var $pre_id = $this.split('_')[0];
            var $index = $this.split('_')[1];
            var $select = $("#dropRoomcount_" + $this);
            if (parseInt($($event.target).val()) > 3)
            {
                $select.removeClass("hidden");
                $select.val(parseInt($($event.target).val()));
                $("#dvRoomradio_" + $this).addClass("hidden");
                UpdateRoomCountListsRadio($event);
            }
            //vm.showroomCountDropdown = true;
            //vm.showroomCountDropdown[$pre_id][$index] = true;
        }
        //function roomCountChange() {
        //    $("#roomCount1").removeClass("active");
        //    $("#roomCount2").removeClass("active");
        //    $("#roomCount3").removeClass("active");
        //    switch (vm.roomCount) {
        //        case "1":
        //            $("#roomCount1").addClass("active");
        //            break;
        //        case "2":
        //            $("#roomCount2").addClass("active");
        //            break;
        //        case "3":
        //            $("#roomCount3").addClass("active");
        //            break;
        //        default:
        //            break;
        //    }
        //}
        function functionIHadToChange($element, value) {
            // other code
            //$element.find("option").filter(function () {
            //    return (($(this).val() == value) || ($(this).text() == value))
            //}).prop('selected', true);
            $element.val(value);
            //$element.find("option[value='"+value+"']").attr("selected", true);
        }

        function UpdateRoomCountListsRadio($event)
        {
             
            // Comment it- No need to default Hotel Room selected on avaialbility load
            // Date: 15-Nov-2016
            //if (!vm.initCallBook) {
            //    //set initial DROPDOWN object  
            //    functionIHadToChange($("#dropRoomcount_" + vm.initRoomObj), 1);
            //}

            vm.initCallBook = true;
            var prefix = "#dvRoomselection_";
            var $this = $($event.target).data("rel");
            var $pre_id = $this.split('_')[0];
            var $index = $this.split('_')[1];
             
            var roomcount = $($event.target).val();
            var $select = $("#dropRoomcount_" + $this);
            $(prefix+$this).find("input:radio").parent("label.btn-primary").not($($event.target).parent("label.btn-primary")).removeClass("active");

            if ($($event.target).parent("label.btn-primary").hasClass("active"))
            {
                $($event.target).parent("label.btn-primary").removeClass("active");
                //if(vm.selectedRoomsPrice>0)
                //{
                //    vm.selectedRoomsPrice -= (parseFloat($select.data("roomprice")) * parseInt(roomcount));
                //}
                roomcount = 0;
                functionIHadToChange($select, roomcount);
            }
            else
            {
                roomcount = $($event.target).val();
                functionIHadToChange($select, roomcount);
                $($event.target).parent("label.btn-primary").addClass("active");
                functionIHadToChange($select, roomcount);
                //if (roomcount > 0) {
                //    vm.selectedRoomsPrice += (parseFloat($select.data("roomprice")) * parseInt(roomcount));
                //}
            }
            /*
            //$(prefix+$this).find("input:radio").parent("label.btn-primary").removeClass("active");
            //$($event.target).parent("label.btn-primary").addClass("active");
           
            var roomcount = $($event.target).val();
            var $select = $("#dropRoomcount_" + $this);
            //$select.val("'" + roomcount + "'");
            //$select.find("option:selected").val(roomcount);
            functionIHadToChange($select, roomcount);
            //$select.prop('selectedIndex', 0);

          //  vm.bookRoomCount[$pre_id][$index] = roomcount;
             */
            
            var sublisting = $('div[id^="dvRoomselection_"]');
            vm.selectedRooms = 0;
            vm.selectedRoomsPrice = 0;

            //reset currency
            vm.selectedRoomsCurrencySymbol = $cookies.get("currency");

            vm.selectedHotelRoomIDs = [];
            vm.selectedHotelUniqeIDs = [];
            vm.selectedRoomCountArray = [];
            $.each(sublisting, function (id, obj) {
                var $this = $(obj).data("rel");
                var $uniquID = $(obj).data("uniq");
                var $index = $this.split('_')[1];
                var $pre_id = $this.split('_')[0];

                //$(obj).find("input:radio").parent("label.btn-primary").removeClass("active");
                //$($event.target).parent("label.btn-primary").addClass("active");
               //var roomcount = vm.bookRoomCount[$index][$pre_id];
                var $select = $("#dropRoomcount_" + $this);
                if ($select.val() != undefined) {
                    var roomcount = $select.val();
                 
                    if (roomcount > 0) {
                        vm.selectedRoomCountArray.push(roomcount);
                        vm.selectedRooms += parseInt(roomcount);
                        vm.selectedRoomsPrice += $select.data("roomprice") * roomcount;
                        vm.selectedHotelRoomIDs.push($pre_id);
                        vm.selectedHotelUniqeIDs.push($uniquID);
                    }
                }

            }); 
            
            //var current = $this.parent("label.btn-primary");
            //current.addClass("active");

            //clear class
            //$(prefix + $this).find("input:radio").parent("label.btn-primary").removeClass("active");
            //$($event.target).parent("label.btn-primary").addClass("active");
            //$("#dvRoolselection").siblings("label.btn-primary").not(current).removeClass("active");

           // vm.bookRoomCount[$pre_id][$index] = roomcount;
            //vm.selectedRooms += roomcount;
            //vm.selectedRoomsPrice = $(obj).data("price") * vm.selectedRooms;
        }

        // clear initial objects 
        function clearRoomAvailability()
        {
            vm.selectedRooms = 0;
            vm.selectedRoomsPrice = 0;
            vm.selectedHotelRoomIDs = [];
            vm.selectedHotelUniqeIDs = [];
            vm.selectedRoomCountArray = [];
            vm.initCallBook = false;
            vm.initRoomObj = "";

            //clear has discount object
            vm.hasDiscount = "";

            vm.confirm_CheckOutDate1 = null;
            vm.confirm_CheckInDate1 = null;
        }

        // Comment it- No need to default Hotel Room selected on avaialbility load
        // Date: 15-Nov-2016
        // set initial selection objects
        /*function initRoomBookingobject(res) {
            
            vm.initRoomObj = res.HotelRoomID + "_0";
            //set initial room and values
            vm.selectedRooms = 1;
            vm.selectedRoomCountArray.push(1);
            vm.selectedRoomsPrice = res.ConvertedRoomPrice;
            // comment due to trigger iniital room selected object click triggered from this function
            //functionIHadToChange($("#dropRoomcount_" + res.HotelRoomID + "_0"), 1);
            vm.selectedHotelUniqeIDs.push(res.UniqueID);
            vm.selectedHotelRoomIDs.push(res.HotelRoomID);
        }*/

        var getHotelConfirmData = function (strReturn) {
            var uniqID = vm.selectedHotelUniqeIDs;
            var retRes = [];
            for (var i = 0 ; i < vm.hotelAvaibility.length ; i++) {
                var ha = vm.hotelAvaibility[i].room;
                for (var j = 0 ; j < ha.length ; j++)
                {
                    var ha_room = vm.hotelAvaibility[i].room[j];
                    if (include(uniqID, ha_room["UniqueID"]))
                    {
                        retRes.push(ha_room[strReturn]);
                    }
                }
            }
            return retRes.join(",");
        };
        ///search object
        function include(arr, obj) {
            var stricmp = arr.toString().toLowerCase(); // returns 
            return (stricmp.indexOf(obj.toLowerCase()) > -1);
            //return (arr.indexOf(obj) != -1);
        }

        function UpdateRoomCountLists($this) {
            //var $this = $event.target;
            //var roomcount = $(obj).find("input:radio").val();
            //var current = $this.parent("label.btn-primary");
            //current.addClass("active");
            //$("#dvRoolselection").siblings("label.btn-primary").not(current).removeClass("active");
            //vm.selectedRooms += roomcount;
            //vm.selectedRoomsPrice = $(obj).data("price") * vm.selectedRooms;
            //vm.selectedRoomsCurrencySymbol = $cookies.get("lang");
            var $event = { target: $("#"+$this) };
            UpdateRoomCountListsRadio($event);
        }

        function insertIntoWishlist($event)
        {
            var $this = $event.target;
            var userId = vm.userId;
            if (userId && vm.hotelId) {
                hoteldetailService.insertIntoWishlist(userId, vm.hotelId).then(function (response) {
                    //console.log("update to wishlist" + response);
                    // $($this).find("i:first").toggleClass("bg_green");
                    vm.iswishlisted = response.toLowerCase()=="add" ? true : false;
                }).catch(function (error) {

                });
            }
            else {
                console.log('something going wrong, hotelId not found!');
            }
        }

        function checkuserWishlistStaus() {
            var userId = vm.userId;
            if (userId && vm.hotelId) {
                hoteldetailService.checkuserWishlistStaus(userId, vm.hotelId).then(function (response) {
                    //console.log("check to wishlist");
                    vm.iswishlisted = response > 0 ? true : false;
                }).catch(function (error) {

                });
            }
            else {
                console.log('something going wrong, hotelId not found!');
            }
        }
        //hide loader
        //setTimeout(
        //  function () {
        //      $rootScope.isShowLoader = false;
        //  }, 800);

        //$scope.$on('$viewContentLoaded', 
        //function (event) {
        //    console.log("hotel details $viewContentLoaded");
        //    setTimeout(
        //      function () {
        //          $rootScope.isShowLoader = false;
        //      }, 800);
        //});

        $(window).resize(function () {
             
            var width = $(window).innerWidth();
            //alert(width)
            if (width < 765) {
                $('#ulCurrencylist').css({
                    width: '200px'

                });
                if (document.getElementById("ulCurrencylist"))
                document.getElementById("ulCurrencylist").style.marginLeft = "45px";


            }
            else if (width > 765) {

                $('#ulCurrencylist').css({
                    width: '600px'
                });
                if (document.getElementById("ulCurrencylist"))
                document.getElementById("ulCurrencylist").style.marginLeft = "-540px";

    }
            if (width > 965) {
                //alert("ji1")
                $("#divRoomCountPlusPrice").removeClass("pull-left").addClass("pull-right");
            }
            else if (width < 965) {
                // alert("ji")
                $("#divRoomCountPlusPrice").removeClass("pull-right").addClass("pull-left");
            }
        });


        $scope.initDropsize = function () {


            var width = $(window).innerWidth();
            if (width < 765) {
                $('#ulCurrencylist').css({
                    width: '200px'
                });
                if (document.getElementById("ulCurrencylist"))
                document.getElementById("ulCurrencylist").style.marginLeft = "45px";

            }
            else if (width > 765) {

                $('#ulCurrencylist').css({
                    width: '600px'
                });
                if (document.getElementById("ulCurrencylist"))
                    document.getElementById("ulCurrencylist").style.marginLeft = "-540px";
            }

            if (width > 965) {
                $("#divRoomCountPlusPrice").removeClass("pull-left").addClass("pull-right");
            }
            else if (width < 965) {
                $("#divRoomCountPlusPrice").removeClass("pull-right").addClass("pull-left");
            }


        }
      
    }

   
    angular
    .module("hoteldetail")
    .controller("hoteldetailController", hoteldetailController)
     //item-pop-up-slick to bind slide show
    .directive('itemPopUpSlick', [
                '$timeout', '$rootScope',
                function ($timeout, $rootScope) {
                    return {
                        link: function ($scope, $element, attrs) {
                 
                            //console.log("itemPopUpSlick");
                            $scope.showslick = false;
                            //$scope.imgs = angular.extend([], $scope.item.global.galery);
                            $scope.slideshow();
                            $scope.showslick = true;
                            //$rootScope.$on("itemimgschanged", function (val1, val2) {
                            //    if ($scope.showslick) {
                            //        $('#slider-for').slick('unslick');
                            //        $('#slider-nav').slick('unslick');
                            //    }
                            //    $scope.showslick = false;
                            //    $timeout((function () {
                            //        $scope.imgs = angular.extend([], $scope.gitem.global.galery);
                            //        startSlick()
                            //    }), 1);
                            //});

                        }
                    };
                }])
    .run(function ($rootScope) {
        //console.log("run hdetails");
        //$rootScope.hotelname = unescape(getUrlParameter("hotelname")).trunc(20);
        $rootScope.isShowLoader = true;
    });
    hoteldetailController.$inject = ["$uibModal","$state", "$cookies", "$stateParams", "hoteldetailService", "searchHotelService", "NgMap", "topNavigationService", "$rootScope", "$scope", "cssInjector", "base64"];


    //for hotel specifications
    function hotelspecificationController($uibModalInstance, hoteldetailService, $rootScope, $scope, specification, culture) {
        var vm = this;
        // get from resolved
        var items = {
            specification: specification,
            culture: culture
        };

        vm.hotelspecification = items.specification;
        vm.HotelId = items.specification.HotelID;
        vm.RoomId = items.specification.HotelRoomID;
        vm.culture = items.culture;
        vm.PopUpBookNow = PopUpBookNow;

        $scope.options = {
            width: '100%',
            height: 600,
            loop: true,
            keyboard: true,
            nav: 'thumbs'
        }
        vm.HclosePopup = HclosePopup;

        activateSpe();
        function activateSpe() {
            //set RoomId
            hoteldetailService.getHotelRoomPopUpDetails(vm.RoomId, vm.culture, vm.HotelId).then(function (response) {
                vm.h_specifications = response;
                vm.photos = [];
                vm.icons = [];
                vm.BedTypeName = [];
                for (var i = 0; i < vm.h_specifications.length; i++) {
                    if (vm.h_specifications[i].MainPhotoName != null)
                        vm.photos.push(vm.h_specifications[i].MainPhotoName);
                    if (vm.h_specifications[i].Icon != null)
                        vm.icons.push({ icon: vm.h_specifications[i].Icon, facilityname: vm.h_specifications[i].FacilityName });
                    if (vm.h_specifications[i].BedTypeNameWithCount != null )
                        vm.BedTypeName.push(vm.h_specifications[i].BedTypeNameWithCount);
                }
                //removeDuplicates(vm.BedTypeName[vm.BedTypeName.length-1]);
                vm.BedTypeName = vm.BedTypeName[vm.BedTypeName.length - 1];
                $scope.items = [];
                for (var i = 0; i < vm.photos.length; i++) {
                    $scope.items.push( {
                        url: vm.photos[i],
                        type: "image",
                        caption: ""
                    });
                } 
               // $scope.items = JSON.stringify($scope.items);

            }).catch(function (error) {

            });
        }
        function removeDuplicates(sdda) {
            var new_array = [];
            for (var i = 0; i < sdda.length; i++) {
                // convert current sentence to sorted, lowercase string
                var sen = sdda[i].split("<b>or</b>").sort().join(" ");


                var unique = [];
                (sen.split(" ")).forEach(function (text) {
                    if (unique.indexOf(text) < 0) {
                        unique.push(text);
                    }
                });

                if (new_array.indexOf(sen) == -1) {
                    // no matches, let's add it!
                    new_array.push(sen);
                    //  alert(sdda.push(sen))

                }

            }

            return new_array;
        }
        function HclosePopup() {
            //console.log("closing");
            $uibModalInstance.dismiss(true);
        }
        function PopUpBookNow() {
            $uibModalInstance.close('book');
        }

        $scope.$on('modal.closing', function (event, reason, closed) {
            console.log('modal.closing: ' + (closed ? 'close' : 'dismiss') + '(' + reason + ')');
            var message = "You are about to leave the edit view. Uncaught reason. Are you sure?";
            switch (reason) {
                // clicked outside
                case "backdrop click":
                    message = "Any changes will be lost, are you sure?";
                    break;

                    // cancel button
                case "cancel":
                    message = "Any changes will be lost, are you sure?";
                    break;

                    // escape key
                case "escape key press":
                    message = "Any changes will be lost, are you sure?";
                    break;
            }
            //if (!confirm(message)) {
            //    event.preventDefault();
            //}
        });

    };
    angular
   .module("hoteldetail")
   .controller("hotelspecificationController", hotelspecificationController);
    hotelspecificationController.$inject = [ "$uibModalInstance", "hoteldetailService", "$rootScope", "$scope","specification", "culture"];


})();