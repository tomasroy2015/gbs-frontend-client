(function () {
    "use strict";
    function bookService($q, hotelService, hoteldetailService) {
        var vm = this;
        /*** return the selected Hotel object **/
        function getSelectedHotel() {
            return hoteldetailService.getSelectedHotel();
        }
        // only get the object from hotelDetail booking event
        //this.setSelectedHotel = function (newValue) {
        //    hoteldetailService.SelectedHotel = newValue;
        //}
        /**end **/
       
        function getCountryForDropdown(culture) {
          return  hotelService.getCountryForDropdown(culture).then(function (response) {
                return response;
            }).catch(function (error) {
               return $q.reject(error);
            })
        }
     
        function saveBooking(bookingData) {
            return hotelService.BookHotel(bookingData).then(function (response) {
                return response;
            }).catch(function (error) {
                return $q.reject(error);
            })
        }
        function getProfileDetailsIfAvailable(culture, userId) {
            return hotelService.getProfileDetailsIfAvailable(culture, userId).then(function (response) {
                return response;
            }).catch(function (error) {
                return $q.reject(error);
            })
        }
        //call on change date on booking module view
        function changeBookingDate(
              checkin
             ,checkout
             ,Session_PolicyTypeID
             ,Session_StoreHotelID
             ,Session_Code
             ,Session_RoomPriceTypeID  
             ,Session_RoomCountHid  
             ,Session_HotelRoomIDAry
            ) {
            return hotelService.changeBookingDate(checkin
             , checkout
             , Session_PolicyTypeID
             , Session_StoreHotelID
             , Session_Code
             , Session_RoomPriceTypeID
             , Session_RoomCountHid
             , Session_HotelRoomIDAry).then(function (response) {
                return response;
            }).catch(function (error) {
                return $q.reject(error);
            })
        }

        //call again to update changed date Room prices for booking module
        //function storeHotelRoomInfo(culture, checkDatefrom, checkDateto, hotelCity, hotelId, address, mainPhotoName,
        //    hotelClass, hotelname, roomId, uniqueId, accommodationTypeId, accommodationTypeName, accommodationTypeDescription, pricePolicyTypeId, pricePolicyTypeName, singleRate, doubleRate,
        //    dailyRoomPrices, originalRoomPrice, currencyId, currencySymbol, roomCount, maxpeoplecount, roomprice, currencyCode, hoteltypename,
        //    pricetype, creditCardNotRequired, currentCurrency) {

        //    return hotelService.storeHotelRoomInfo(culture, checkDatefrom, checkDateto, hotelCity, hotelId, address, mainPhotoName,
        //    hotelClass, hotelname, roomId, uniqueId, accommodationTypeId, accommodationTypeName, accommodationTypeDescription, pricePolicyTypeId, pricePolicyTypeName, singleRate, doubleRate,
        //    dailyRoomPrices, originalRoomPrice, currencyId, currencySymbol, roomCount, maxpeoplecount, roomprice, currencyCode, hoteltypename,
        //    pricetype, creditCardNotRequired, currentCurrency).then(function (data) {
        //        return data;
        //    }).catch(function (error) {
        //        return $q.reject(error);
        //    });
        //}

        function getValuesWhileChangelangRe(jsonObj)
        {
            return hotelService.getValuesWhileChangelangRe(jsonObj).then(
                function (response) {
                    return response;
                 }).catch(function (error) {
                return $q.reject(error);
            })
        }

        function typeTraveller(culture) {
            return hotelService.typeTraveller(culture).then(function (response) {
                return response;
            }).catch(function (error) {
                return $q.reject(error);
            })
        }
        function getSalutation(culture) {
            return hotelService.getSalutation(culture).then(function (response) {
                return response;
            }).catch(function (error) {
                return $q.reject(error);
            })
        }
        function getUserSavedCardDetailsByHotel(userId, hotelId) {
            return hotelService.getUserSavedCardDetailsByHotel(userId, hotelId).then(function (response) {
                return response;
            }).catch(function (error) {
                return $q.reject(error);
            })
        }
        function getBookingTextMessage(culture, messageCode, labelId) {
            return hotelService.getTextMessage(culture, messageCode, labelId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }

        function typeMonth(culture) {
            return hotelService.typeMonth(culture).then(function (response) {
                return response;
            }).catch(function (error) {
                return $q.reject(error);
            })
        }
                
        function typeCreditCardByHotel(culture, hotelId) {
            return hotelService.typeCreditCardByHotel(culture, hotelId).then(function (response) {
                return response;
            }).catch(function (error) {
                return $q.reject(error);
            })
        }

        function hotelReservationFunc(jsonReserv) {
            return hotelService.hotelReservationFunc(
                  jsonReserv.TotalPricewithTax
                , jsonReserv.title
                , jsonReserv.Name
                , jsonReserv.SurName
                , jsonReserv.Email
                , jsonReserv.Phone
                , jsonReserv.Country
                , jsonReserv.CreditcardProvider
                , jsonReserv.NameOnCreditcard
                , jsonReserv.CreditcardNumber
                , jsonReserv.CVCCode
                , jsonReserv.ExpirationMonth
                , jsonReserv.ExpirationYear
                , jsonReserv.HotelID
                , jsonReserv.CheckinDate
                , jsonReserv.CheckOutDate
                , jsonReserv.PayableAmount
                , jsonReserv.Culturecode
                , jsonReserv.LoggedUserID
                , jsonReserv.HiidenCurrencyCode
                , jsonReserv.SpecialNote
                , jsonReserv.HotelName
                , jsonReserv.RoomCount
                , jsonReserv.PriceType
                , jsonReserv.Guestname
                , jsonReserv.SelectBedType
                , jsonReserv.TavellerTypeSelect
                , jsonReserv.EstimatedArrivalTimeSelect
                , jsonReserv.HotelRoomID
                , jsonReserv.SelectBedTypeID
                , jsonReserv.TavellerTypeSelectID
                , jsonReserv.PricePolicyType
                , jsonReserv.CreditCardNotRequired
                , jsonReserv.culture
                , jsonReserv.HasDiscount).then(function (response) {
                return response;
            }).catch(function (error) {
                return $q.reject(error);
            })
        }

        var service = {
            getSalutation:getSalutation,
            typeTraveller:typeTraveller,
            getUserSavedCardDetailsByHotel:getUserSavedCardDetailsByHotel,
            getProfileDetailsIfAvailable: getProfileDetailsIfAvailable,
            changeBookingDate: changeBookingDate,
            //storeHotelRoomInfo:storeHotelRoomInfo,
            getValuesWhileChangelangRe:getValuesWhileChangelangRe,
            getCountryForDropdown: getCountryForDropdown,
            getBookingTextMessage: getBookingTextMessage,
            getSelectedHotel: getSelectedHotel,
            hotelReservationFunc: hotelReservationFunc
                , typeMonth: typeMonth
                , typeCreditCardByHotel: typeCreditCardByHotel
        }


        return service;
    }

    angular
    .module("book")
    .service("bookService", bookService);
    bookService.$inject = ["$q", "hotelService","hoteldetailService"];
})();