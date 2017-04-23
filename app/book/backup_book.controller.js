(function () {
    "use strict";
    function bookController($uibModal,$cookies, $stateParams, bookService, signInTitle, dontMissOutMessage, luckyDayMessgae, loginService, gbsHotelConfig,$state) {
        var vm = this;
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
        vm.selected_CVCLenth = 3;// initial set

        vm.beforeRender = beforeRender_CheckInDate;
        vm.beforeRender_CheckOutDate = beforeRender_CheckOutDate;

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
                    userId = 0;
            }
            vm.LoggedUserID = userId;
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
            getProfileDetailsIfAvailable(culture, userId);
            typeTraveller(culture);
            getSalutation(culture);
            vm.isLogin = gbsHotelConfig.checkLoggedIn();

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
                templateUrl: 'app/book/booklogin.tmpl.html',
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

        //Bind the Hotel Details and all the relavant objects
        function SelectedHotel(culture, userId) {
             
            vm.HotelInformationObject = bookService.getSelectedHotel();

            //below object will Used for changeDate functions.//its json objects
            vm.storeHotelConfirms = vm.HotelInformationObject.storeHotelConfirms;

            if (vm.HotelInformationObject) {
                console.log(vm.HotelInformationObject);
                debugger;
                vm.HotelInformation = vm.HotelInformationObject.list;
                try{ 
                    if (vm.HotelInformation && vm.HotelInformation.length > 0) {
                        //moment(vm.HotelInformation[0].CheckDatefrom).format('MM-YYYY')
                        //vm.ChangeCheckInDate = { date: moment(vm.HotelInformation[0].CheckDatefrom).format('MM/DD/YYYY') };
                        //vm.ChangeCheckoutDate = { date: moment(vm.HotelInformation[0].CheckDateto).format('MM/DD/YYYY') };
                        //vm.ChangeCheckInDate = { date: moment(vm.HotelInformation[0].CheckDatefrom).format('MMM DD,ddd') };
                        //vm.ChangeCheckoutDate = { date: moment(vm.HotelInformation[0].CheckDateto).format('MMM DD,ddd') };

                        vm.ChangeCheckInDate = { date: moment(vm.HotelInformation[0].CheckDatefrom).format() };
                        vm.ChangeCheckoutDate = { date: moment(vm.HotelInformation[0].CheckDateto).format() };
                    }
                }
                catch (ett) {

                }
                vm.HotelTax = vm.HotelInformationObject.HotelTax;
               
                vm.convertedRoomPriceTotal = vm.HotelInformationObject.convertedRoomPriceTotal;
                vm.total = vm.HotelInformationObject.total;
                vm.totalInHotelCurrency = vm.HotelInformationObject.totalInHotelCurrency;

                //set for one day room count from nightcount
                //comment below to call again to recalculate changedDate Prices & Total payable.
                //vm.priceForSingalNight_ConvertedRoomPriceTotal=vm.convertedRoomPriceTotal/vm.HotelInformation[0].NightCount;
                //vm.priceForSingalNight_total = vm.total/vm.HotelInformation[0].NightCount;
                //vm.priceForSingalNight_InHotelCurrency = vm.totalInHotelCurrency / vm.HotelInformation[0].NightCount;

                vm.NewCurrencySymbol = vm.HotelInformation[vm.HotelInformation.length - 1].NewCurrencySymbol;
                vm.CurrencySymbol = vm.HotelInformation[vm.HotelInformation.length - 1].CurrencySymbol;

                //set local hasDiscout object
                vm.hasDiscount = vm.HotelInformationObject.hasDiscount;
                getUserSavedCardDetailsByHotel(userId, vm.HotelInformation[0].HotelID);

                //init with zero
                vm.CreditCardNotRequired = 0;
                for (var rs = 0; rs < vm.HotelInformationObject.list.length; rs++) {
                    var rsRequired = vm.HotelInformationObject.list[rs].CreditCardNotRequired;
                    if (rsRequired) {
                        vm.CreditCardNotRequired = rsRequired;
                        break;
                    }
                }
                if (!vm.typeCreditCardByHotel) {
                    typeCreditCardByHotel(culture, vm.HotelInformation[0].HotelID);
                }
            }
            else
            {
                $state.go("master.gbs.home");
            }
        }


       /* function SelectedHotelAfterChangeDate(response) {
            //reset old store info JSON to below object storeHotelConfirms : it will back from hotel details page
            vm.storeHotelConfirms = vm.HotelInformationObject.storeHotelConfirms;
            vm.HotelInformationObject = response;
            debugger;

            if (vm.HotelInformationObject) {
                console.log("after change date: " +vm.HotelInformationObject);
                vm.HotelInformation = vm.HotelInformationObject.list;
                try {
                    if (vm.HotelInformation && vm.HotelInformation.length > 0) {
                        vm.ChangeCheckInDate = { date: moment(vm.HotelInformation[0].CheckDatefrom).format() };
                        vm.ChangeCheckoutDate = { date: moment(vm.HotelInformation[0].CheckDateto).format() };
                    }
                }
                catch (ett) {

                }
                vm.HotelTax = vm.HotelInformationObject.HotelTax;
                vm.convertedRoomPriceTotal = vm.HotelInformationObject.convertedRoomPriceTotal;
                vm.total = vm.HotelInformationObject.total;
                vm.totalInHotelCurrency = vm.HotelInformationObject.totalInHotelCurrency;

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
                //    for (var rs = 0; rs < vm.HotelInformationObject.list.length; rs++) {
                //        var rsRequired = vm.HotelInformationObject.list[rs].CreditCardNotRequired;
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
            debugger;
            vm.HotelInformationObject = response;

            if (vm.HotelInformationObject) {
                console.log("after change date: " + vm.HotelInformationObject);
                vm.HotelInformation = vm.HotelInformationObject.list;
                try {
                    if (vm.HotelInformation && vm.HotelInformation.length > 0) {
                        vm.ChangeCheckInDate = { date: moment(vm.HotelInformation[0].CheckDatefrom).format() };
                        vm.ChangeCheckoutDate = { date: moment(vm.HotelInformation[0].CheckDateto).format() };
                    }
                }
                catch (ett) {
                   
                    toastr.error(ett.message);
                }
                vm.HotelTax = vm.HotelInformationObject.HotelTax;
                vm.convertedRoomPriceTotal = vm.HotelInformationObject.convertedRoomPriceTotal;
                vm.total = vm.HotelInformationObject.total;
                vm.totalInHotelCurrency = vm.HotelInformationObject.totalInHotelCurrency;

                //ReSet the Hotel Discount and Room details.
                vm.hotelBookingConfirm.pricetype = tempjson.pricetype;
                vm.hotelBookingConfirm.roomcount = tempjson.roomcount;
                vm.hotelBookingConfirm.roomid = tempjson.roomid;
                vm.hotelBookingConfirm.pricepolicytypeid = tempjson.pricepolicytypeid;

                //set has discount object if not empty
                vm.hotelBookingConfirm.hasDiscount = vm.hasDiscount;

                if (!vm.profileCarddetails) {
                    getUserSavedCardDetailsByHotel(userId, vm.HotelInformation[0].HotelID);
                }
                
            }
            else {
                vm.tempObj = null;
                $state.go("master.gbs.home");
            }
        }
        function ChangeBookingDate()
        {
            var  checkin= moment( vm.ChangeCheckInDate.date).format("MM/DD/YYYY") 
                , checkout =moment( vm.ChangeCheckoutDate.date).format("MM/DD/YYYY") 
                , Session_PolicyTypeID=vm.HotelInformationObject.pricepolicytypeid 
                , Session_StoreHotelID = vm.HotelInformation[0].HotelID
                , Session_Code = $cookies.get("lang")
                , Session_RoomPriceTypeID = vm.HotelInformationObject.pricetype
                , Session_RoomCountHid = vm.HotelInformationObject.roomcount
                , Session_HotelRoomIDAry = vm.HotelInformationObject.roomid
                ;

            bookService.changeBookingDate(checkin
                                     , checkout
                                     , Session_PolicyTypeID
                                     , Session_StoreHotelID
                                     , Session_Code
                                     , Session_RoomPriceTypeID
                                     , Session_RoomCountHid
                                     , Session_HotelRoomIDAry).then(function (response) {
                 vm.Countavailable = response;
                 if(vm.Countavailable==0)
                 {
                     vm.CountavailableNone = true;
                     //here it will show warning message..
                 }
                 else {
                     debugger;
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
                                 hotelId: Session_StoreHotelID,
                                 roomPriceTypeId: Session_RoomPriceTypeID,
                                 //no need to use Store Object to pass into json parameter
                                 //checkDatefrom: vm.storeHotelConfirms.checkdatefrom,
                                 //checkDateTo: vm.storeHotelConfirms.checkdateto,
                                 checkDatefrom: vm.HotelInformation[0].CheckDatefrom,
                                 checkDateTo: vm.HotelInformation[0].CheckDateto,
                                 roomCountHId: Session_RoomCountHid,
                                 policyTypeId: Session_PolicyTypeID,
                                 hotelRoomIdAry: Session_HotelRoomIDAry
                             };
                             vm.tempObj = json;
                             GetValuesWhileChangelangRe();
                         }
                         catch (tr) {
                             toastr.error(tr.message);

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
            });

        }

        //call this function to reupdate price and counts.
        function GetValuesWhileChangelangRe()
        {
            bookService.getValuesWhileChangelangRe(vm.tempObj).then(function (response) {
                debugger;
                SelectedHotelAfterChangeDate(response);
                //vm.HotelInformationObject = response;
                //vm.HotelInformation = vm.HotelInformationObject.list;
                // vm.convertedRoomPriceTotal = vm.HotelInformationObject.convertedRoomPriceTotal;
                // vm.total = vm.HotelInformationObject.total;
                // vm.totalInHotelCurrency = vm.HotelInformationObject.totalInHotelCurrency;

                ////check value must be > 0
                // if (vm.total && vm.total > 0) {
                //    $state.go("master.gbs.Home");
                //}
                //else {
                //    toastr.error("total value can't be zero, try again!");
                //}

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
                    debugger;
                    SelectedHotelAfterChangeDate(response);
                    //vm.HotelInformationObject = response;
                    //vm.HotelInformation = vm.HotelInformationObject.list;
                    // vm.convertedRoomPriceTotal = vm.HotelInformationObject.convertedRoomPriceTotal;
                    // vm.total = vm.HotelInformationObject.total;
                    // vm.totalInHotelCurrency = vm.HotelInformationObject.totalInHotelCurrency;

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
            if (hotelForm.$invalid) {
                toastr.error("Please fill all required fields");
            }
            else if ((!vm.selected_CreditTypeCode || vm.selected_CreditTypeCode == undefined) && vm.CreditCardNotRequired==0)
            {
                toastr.error("Select Credit Card Provider !");

            }
            else {

                

                var aryRoomCount = vm.HotelInformationObject.roomcount,
                    aryPriceType = vm.HotelInformationObject.pricetype,
                    aryHotelRoomID = vm.HotelInformationObject.roomid,
                    aryPricePolicyTypeID= vm.HotelInformationObject.pricepolicytypeid,
                    aryGuestname = Object.keys(vm.book.Guest).map(function (k) { return vm.book.Guest[k] }).join(","),
                    arySelectBedType = Object.keys(vm.book.BedPreference).map(function (k) { return vm.book.BedPreference[k].BedTypeNameWithCount }).join(","),
                    aryTavellerTypeSelect = Object.keys(vm.book.TravelerType).map(function (k) { return vm.book.TravelerType[k].TravellerType }).join(","),
                    aryEstimatedArrivalTimeSelect = Object.keys(vm.book.ArivalTime).map(function (k) { return vm.book.ArivalTime[k] }).join(","),
                    arySelectBedTypeID = Object.keys(vm.book.BedPreference).map(function (k) { return vm.book.BedPreference[k].BedTypeID }).join(","),
                    aryTavellerTypeSelectID = Object.keys(vm.book.TravelerType).map(function (k) { return vm.book.TravelerType[k].TravellerID }).join(",")
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
                    NameOnCreditcard: vm.profileCarddetails.cardHolderName,
                    CreditcardNumber: vm.profileCarddetails.CardNumber,
                    CVCCode: vm.profileCarddetails.CardCvc,
                    ExpirationMonth: vm.profileCarddetails.cardMonth,
                    ExpirationYear: vm.profileCarddetails.Year,
                    HotelID: vm.HotelInformation[0].HotelID,
                    CheckinDate: vm.HotelInformation[0].CheckDatefrom,
                    CheckOutDate: vm.HotelInformation[0].CheckDateto,
                    PayableAmount: vm.total,//PayableAmount,
                    Culturecode: $cookies.get("lang"),
                    LoggedUserID: (vm.LoggedUserID.indexOf('GUEST') != -1? "" : vm.LoggedUserID),
                    HiidenCurrencyCode: $cookies.get("currency"),
                    SpecialNote: vm.book.SpecialNote,
                    HotelName: vm.HotelInformation[0].HotelName,
                    RoomCount: [aryRoomCount],//fetch 
                    PriceType: [aryPriceType],//fetch 
                    Guestname: [aryGuestname],//fetch 
                    SelectBedType: [arySelectBedType],
                    TavellerTypeSelect: [aryTavellerTypeSelect],
                    EstimatedArrivalTimeSelect: [aryEstimatedArrivalTimeSelect],
                    HotelRoomID: [aryHotelRoomID],
                    SelectBedTypeID: [arySelectBedTypeID],
                    TavellerTypeSelectID: [aryTavellerTypeSelectID],
                    PricePolicyType: [aryPricePolicyTypeID],
                    CreditCardNotRequired: vm.CreditCardNotRequired,
                    culture: $cookies.get("lang"), 
                    HasDiscount: vm.hasDiscount
                };
                console.log(jsonReserv);
                bookService.hotelReservationFunc(jsonReserv).then(function (response) {
                    toastr.success("Booking Success");
                    vm.BookingSuccess = response;
                }).catch(function (error) {
                    toastr.error("Error occured while saving details.");
                });
            }
        }
        function getProfileDetailsIfAvailable(culture, userId) {
            bookService.getProfileDetailsIfAvailable(culture, userId).then(function (response) {
                vm.profiledetails = response;
            }).catch(function (error) {

            });
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
                vm.typeCreditCardByHotel = response;
                console.log(vm.typeCreditCardByHotel);
            }).catch(function (error) {

            });
        }
        //update selections
        function changecardupdate(CreditCardTypeID,CreditCardTypeName)
        {
            //debugger;
            vm.selected_CreditCardTypeID = CreditCardTypeID;
            vm.selected_CreditCardTypeName = CreditCardTypeName;
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
    bookController.$inject = ["$uibModal", "$cookies", "$stateParams", "bookService", "signInTitle", "dontMissOutMessage", "luckyDayMessgae", "loginService", "gbsHotelConfig", "$state"];

    function bookLoginController($uibModal, $rootScope, loginService, $uibModalInstance, $cookies, gbsHotelConfig, $state, $resource, $scope, $facebook, GOOGLE_API_KEY, $http) {
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
    bookLoginController.$inject = ["$uibModal", "$rootScope", "loginService", "$uibModalInstance", "$cookies", "gbsHotelConfig", "$state", "$resource", "$scope", "$facebook", "GOOGLE_API_KEY", "$http"];


/*    function bookDateController($uibModal, $rootScope, $uibModalInstance, $cookies, $state, $resource, $scope, $http)
    {
        debugger;
    }
    angular
   .module("book")
   .controller("bookDateController", bookDateController)
    bookLoginController.$inject = ["$uibModal", "$rootScope",  "$uibModalInstance", "$cookies", "$state", "$resource", "$scope", "$http"];

    */
})();