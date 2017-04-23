(function () {
    "use strict";
    function hoteldetailService($q, hotelService) {
        var vm = this;
         
        vm.getSelectedHotel = function () {
            return this.SelectedHotel;
        };

        vm.setSelectedHotel = function (newValue) {
            this.SelectedHotel = newValue;
        };
        
        function getHotelSlideShowImage(culture,hotelId) {
            return hotelService.getHotelSlideShowImage(culture, hotelId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getReservationReviews(culture, hotelId) {
            return hotelService.getReservationReviews(culture, hotelId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getSummary(culture, hotelId) {
            return hotelService.getSummary(culture, hotelId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getHotelBasicInfo(culture, hotelId) {
            return hotelService.getHotelBasicInfo(culture, hotelId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getHotelSpecifications(culture, hotelId) {
            return hotelService.getHotelSpecifications(culture, hotelId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getAllReviews(culture, hotelId) {
            return hotelService.getAllReviews(culture, hotelId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getHotelsLocationByHotelID(culture, hotelId) {
            return hotelService.getHotelsLocationByHotelID(culture, hotelId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getTypeReview(culture) {
            return hotelService.getTypeReview(culture).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getRoomAvailabilityDetails(culture, hotelId, currentCurrency) {
            return hotelService.getRoomAvailabilityDetails(culture, hotelId, currentCurrency).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getHoteldetailTextMessage(culture, messageCode, labelId) {
            return hotelService.getTextMessage(culture, messageCode, labelId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getHotelMainregion(CurrentCulture, HotelID, RegionID, CountryID) {
            return hotelService.getHotelMainregion(CurrentCulture, HotelID, RegionID, CountryID).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getHotelPolicy(HotelID) {
            try{ 
                var isData= hotelService.getHotelPolicy(HotelID).then(function (data) {
                    return data;
                }).catch(function (error) {
                    return $q.reject(error);
                });
                if(isData)
                {
                    return isData;
                }
                else {
                    return null;
                }
            }
            catch(etr){
                console.log(etr);
            }
        }
        function updateHotelSearchHistory(userId, hotelId) {
            return hotelService.updateHotelSearchHistory(userId, hotelId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function checkRoomAvailbility(culture, hotelId, dateFrom, dateTo, currentCurrency) {
            return hotelService.checkRoomAvailbility(culture, hotelId, dateFrom, dateTo, currentCurrency).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getHotelPromotion(culture, hotelId, dateFrom, dateTo) {
            return hotelService.getHotelPromotion(culture, hotelId, dateFrom, dateTo).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function storeHotelRoomInfo(culture, checkDatefrom, checkDateto, hotelCity, hotelId, address, mainPhotoName,
            hotelClass, hotelname, roomId, uniqueId, accommodationTypeId, accommodationTypeName, accommodationTypeDescription, pricePolicyTypeId, pricePolicyTypeName, singleRate, doubleRate,
            dailyRoomPrices, originalRoomPrice, currencyId, currencySymbol, roomCount, maxpeoplecount, roomprice, currencyCode, hoteltypename,
            pricetype, creditCardNotRequired, currentCurrency) {

            return hotelService.storeHotelRoomInfo(culture, checkDatefrom, checkDateto, hotelCity, hotelId, address, mainPhotoName,
            hotelClass, hotelname, roomId, uniqueId, accommodationTypeId, accommodationTypeName, accommodationTypeDescription, pricePolicyTypeId, pricePolicyTypeName, singleRate, doubleRate,
            dailyRoomPrices, originalRoomPrice, currencyId, currencySymbol, roomCount, maxpeoplecount, roomprice, currencyCode, hoteltypename,
            pricetype, creditCardNotRequired, currentCurrency).then(function (data) {

                // check here : by AB
                vm.setSelectedHotel(data);
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }

        function insertIntoWishlist(userId, hotelId) {
            return hotelService.insertIntoWishlist(userId, hotelId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        //check wishlist of user
        function checkuserWishlistStaus(userId, hotelId) {
            return hotelService.checkuserWishlistStaus(userId, hotelId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function getHotelRoomPopUpDetails(RoomId, CultureID, HotelId) {
            return hotelService.getHotelRoomPopUpDetails(RoomId, CultureID, HotelId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        var service = {
            storeHotelRoomInfo:storeHotelRoomInfo,
            getHotelSlideShowImage: getHotelSlideShowImage,
            getReservationReviews: getReservationReviews,
            getSummary: getSummary,
            getHotelBasicInfo: getHotelBasicInfo,
            getHotelSpecifications: getHotelSpecifications,
            getAllReviews: getAllReviews,
            getTypeReview: getTypeReview,
            getRoomAvailabilityDetails: getRoomAvailabilityDetails,
            getHotelsLocationByHotelID: getHotelsLocationByHotelID,
            getHoteldetailTextMessage: getHoteldetailTextMessage,
            getHotelMainregion: getHotelMainregion,
            // below new service added on 1st Dec 2016
            getHotelPolicy: getHotelPolicy,
            updateHotelSearchHistory: updateHotelSearchHistory,
            checkRoomAvailbility: checkRoomAvailbility,
            getHotelPromotion: getHotelPromotion,
            getSelectedHotel: this.getSelectedHotel,
            setSelectedHotel: this.setSelectedHotel,
            // insert to wishlist
            insertIntoWishlist: insertIntoWishlist,
            checkuserWishlistStaus: checkuserWishlistStaus,
            getHotelRoomPopUpDetails: getHotelRoomPopUpDetails
        }

        return service;
    }

    angular
    .module("hoteldetail")
    .service("hoteldetailService", hoteldetailService);
    hoteldetailService.$inject = ["$q", "hotelService"];
})();