(function () {
    "use strict";
    //add dependency for angular bootstrap Lightbox
    function bookController($uibModal, $cookies, $stateParams, bookService, signInTitle, dontMissOutMessage, luckyDayMessgae, loginService, gbsHotelConfig, $state, base64, hoteldetailService, scope, Lightbox, topNavigationService) {
        var vm = this;

        vm.isDisabled = false;
        vm.bookHotel = bookHotel;
        vm.bookingObject = {};
        vm.signInTitle = signInTitle;
        vm.dontMissOutMessage = dontMissOutMessage;
        vm.luckyDayMessgae = luckyDayMessgae;
        vm.showLoginPopup = showLoginPopup;
        vm.ChangeBookingDate = ChangeBookingDate;
        // was created for the Changedate Controller & Popup
        //vm.showDateChangePopup = showDateChangePopup;
        vm.closePopup = closePopup;
        vm.changecardupdate = changecardupdate;
        vm.showTermsPopup = showTermsPopup;
        vm.selected_CVCLenth = 3;// initial set
        vm.printDiv = function (divName) {

            var printContents = document.getElementById(divName).innerHTML;
            var popupWin = window.open('', '_blank', 'left=0,top=0,toolbar=0,sta­tus=0');
            popupWin.document.open();
            popupWin.document.write(printContents);
            popupWin.document.close();
            popupWin.focus();
            popupWin.print();
        }
        //Lightbox
        vm.openLightboxModal = function (index) {
            Lightbox.openModal(scope.images, index);
        };

        vm.beforeRender = beforeRender_CheckInDate;
        vm.beforeRender_CheckOutDate = beforeRender_CheckOutDate;
        //vm.handleStripe = function (status, response) {
        //    if (response.error) {
        //        alert("Error: " + response.error)
        //        // there was an error. Fix it.
        //    } else {
        //        // got stripe token, now charge it or smt
        //        token = response.id;
        //        console.log(token);
        //    }
        //}
        function closePopup() {
            $uibModalInstance.dismiss(true);
        }
        vm.years = [];

      
        activate();
        function activate() {
            var culture = $cookies.get("lang");
            typeMonth(culture);
             
            var userId = $cookies.get("userId");
            if (userId == null || userId == "" || userId == undefined) {
                if ($cookies.get("UserCookies") != null || $cookies.get("UserCookies") != undefined) {
                    userId = $cookies.get("UserCookies");
                }
                else
                    userId = "";

                if (userId != "" && userId.split('&').length == 2) {
                    userId = userId.split('&')[1].split('=')[1];
                }
            }
            
            vm.LoggedUserID = userId;

            //getCurrencyLoad(culture).then(function () {
            //    debugger
            //    //get response from hotel details: By AB
            //    SelectedHotel(culture, userId);
            //}); 

            //get response from hotel details: By AB
            SelectedHotel(culture, userId);

            var arrId = "lblCharge,lblPropertyCurrency,lblYourCurency,Closebutton,Facebooklog,gmaillog,lblSelectHotel,lblBookingDetails,labelBookingSucessText,lblcheckinDate,lblcheckoutdate,lblyourdetails,lblrequiredFields,lbltitle,lblname,lblSurname," +
                         "lblEmail,lblPhone,lblCountry,lblcreditCardProvider,lblNameOntheCard,lblCreditcardNumber,lblExpirationDate," +
                         "lblcvvCode,lblreservationAgreement,lblLogintext,txtLoginEmail,txtLoginPassword," +
                         "lblLoginFailInvalidEmail,btnloginBook,lblReservationSucessMessage,lblReservationStatusText,lblReservationIDText," +
                         "lblOperationSucessMessage,lblPincodeText,btnbooknowReservation,lblBookingStartMessage,lblBestPrice,lblInstantConformation," +
                         "lblEmailGoesMessage,lblnightStayText,lblRoomNotFound,lblCreditcardNumberError,lblCVCCodeError,lblSelectCreditCardError,lblTermsCheckError,lblExpirationError";

            var arrMessageCode = "Charge,PropertyCurrencyin,YourCurrency,Close,RegisterWithFacebook,RegisterWithGooglePlus,SelectHotel,BookingDetails,BookingSuccess,CheckInDate,CheckOutDate,YourDetails,FillFieldsWarning,Salutation,Name,"+
                                 "Surname,Email,Phone,Country,CCType,CCFullName,CCNo,CCExpiration,CCCVC,"+
                                 "ReservationBookAgreement,UserLogin,Email Address,Password,InvalidEmailId,Login,ReservationSucesssMessage,"+
                                 "ReservationID,ReservationID,OperationSuccess,PinCode,BookNow,BookingStartMessage,BestPrice,InstantConformation,"+
                                 "ConfirmMessageEmail,nightstay,RoomNotAvailableWarning,CreditCardNumberError,CVCCodeError,CreditCardProviderError,termsandconditionsError,ExpirationDateError";
            getBookingTextMessage(culture, arrMessageCode, arrId);
            generateYears();
            getCountry();
            if (vm.LoggedUserID && userId)
            getProfileDetailsIfAvailable(culture, userId);
            typeTraveller(culture);
            getSalutation(culture);
            vm.isLogin = gbsHotelConfig.checkLoggedIn();

        }

        function getCurrencyLoad(culture) {
            return topNavigationService.getCurrencyLoad(culture).then(function (response) {
                vm.currency = response;
                setCurrency();
            }).catch(function (err) {
                console.log(err);
            })
        }
        function showTermsPopup() {
            vm.animationsEnabled = true;
            var modalInstance = $uibModal.open({
                animation: vm.animationsEnabled,
                size: "lg",
                templateUrl: "app/termsandcondition/terms.tmpl.html?v=3.10",
                controller: 'termsController',
                controllerAs: "vm"
            });
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
        function showLoginPopup() {
            vm.animationsEnabled = true;
            var modalInstance = $uibModal.open({
                animation: vm.animationsEnabled,
                size: "md",
                templateUrl: "app/book/booklogin.tmpl.html?v=3.10",
                controller: 'bookLoginController',
                controllerAs: "vm"
            });
        }

        //function showDateChangePopup() {
        //    vm.animationsEnabled = true;
        //    vm.modalDateInstance = $uibModal.open({
        //        animation: vm.animationsEnabled,
        //        size: "md",
        //        templateUrl: 'app/book/BookingChangeDate.tmpl.html',
        //        controller: 'bookDateController',
        //        controllerAs: "vm"
        //    });
        //}
        function getCountry() {
            bookService.getCountryForDropdown($cookies.get("lang")).then(function (response) {
                vm.countryList = response;
            });
        }
        function getBookingTextMessage(culture, messageCode, labelId) {
            bookService.getBookingTextMessage(culture, messageCode, labelId).then(function (response) {
                vm.bookinglabel = response;
            }).catch(function (error) {
            });
        }
        //decode parameters
        function decode_params(obj)
        {
            return decodeURIComponent(base64.urldecode($.trim(obj)));
        }
        //Bind the Hotel Details and all the relavant objects
        function SelectedHotel(culture, userId) {
             
            //vm.hotelBookingConfirm = bookService.getSelectedHotel();

            // if hotelBookingConfirmation object null then get the object from the State Parameter, Its use to Make URL to anytime access for booking.
            if (vm.hotelBookingConfirm == undefined && $stateParams.cultureid && $stateParams.checkdatefrom && $stateParams.checkdateto && $stateParams.hotelid && $stateParams.roomcount && $stateParams.roomprice && $stateParams.pricetype)
            //if (vm.hotelBookingConfirm == undefined && $stateParams.confirmbook)
            {
                //var base64EncodedString = decodeURIComponent($stateParams.confirmbook);
                //var decodedString = $base64.decode(base64EncodedString);
                //var decodedJson = JSON.parse(decodedString);
                var json = {
                    //cultureid: decode_params($stateParams.cultureid),
                    cultureid: $cookies.get("lang") ? $cookies.get("lang") : decode_params($stateParams.cultureid),
                    checkdatefrom: moment(decode_params($stateParams.checkdatefrom)).format("DD-MMM-YYYY"),
                    checkdateto: moment(decode_params($stateParams.checkdateto)).format("DD-MMM-YYYY"),
                    hotelcity: decode_params($stateParams.hotelcity),
                    hotelid: decode_params($stateParams.hotelid),
                    address: decode_params($stateParams.address),
                    mainphotoname: decode_params($stateParams.mainphotoname),
                    hotelclass: decode_params($stateParams.hotelclass),
                    hotelname: decode_params($stateParams.hotelname),
                    roomid: decode_params($stateParams.roomid),
                    uniqueid: decode_params($stateParams.uniqueid),
                    accommodationtypeid: decode_params($stateParams.accommodationtypeid),
                    accommodationtypename: decode_params($stateParams.accommodationtypename),
                    accommodationtypedescription: decode_params($stateParams.accommodationtypedescription),
                    pricepolicytypeid: decode_params($stateParams.pricepolicytypeid),
                    pricepolicytypename: decode_params($stateParams.pricepolicytypename),
                    singlerate: decode_params($stateParams.singlerate),
                    doublerate: decode_params($stateParams.doublerate),
                    dailyroomprices: decode_params($stateParams.dailyroomprices),
                    originalroomprice: decode_params($stateParams.originalroomprice),
                    currencyid: decode_params($stateParams.currencyid),
                    currencysymbol: decode_params($stateParams.currencysymbol),
                    roomcount: decode_params($stateParams.roomcount),
                    maxpeoplecount: decode_params($stateParams.maxpeoplecount),
                    roomprice: decode_params($stateParams.roomprice),
                    currencycode: decode_params($stateParams.currencycode),
                    hoteltypename: decode_params($stateParams.hoteltypename),
                    pricetype: decode_params($stateParams.pricetype),
                    creditcardnotrequired: decode_params($stateParams.creditcardnotrequired),
                    currentcurrency: $cookies.get("currency")?$cookies.get("currency"):decode_params($stateParams.currentcurrency)
                }
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
                        // copy from the hoteldetails page to make same object rebind again in booking ( current )
                        vm.hotelBookingConfirm = response;
                        //console.log(vm.hotelBookingConfirm);
                        vm.hotelBookingConfirm.pricetype = vm.storeHotelConfirms.pricetype;
                        vm.hotelBookingConfirm.roomcount = vm.storeHotelConfirms.roomcount;
                        vm.hotelBookingConfirm.roomid = vm.storeHotelConfirms.roomid;
                        vm.hotelBookingConfirm.pricepolicytypeid = vm.storeHotelConfirms.pricepolicytypeid;
                        //set has discount object if not empty
                        vm.hotelBookingConfirm.hasDiscount =$stateParams.hasdiscount? decode_params($stateParams.hasdiscount):"";
                        //set store confirm objects for ChangeDate function at booking module.
                        if (vm.storeHotelConfirms)
                            vm.hotelBookingConfirm.storeHotelConfirms = vm.storeHotelConfirms;

                        //Bind current booking object
                        BindBookObjects(vm.hotelBookingConfirm,culture, userId);

                    }).catch(function (error) {

                    });
            }
            else {
                //Bind current booking object
                BindBookObjects(vm.hotelBookingConfirm, culture,userId);
            }
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
        //bind hotel informations object
        function BindBookObjects(hotelBookingConfirm,culture, userId) {
           
            //below object will Used for changeDate functions.//its json objects
            if (hotelBookingConfirm) {
                //set current currency again from cookie
                //hotelBookingConfirm.storeHotelConfirms.currencycode = $cookies.get("currency");
                //hotelBookingConfirm.storeHotelConfirms.currentcurrency = $cookies.get("currency");
                //hotelBookingConfirm.storeHotelConfirms.currencysymbol = vm.currentCurrency.CurrencySymbol;

                vm.storeHotelConfirms = hotelBookingConfirm.storeHotelConfirms;
            }
            if (vm.hotelBookingConfirm) {
                //console.log(vm.hotelBookingConfirm);
                vm.HotelInformation = hotelBookingConfirm.list;
                try {
                    if (vm.HotelInformation && vm.HotelInformation.length > 0) {
                        //moment(vm.HotelInformation[0].CheckDatefrom).format('MM-YYYY')
                        //vm.ChangeCheckInDate = { date: moment(vm.HotelInformation[0].CheckDatefrom).format('MM/DD/YYYY') };
                        //vm.ChangeCheckoutDate = { date: moment(vm.HotelInformation[0].CheckDateto).format('MM/DD/YYYY') };
                        //vm.ChangeCheckInDate = { date: moment(vm.HotelInformation[0].CheckDatefrom).format('MMM DD,ddd') };
                        //vm.ChangeCheckoutDate = { date: moment(vm.HotelInformation[0].CheckDateto).format('MMM DD,ddd') };
                        vm.ChangeCheckInDate = { date: moment(vm.HotelInformation[0].CheckDatefrom).format() };
                        vm.ChangeCheckoutDate = { date: moment(vm.HotelInformation[0].CheckDateto).format() };
                        scope.images = [];
                        for(var i=0;i<vm.HotelInformation.length;i++)
                        {
                            if(!vm.HotelInformation[i].RoomPhotoName)
                            {
                                vm.HotelInformation[i].RoomPhotoName = "/images/noimage.jpg?v=3.10";
                            }
                            scope.images.push(vm.HotelInformation[i].RoomPhotoName);
                            //vm.himages.push( {
                            //    'url': vm.HotelInformation[i].RoomPhotoName,
                            //    'caption':  vm.HotelInformation[i].HotelTypeName,
                            //    'thumbUrl': vm.HotelInformation[i].RoomPhotoName // used only for this example
                            //});
                        }
                    }
                }
                catch (ett) {

                }
                vm.HotelTax = vm.hotelBookingConfirm.HotelTax;
                vm.convertedRoomPriceTotal = vm.hotelBookingConfirm.convertedRoomPriceTotal;
                vm.total = vm.hotelBookingConfirm.total;
                vm.totalInHotelCurrency = vm.hotelBookingConfirm.totalInHotelCurrency;

                //set for one day room count from nightcount
                //comment below to call again to recalculate changedDate Prices & Total payable.
                //vm.priceForSingalNight_ConvertedRoomPriceTotal=vm.convertedRoomPriceTotal/vm.HotelInformation[0].NightCount;
                //vm.priceForSingalNight_total = vm.total/vm.HotelInformation[0].NightCount;
                //vm.priceForSingalNight_InHotelCurrency = vm.totalInHotelCurrency / vm.HotelInformation[0].NightCount;

                vm.NewCurrencySymbol = vm.HotelInformation[vm.HotelInformation.length - 1].NewCurrencySymbol;
                vm.CurrencySymbol = vm.HotelInformation[vm.HotelInformation.length - 1].CurrencySymbol;

                //set local hasDiscout object
                vm.hasDiscount = vm.hotelBookingConfirm.hasDiscount;
               
                //init with zero
                vm.CreditCardNotRequired = 0;
                for (var rs = 0; rs < vm.hotelBookingConfirm.list.length; rs++) {
                    var rsRequired = vm.hotelBookingConfirm.list[rs].CreditCardNotRequired;
                    if (rsRequired) {
                        vm.CreditCardNotRequired = rsRequired;
                        break;
                    }
                }
                if (!vm.typeCreditCardByHotel) {
                    typeCreditCardByHotel(culture, vm.HotelInformation[0].HotelID);
                }

            }
            else {
                $state.go("master.gbs.home");
            }
        }

       /* function SelectedHotelAfterChangeDate(response) {
            //reset old store info JSON to below object storeHotelConfirms : it will back from hotel details page
            vm.storeHotelConfirms = vm.hotelBookingConfirm.storeHotelConfirms;
            vm.hotelBookingConfirm = response;
            debugger;

            if (vm.hotelBookingConfirm) {
                console.log("after change date: " +vm.hotelBookingConfirm);
                vm.HotelInformation = vm.hotelBookingConfirm.list;
                try {
                    if (vm.HotelInformation && vm.HotelInformation.length > 0) {
                        vm.ChangeCheckInDate = { date: moment(vm.HotelInformation[0].CheckDatefrom).format() };
                        vm.ChangeCheckoutDate = { date: moment(vm.HotelInformation[0].CheckDateto).format() };
                    }
                }
                catch (ett) {

                }
                vm.HotelTax = vm.hotelBookingConfirm.HotelTax;
                vm.convertedRoomPriceTotal = vm.hotelBookingConfirm.convertedRoomPriceTotal;
                vm.total = vm.hotelBookingConfirm.total;
                vm.totalInHotelCurrency = vm.hotelBookingConfirm.totalInHotelCurrency;

                //symblow no need reset so comment below
                //vm.NewCurrencySymbol = vm.HotelInformation[vm.HotelInformation.length - 1].NewCurrencySymbol;
                //vm.CurrencySymbol = vm.HotelInformation[vm.HotelInformation.length - 1].CurrencySymbol;

                if (!vm.profileCarddetails) {
                    getUserSavedCardDetailsByHotel(userId, vm.HotelInformation[0].HotelID);
                }

                // Card details set when controller load when initialized
                //if (!vm.CreditCardNotRequired) {
                //    //init with zero
                //    vm.CreditCardNotRequired = 0;
                //    for (var rs = 0; rs < vm.hotelBookingConfirm.list.length; rs++) {
                //        var rsRequired = vm.hotelBookingConfirm.list[rs].CreditCardNotRequired;
                //        if (rsRequired) {
                //            vm.CreditCardNotRequired = rsRequired;
                //            break;
                //        }
                //    }
                //}
                //if (!vm.typeCreditCardByHotel) {
                //    typeCreditCardByHotel(culture, vm.HotelInformation[0].HotelID);
                //}
            }
            else {
                $state.go("master.gbs.home");
            }
        }
        */
        function SelectedHotelAfterChangeDate(response) {
            //debugger;
            vm.hotelBookingConfirm = response;
            if (vm.hotelBookingConfirm) {
               // console.log("after change date: " + vm.hotelBookingConfirm);
                vm.HotelInformation = vm.hotelBookingConfirm.list;
                try {
                    if (vm.HotelInformation && vm.HotelInformation.length > 0) {
                        vm.ChangeCheckInDate = { date: moment(vm.HotelInformation[0].CheckDatefrom).format() };
                        vm.ChangeCheckoutDate = { date: moment(vm.HotelInformation[0].CheckDateto).format() };
                    }
                }
                catch (ett) {
                    toastr.error(ett.message);
                }
                vm.HotelTax = vm.hotelBookingConfirm.HotelTax;
                vm.convertedRoomPriceTotal = vm.hotelBookingConfirm.convertedRoomPriceTotal;
                vm.total = vm.hotelBookingConfirm.total;
                vm.totalInHotelCurrency = vm.hotelBookingConfirm.totalInHotelCurrency;

                //ReSet the Hotel Discount and Room details.
                vm.hotelBookingConfirm.pricetype = vm.tempObj.pricetype;
                vm.hotelBookingConfirm.roomcount = vm.tempObj.roomcount;
                vm.hotelBookingConfirm.roomid = vm.tempObj.roomid;
                vm.hotelBookingConfirm.pricepolicytypeid = vm.tempObj.pricepolicytypeid;

                //set has discount object if not empty
                vm.hotelBookingConfirm.hasDiscount = vm.tempObj.hasdiscount;

                //if required then again call on change update dates
                if (!vm.profileCarddetails) {
                    getUserSavedCardDetailsByHotel(userId, vm.HotelInformation[0].HotelID);
                }
            }
            else {
                vm.tempObj = null;
                $state.go("master.gbs.home");
            }
        }

        //call when the date changed model popup call
        function ChangeBookingDate()
        {
            //set vm object to price,roomtype,count and policy that was coming from hotelbooking previous page.
            vm.tempObj = {
                    hotelid:vm.HotelInformation[0].HotelID
                    ,pricetype:vm.hotelBookingConfirm.pricetype
                    ,roomcount:vm.hotelBookingConfirm.roomcount
                    ,roomid:vm.hotelBookingConfirm.roomid
                    ,pricepolicytypeid:vm.hotelBookingConfirm.pricepolicytypeid
                    ,hasdiscount:vm.hotelBookingConfirm.hasDiscount
                }
            var  checkin= moment( vm.ChangeCheckInDate.date).format("MM/DD/YYYY") 
                , checkout = moment( vm.ChangeCheckoutDate.date).format("MM/DD/YYYY") 
                , Session_Code = $cookies.get("lang");
            bookService.changeBookingDate(checkin
                                         , checkout
                                         , vm.tempObj.pricepolicytypeid
                                         , vm.tempObj.hotelid
                                         , Session_Code
                                         , vm.tempObj.pricetype
                                         , vm.tempObj.roomcount
                                         , vm.tempObj.roomid)
                .then(function (response)
                {
                         vm.Countavailable = response;
                         if(vm.Countavailable==0)
                         {
                             vm.CountavailableNone = true;

                             //here it will show warning message..
                         }
                 else {
                     //debugger;
                     //vm.HotelInformation[0].CheckDatefrom = moment(vm.ChangeCheckInDate.date).format("DD-MMM-YYYY");
                     //vm.HotelInformation[0].CheckDateto = moment(vm.ChangeCheckoutDate.date).format("DD-MMM-YYYY");

                     for (var i = 0; i < vm.HotelInformation.length; i++)
                     {
                        vm.HotelInformation[i].CheckDatefrom=moment(vm.ChangeCheckInDate.date).format("DD-MMM-YYYY");
                        vm.HotelInformation[i].CheckDateto = moment(vm.ChangeCheckoutDate.date).format("DD-MMM-YYYY");
                     }
                   
                     //call store information same as hoteldetails to recalculate pricing
                     // No need to call store object here. it will call the GetValuewithChangeLang service API
                     //if (vm.storeHotelConfirms && vm.HotelInformation.length > 0) {
                     if (vm.HotelInformation.length > 0) { 
                         try{ 
                             //vm.storeHotelConfirms.checkdatefrom = vm.HotelInformation[0].CheckDatefrom;
                             //vm.storeHotelConfirms.checkdateto = vm.HotelInformation[0].CheckDateto
                             //storeHotelRoomInfo(vm.storeHotelConfirms);
                             // OR we can call to update pricing. > GetValuesWhileChangelang();
                             var json = {
                                 currentCurrency: $cookies.get("currency"),
                                 culture: $cookies.get("lang"),
                                 hotelId: vm.tempObj.hotelid,
                                 roomPriceTypeId: vm.tempObj.pricetype,
                                 //no need to use Store Object to pass into json parameter
                                 //checkDatefrom: vm.storeHotelConfirms.checkdatefrom,
                                 //checkDateTo: vm.storeHotelConfirms.checkdateto,
                                 checkDatefrom: vm.HotelInformation[0].CheckDatefrom,
                                 checkDateTo: vm.HotelInformation[0].CheckDateto,
                                 roomCountHId: vm.tempObj.roomcount,
                                 policyTypeId: vm.tempObj.pricepolicytypeid,
                                 hotelRoomIdAry: vm.tempObj.roomid
                             };
                             GetValuesWhileChangelangRe(json);
                         }
                         catch (tr) {
                             vm.tempObj = null;
                             toastr.error("Try again "+tr.Message);
                         }
                     }
                     /* comment below to reagain call to calculate prices & taxes
                     var totalNight =  moment(vm.ChangeCheckoutDate.date).diff(moment(vm.ChangeCheckInDate.date), 'days');
                     //var totalNight = vm.HotelInformation[0].CheckDatefrom.diff(vm.HotelInformation[0].CheckDateto, 'days');
                     vm.HotelInformation[0].NightCount = totalNight; 

                     //update pricing.
                     vm.convertedRoomPriceTotal = parseFloat( vm.priceForSingalNight_ConvertedRoomPriceTotal * totalNight);
                     vm.total = parseFloat(vm.priceForSingalNight_total * totalNight);
                     vm.totalInHotelCurrency = parseFloat(vm.priceForSingalNight_InHotelCurrency * totalNight);
                     */
                    $('#changeDateModal').modal('hide');

                 }

                }).catch(function (error) {
                    console.log(error);
            });

        }

        //call this function to reupdate price and counts.
        function GetValuesWhileChangelangRe(json)
        {
            bookService.getValuesWhileChangelangRe(json).then(function (response) {
                //debugger;
                SelectedHotelAfterChangeDate(response);
            }).catch(function (error) {
                vm.tempObj = null;
                toastr.error(error);
            });
        }
        /*
        function storeHotelRoomInfo(json) {
            var tempjson = json;
            bookService.storeHotelRoomInfo(
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
                    SelectedHotelAfterChangeDate(response);
                    //vm.hotelBookingConfirm = response;
                    //vm.HotelInformation = vm.hotelBookingConfirm.list;
                    // vm.convertedRoomPriceTotal = vm.hotelBookingConfirm.convertedRoomPriceTotal;
                    // vm.total = vm.hotelBookingConfirm.total;
                    // vm.totalInHotelCurrency = vm.hotelBookingConfirm.totalInHotelCurrency;

                    ////check value must be > 0
                    // if (vm.total && vm.total > 0) {
                    //    $state.go("master.gbs.Home");
                    //}
                    //else {
                    //    toastr.error("total value can't be zero, try again!");
                    //}

                }).catch(function (error) {

                });
        }
        */
        function generateYears() {
            var currentYear = moment().year();
            for (var i = currentYear; i < currentYear + 10; i++) {
                vm.years.push({ 'id': i, 'DisplayYear': i });
            }
            vm.profileCarddetails = { Year: vm.years[0]};
        }

        function bookHotel(hotelForm) {
            $("#lblCreditcardNumberError").hide();
            
            if (hotelForm.$invalid) {

                var isvalid = true;
                $("form[name^='" + hotelForm.$name + "']").find(".ng-invalid").each(function (i, o) {
                    if($(o).attr("id").indexOf("cvv") != -1) {
                        toastr.error("Please enter valid CVV code!");
                    }
                    else if ($(o).attr("id").indexOf("txtCreditcardNumber") != -1) {
                        toastr.error("Please enter valid CreditCard!");
                    }
                    $(o).focus();
                    isvalid = false;
                    return false;
                });
             
               if (isvalid && (!vm.selected_CreditTypeCode || vm.selected_CreditTypeCode == undefined) && vm.CreditCardNotRequired == 0) {
                    toastr.error("Please select credit card provider!");
                }
                //else if (angular.element('input.ng-invalid-cc-number').first().length > 0) {
                //    angular.element('input.ng-invalid-cc-number').first().focus();
                //    toastr.error("Please enter valid credit card details!");
                //   // $("#lblCreditcardNumberError").show();
                //}
            }
            else if ((!vm.selected_CreditTypeCode || vm.selected_CreditTypeCode == undefined) && vm.CreditCardNotRequired == 0)
            {
                  toastr.error("Please select credit card provider !");
            }
            else if (!vm.selected_CVCLenth || (vm.profileCarddetails != undefined && vm.profileCarddetails.CardCvc.toString().length != vm.selected_CVCLenth))
            {
                toastr.error("Please enter valid CVV code!");
                return;
               // $("#lblCVCCodeError").show();
            }
            else if (!$("#chkAgreee").is(":checked"))
            {
                toastr.error("please choose 'Terms and Conditions' agreement!");
                $(".popupnew").removeClass("hidden");
                return;
            }
            else if (parseInt(vm.selected_CreditCardTypeID) > 0 && !checkCreditCard(vm.profileCarddetails.CreditCardNumber, vm.selected_CreditTypeCode))
            {
                toastr.error("Invalid Credit Card, try again!");
                //$("#lblCreditcardNumberError").show();
            }
            else {
                //set disable submit button on single click
                vm.isDisabled = true;
                try{ 
                    var aryRoomCount = vm.hotelBookingConfirm.roomcount,
                        aryPriceType = vm.hotelBookingConfirm.pricetype,
                        aryHotelRoomID = vm.hotelBookingConfirm.roomid,
                        aryPricePolicyTypeID = vm.hotelBookingConfirm.pricepolicytypeid,
                        aryGuestname = "",
                        aryTavellerTypeSelect = "",
                        aryEstimatedArrivalTimeSelect = "",
                        arySelectBedTypeID = "",
                        arySelectBedType=[],
                        aryTavellerTypeSelectID = "";
                    if (vm.book != undefined) {

                        aryGuestname = (vm.book.hasOwnProperty('Guest') ? (Object.keys(vm.book.Guest).map(function (k) { return vm.book.Guest[k] }).join(",")) : ""),
                        arySelectBedType =
                        (
                            vm.book.hasOwnProperty('BedPreference') ?
                            Object.keys(vm.book.BedPreference).map(function (k) { return vm.book.BedPreference[k].BedTypeNameWithCount }).join(",")
                            : ""
                        );
                        aryTavellerTypeSelect =
                        (
                            vm.book.hasOwnProperty('TravelerType') ?
                            Object.keys(vm.book.TravelerType).map(function (k) { return vm.book.TravelerType[k].TravellerType }).join(",")
                            : ""
                        );
                        aryEstimatedArrivalTimeSelect =
                        (
                            vm.book.hasOwnProperty('ArivalTime') ?
                            Object.keys(vm.book.ArivalTime).map(function (k) { return vm.book.ArivalTime[k] }).join(",")
                            : ""
                        );
                        arySelectBedTypeID =
                        (
                            vm.book.hasOwnProperty('BedPreference') ?
                            Object.keys(vm.book.BedPreference).map(function (k) { return vm.book.BedPreference[k].BedTypeID }).join(",")
                            : ""
                        );
                        aryTavellerTypeSelectID =
                        (
                            vm.book.hasOwnProperty('TravelerType') ?
                            Object.keys(vm.book.TravelerType).map(function (k) { return vm.book.TravelerType[k].TravellerID }).join(",")
                            : ""
                        );
                    }
                    ;
               
                    var jsonReserv = {
                        TotalPricewithTax: vm.total,
                        title: vm.profiledetails.SalutationTypeID,
                        Name: vm.profiledetails.Name,
                        SurName: vm.profiledetails.Surname,
                        Email: vm.profiledetails.Email,
                        Phone: vm.profiledetails.Phone,
                        Country: vm.profiledetails.CountryID,
                        CreditcardProvider: vm.selected_CreditCardTypeID,//set card type ID
                        NameOnCreditcard: vm.profileCarddetails.NameOnCreditCard,
                        CreditcardNumber: vm.profileCarddetails.CreditCardNumber,
                        CVCCode: vm.profileCarddetails.CardCvc,
                        ExpirationMonth: vm.profileCarddetails.cardMonth,
                        ExpirationYear: vm.profileCarddetails.Year.id,
                        HotelID: vm.HotelInformation[0].HotelID,
                        CheckinDate: vm.HotelInformation[0].CheckDatefrom,
                        CheckOutDate: vm.HotelInformation[0].CheckDateto,
                        PayableAmount: vm.total,//PayableAmount,
                        Culturecode: $cookies.get("lang"),
                        LoggedUserID: (vm.LoggedUserID.indexOf('GUEST') != -1? "" : vm.LoggedUserID),
                        HiidenCurrencyCode: $cookies.get("currency"),
                        SpecialNote:  vm.book.hasOwnProperty('SpecialNote') ? vm.book.SpecialNote:"",
                        HotelName: vm.HotelInformation[0].HotelName,
                        RoomCount: [aryRoomCount],//fetch 
                        PriceType: [aryPriceType],//fetch 
                        Guestname: [aryGuestname],//fetch 
                        SelectBedType: arySelectBedType ? [arySelectBedType]:"",
                        TavellerTypeSelect: aryTavellerTypeSelect? [aryTavellerTypeSelect]:"",
                        EstimatedArrivalTimeSelect: aryEstimatedArrivalTimeSelect ? [aryEstimatedArrivalTimeSelect] : "",
                        HotelRoomID: aryHotelRoomID?[aryHotelRoomID]:"",
                        SelectBedTypeID: arySelectBedTypeID?[arySelectBedTypeID]:"",
                        TavellerTypeSelectID: aryTavellerTypeSelectID?[aryTavellerTypeSelectID]:"",
                        PricePolicyType: aryPricePolicyTypeID?[aryPricePolicyTypeID]:"",
                        CreditCardNotRequired: vm.CreditCardNotRequired,
                        culture: $cookies.get("lang"), 
                        HasDiscount: vm.hasDiscount
                    };
                    console.log(jsonReserv);
               
                bookService.hotelReservationFunc(jsonReserv).then(function (response) {
                    toastr.success("Booking Success");
                    vm.BookingSuccess = response;
                    vm.isDisabled = false;
                }).catch(function (error) {
                    vm.isDisabled = false;
                    toastr.error("Error occured while saving details.");
                });
                } catch (etr) {
                    console.log(etr);
                    vm.isDisabled = false;
                }
            }
        }
        function getProfileDetailsIfAvailable(culture, userId) {
            if (userId) {
                bookService.getProfileDetailsIfAvailable(culture, userId).then(function (response) {
                    vm.profiledetails = response;
                }).catch(function (error) {

                });
            }
        }
        function typeTraveller(culture) {
            bookService.typeTraveller(culture).then(function (response) {
                vm.typeTraveller = response;
            }).catch(function (error) {

            });
        }
        function getSalutation(culture) {
            bookService.getSalutation(culture).then(function (response) {
                vm.Salutation = response;
            }).catch(function (error) {

            });
        }
        function getUserSavedCardDetailsByHotel(userId, hotelId) {
            bookService.getUserSavedCardDetailsByHotel(userId, hotelId).then(function (response) {
                vm.profileCarddetails = response;
                if(vm.profileCarddetails.length >0)
                {
                    changecardupdate(vm.profileCarddetails[0].CreditCardProviderID, vm.profileCarddetails[0].CreditCardTypeName);
                    vm.profileCarddetails.CreditCardNumber = vm.profileCarddetails[0].CreditCardNumber;
                    vm.profileCarddetails.NameOnCreditCard = vm.profileCarddetails[0].NameOnCreditCard;
                    vm.profileCarddetails.cardMonth = vm.profileCarddetails[0].month;
                    vm.profileCarddetails.Year = { id: vm.profileCarddetails[0].year, DisplayYear: vm.profileCarddetails[0].year };
                    
                }
            }).catch(function (error) {

            });
        }
       
        function typeMonth(culture) {
            bookService.typeMonth(culture).then(function (response) {
                vm.typeMonth = response;
            }).catch(function (error) {

            });
        }
        function typeCreditCardByHotel(culture, hotelId) {
            bookService.typeCreditCardByHotel(culture, hotelId).then(function (response) {
                //vm._creditcards = response;
                vm.typeCreditCardByHotel = response;

                getUserSavedCardDetailsByHotel(vm.LoggedUserID, hotelId);

                //vm.typeCreditCardByHotel = [];
                //vm.typeCreditCardByHotel.push({ CreditCardTypeName: '--Select--', CreditCardTypeID: -1, CreditTypeCode:'',CVCLenth:0 });
                //for (var i = 0; i < response.length ; i++)
                //{
                //    vm.typeCreditCardByHotel.push({  CreditCardTypeName: response[i].CreditCardTypeName, CreditCardTypeID: response[i].CreditCardTypeID, CreditTypeCode: response[i].CreditTypeCode, CVCLenth: response[i].CVCLenth });
                //}
                //set inital value
                //vm.profileCarddetails.typeCreditCard = vm.typeCreditCardByHotel[0];
                //console.log(vm.typeCreditCardByHotel);
            }).catch(function (error) {

            });
        }
        //update selections
        function changecardupdate(CreditCardTypeID,CreditCardTypeName)
        {
            //debugger;
            vm.selected_CreditCardTypeID = CreditCardTypeID;
            vm.selected_CreditCardTypeName = CreditCardTypeName;
            $(".card-select").find("li").removeClass('active');
            $.each(vm.typeCreditCardByHotel, function (key, val) {
                if (val.CreditCardTypeID == CreditCardTypeID) {
                    vm.selected_CreditTypeCode = val.CreditTypeCode;
                    vm.selected_CVCLenth = val.CVCLenth;
                    $(".card-select").find("li").each(function (i,o) {
                        if($(o).attr("value")== val.CreditCardTypeName)
                        {
                            if (!$(o).hasClass("active"))
                            {
                                $(o).addClass("active");
                            }
                        }
                    });
                }
            });
        }
    }
    angular
    .module("book")
    .controller("bookController", bookController)
    bookController.$inject = ["$uibModal", "$cookies", "$stateParams", "bookService", "signInTitle", "dontMissOutMessage", "luckyDayMessgae", "loginService", "gbsHotelConfig", "$state","base64","hoteldetailService","$scope","Lightbox","topNavigationService"];

    function bookLoginController($uibModal, $rootScope, loginService, $uibModalInstance, $cookies, gbsHotelConfig, $state, $resource, $scope, $facebook, GOOGLE_API_KEY, $http,base64) {
        var vm = this;
        vm.closePopup = closePopup;
        vm.login = login
        vm.googleID = "1003522574619-rime6t81jg0p9o2lnren6j4toarh9b43.apps.googleusercontent.com";
        function login() {
            if (vm.username == null || vm.password == null || vm.password == undefined || vm.username == undefined || vm.username == "" || vm.password == "") {
                toastr.error("Username and Password Required");
            }
            else {
                loginService.loginToGbsHotel(vm.username, vm.password).then(function (response) {
                    gbsHotelConfig.setLoginDetails(response);
                    $uibModalInstance.close(true);
                    $rootScope.$broadcast('userLoggedIn', 'message');
                    $state.reload();

                }).catch(function (error) {
                    toastr.error(error);
                })
            }
        }
        function closePopup() {
            $uibModalInstance.dismiss(true);
        }

        //google plus with directive
        $scope.$on('event:google-plus-signin-success', function (event, authResult) {


            $http({
                url: GOOGLE_API_KEY.URL + "/" + authResult.getId() + "?key=" + GOOGLE_API_KEY.KEY,
                dataType: 'json',
                method: 'GET',
            }).then(function (response) {
                var resp = response.data;
                var gender = "";
                if (resp.gender == "male") {
                    gender = 1;
                }
                else {
                    gender = 2;
                }


                var fbid = null;
                var googleid = resp.id;
                var jsonInsert = {
                    fbid: fbid, googleid: resp.id, emailid: authResult.getBasicProfile().U3, Name: resp.displayName,
                    Gender: gender, Image: resp.image.url
                };
                var json = {
                    fbid: fbid, googleid: resp.id, emailid: authResult.getBasicProfile().U3
                };

                loginService.checksocialidvalidation(resp.id, googleid, authResult.getBasicProfile().U3).then(function (response) {
                    if (response != null) {
                        gbsHotelConfig.setRegisterDetails(response);
                        $uibModalInstance.close(true);
                        $rootScope.$broadcast('userLoggedIn', 'message');
                        $state.reload();
                    }
                    else {
                        if (typeof EmailFB != 'undefined') {
                            loginService.socialLoginInsert(resp.id, googleid, authResult.getBasicProfile().U3, resp.name, gender, uid, $cookies.get("lang")).then(function (response) {
                                if (response == null)
                                    toastr.error("Something goes wrong, Please try again.");
                                else {
                                    gbsHotelConfig.setRegisterDetails(response);
                                    $uibModalInstance.close(true);
                                    $rootScope.$broadcast('userLoggedIn', 'message');
                                    toastr.info("Successfully registered.");
                                    $state.reload();
                                }
                            }).catch(function (error) {
                                toastr.error("Something goes wrong, Please try again.");
                            })

                        }
                    }
                }).catch(function (error) {
                    toastr.error("Something goes wrong, Please try again.");
                })

            }).catch(function (error) {
                toastr.error("Something goes wrong, Please try again.");
            });
            // Send login to server or save into cookie
        });

        $scope.$on('event:google-plus-signin-failure', function (event, authResult) {
            toastr.error("Something goes wrong, Please try again.");
            // Auth failure or signout detected
        });
        //end

        // FB login settings
        $scope.$on('fb.auth.authResponseChange', function () {

            $scope.status = $facebook.isConnected();
            if ($scope.status) {
                var uid = "http://graph.facebook.com/" + $facebook.getAuthResponse().userID + "/picture";
                $facebook.api('/me?fields=id,name,gender,email,birthday').then(function (me) {
                    var gender = "";
                    if (me.gender == "male") {
                        gender = 1;
                    }
                    else {
                        gender = 2;
                    }

                    var googleid = null;
                    //alert("hi")
                    var jsonInsert = {
                        fbid: me.id, googleid: googleid, emailid: me.email, Name: me.name,
                        Gender: gender, Image: uid
                    };

                    // alert("hi2")
                    var EmailFB = me.email;

                    loginService.checksocialidvalidation(me.id, googleid, me.email).then(function (response) {
                        if (response != null) {
                            gbsHotelConfig.setRegisterDetails(response);
                            $uibModalInstance.close(true);
                            $rootScope.$broadcast('userLoggedIn', 'message');
                            $state.reload();
                        }
                        else {
                            if (typeof EmailFB != 'undefined') {
                                loginService.socialLoginInsert(me.id, googleid, me.email, me.name, gender, uid, $cookies.get("lang")).then(function (response) {
                                    if (response == null)
                                        toastr.error("Something goes wrong, Please try again.");
                                    else {
                                        gbsHotelConfig.setRegisterDetails(response);
                                        $uibModalInstance.close(true);
                                        $rootScope.$broadcast('userLoggedIn', 'message');
                                        $state.reload();
                                        toastr.info("Successfully registered.");
                                    }
                                }).catch(function (error) {
                                    toastr.error("Something goes wrong, Please try again.");
                                })

                            }
                        }
                    }).catch(function (error) {
                        toastr.error("Something goes wrong, Please try again.");
                    })
                });
            }
        });

        //bind click on Facebook login event
        $scope.loginToggle = function () {
            if ($scope.status) {
                $facebook.logout();
            } else {
                $facebook.login();
            }
        };
    }
    angular
   .module("book")
   .controller("bookLoginController", bookLoginController)
    bookLoginController.$inject = ["$uibModal", "$rootScope", "loginService", "$uibModalInstance", "$cookies", "gbsHotelConfig", "$state", "$resource", "$scope", "$facebook", "GOOGLE_API_KEY", "$http","base64"];
 
})();