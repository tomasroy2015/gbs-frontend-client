(function () {
    "use strict";
    function propertyController($scope, $cookies, hotelService, propertyService, $uibModal) {
        var vm = this;
        vm.countryChange = countryChange;
        vm.addProperty = addProperty;
        vm.countryList = [];
        vm.phoneValidator = "/^[0-9]$/"
        vm.showTermsPopup = showTermsPopup;
        activate();
        function activate() {
            vm.TermsAndConditions == false;
            setTimeout(function () {
                var culture = $cookies.get("lang");
                var arrId = "lblAddProperty,lblPageTitle,lblHotelinfo,lblHotelName,lblHotelCountry,lblHotelCity,lblHotelAddress,lblHotelPhone,lblHotelFax," +
       "lblHotelType,lblHotelClass,lblAccommodationType,lblRoomCount,lblHotelWebAddress,lblHotelEmail,lblHotelCurrency," +
       "lblHotelCondition,lblChannelManager,lblHotelRoomInfo,lblHotelRoomType,lblHotelRoomCount,lblHotelRoomSize,lblHotelRoomMaxPeopleCount," +
       "lblHotelRoomMaxChildrenCount,lblHotelRoomBabyCotCount,lblHotelRoomExtraBedCount,lblHotelRoomSmoking,lblHotelRoomView,lblHotelRoomAttribute," +
       "lblFirmAndUserInfo,lblFirmName,lblContactPersonSalutation,lblContactPersonName,lblContactPersonSurname,lblContactPersonPhone," +
       "lblContactPersonEmail,lblContactPersonPosition,lblHotelCreditCardCaption,lblHotelCancelPolicy,lblRefundableDayCount,lblPenaltyRate," +
       "lblUserInfoAgreementText,lblAdd";

                var arrMessageCode = "HotelApplication,HotelApplication,HotelInfo,HotelName,HotelCountry,HotelCity,HotelAddress,HotelPhone,HotelFax," +
                "HotelType,HotelClass,AccommodationType,RoomCount,HotelWebAddress,HotelEmail,HotelReservationCurrency," +
                "HotelConditions,ChannelManager,HotelRoomInfo,RoomType,RoomCount,RoomSize,RoomMaxPeopleCount," +
                "RoomMaxChildrenCount,RoomBabyCotCount,RoomExtraBedCount,Smoking,RoomView,RoomFacilities," +
                "FirmAndUserInfo,FirmName,ContactPersonSalutation,ContactPersonName,ContactPersonSurname,ContactPersonPhone," +
                "ContactPersonEmail,ContactPersonPosition,HotelCreditCard,CancelPolicy,HotelRefundableDayCount,ReservationPenaltyRate," +
                "UserInfoAgreementText,Add";

                getPropertyTextMessage(culture, arrMessageCode, arrId);
            }, 1000);
            getCountry();
            getPropertyType();
            getPropertyClass();
            getAccommodationList();
            getReservationCurrency();
            getCreditCard();
            getChannelManager();
            getBabyCoat();
            getExtraBed();
            getChildrenPolicyList();
            getRoomView();
            getSmokingStatus();
            getRoomType();
            getRoomFacilities();
            getDomesticAnimal();
            getParking();
            getInternet();
            cancelationPolicy();
            getIpAddress();
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
        function getInternet() {
            hotelService.getInternet($cookies.get("lang")).then(function (response) {
                vm.internetList = response;
            });
        }

        function getParking() {
            hotelService.getParking($cookies.get("lang")).then(function (response) {
                vm.parkingList = response;
            });
        }

        function addProperty(form) {
            if (form.$invalid) {
                toastr.error("Please fill all required fields");
            }
            else {
                var propertyObj = {
                    "HotelName": vm.hotel,
                    "ProCountry": vm.country,
                    "ProCity": vm.city,
                    "ProAddress": vm.Address,
                    "ProPhone": vm.Phone,
                    "ProFax": vm.Fax,
                    "ProType": vm.Type,
                    "ProClass": vm.Class,
                    "ProAccommodation": vm.Accommodation,
                    "ProRoomCount": vm.Rooms,
                    "ProWebsite": vm.webSite,
                    "ProEmail": vm.Email,
                    "ProResCurrency": vm.ReservationCurrency,
                    "listcards": null,
                    "HotelAttributeId": null,
                    "ChargeType": null,
                    "RadioRefund": vm.Policy,
                    "RefundCancel": vm.beforeCancelDays,
                    "PenaltyRate": vm.cancelationPolicyId,
                    "ChannelManager": vm.ChannelManager,

                    "RoomType": vm.RoomType,
                    "RoomCount": vm.RoomCount,
                    "RoomSpace": vm.RoomSpace,
                    "RoomMaxPerson": vm.MaxPersons,
                    "RoomMaxChildren": vm.MaxChildren,
                    "RoomBabyCots": vm.MaxBabyCot,
                    "RoomExBabyCots": vm.ExtraBed,
                    "RoomSmoking": vm.SmokingStatus,
                    "RoomView": vm.RoomView,
                    "Facilities": null,
                    "FirmName": vm.FirmName,
                    "Salutation": vm.Salutation,
                    "ContactPersonName": vm.ExecutiveName,
                    "ContactPersonSurname": vm.ExecutiveSurname,
                    "ContactPersonPhone": vm.ExecutivePhone,
                    "ContactPersonEmail": vm.ExecutiveEMail,
                    "ContactPersonPosition": vm.ExecutiveTitle,
                    "CultureID": $cookies.get("lang"),
                    "IpAddress": vm.IpAddress
                }
                _.each(vm.creditCardList, function (card) {
                    if (card.isChecked) {
                        propertyObj.listcards = propertyObj.listcards + card.Id + ","
                    }
                });
                propertyObj.listcards = propertyObj.listcards.substring(0, propertyObj.listcards.length - 1);
                propertyObj.CityName = _.find(vm.cityList, function (city) {
                    return city.Id == propertyObj.ProCity;
                }).CityName;

                var selectedFacility = _.each(vm.RoomFacilityList, function (list) {
                    if (list.isChecked) {
                        propertyObj.Facilities = propertyObj.Facilities + list.Id + ",";
                    }
                });

                var babyCoat = _.find(vm.babyCoatList, function (coat) {
                    return coat.Id == vm.BabyCoat;
                });
                if (babyCoat !== null && babyCoat !== undefined) {
                    propertyObj.HotelAttributeId = propertyObj.HotelAttributeId + babyCoat.Id + ",";
                    propertyObj.ChargeType = babyCoat.Charge.toString() + ",";
                }

                var extraBed = _.find(vm.extraBedList, function (coat) {
                    return coat.Id == vm.ExtraBeds;
                });
                if (extraBed !== null && extraBed !== undefined) {
                    propertyObj.HotelAttributeId = propertyObj.HotelAttributeId + extraBed.Id + ",";
                    propertyObj.ChargeType = propertyObj.ChargeType + extraBed.Charge.toString() + ",";
                }

                var childrenPolicy = _.find(vm.childrenPolicyList, function (coat) {
                    return coat.Id == vm.ChildrenPolicy;
                });
                if (childrenPolicy !== null && childrenPolicy !== undefined) {
                    propertyObj.HotelAttributeId = propertyObj.HotelAttributeId + childrenPolicy.Id + ",";
                    propertyObj.ChargeType = propertyObj.ChargeType + childrenPolicy.Charge.toString() + ",";
                }

                var internet = _.find(vm.internetList, function (coat) {
                    return coat.Id == vm.Internet;
                });
                if (internet !== null && internet !== undefined) {
                    propertyObj.HotelAttributeId = propertyObj.HotelAttributeId + internet.Id + ",";
                    propertyObj.ChargeType = propertyObj.ChargeType + internet.Charge.toString() + ",";
                }

                var parking = _.find(vm.parkingList, function (coat) {
                    return coat.Id == vm.Parking;
                });
                if (parking !== null && parking !== undefined) {
                    propertyObj.HotelAttributeId = propertyObj.HotelAttributeId + parking.Id + ",";
                    propertyObj.ChargeType = propertyObj.ChargeType + parking.Charge.toString() + ",";
                }

                var domesticAnimal = _.find(vm.domesticAnimalList, function (coat) {
                    return coat.Id == vm.DomesticAnimals;
                });
                if (domesticAnimal !== null && domesticAnimal !== undefined) {
                    propertyObj.HotelAttributeId = propertyObj.HotelAttributeId + domesticAnimal.Id + ",";
                    propertyObj.ChargeType = propertyObj.ChargeType + domesticAnimal.Charge.toString() + ",";
                }
                propertyObj.HotelAttributeId = propertyObj.HotelAttributeId.substring(0, propertyObj.HotelAttributeId.length - 1);
                propertyObj.ChargeType = propertyObj.ChargeType.substring(0, propertyObj.ChargeType.length - 1);
               
                propertyService.saveProperty(propertyObj).then(function (response) {
                    if (response == true)
                        toastr.success("Property added successfully.");
                    else
                        toastr.error("Error occured while add property");
                }).catch(function (error) {
                    toastr.error(error);
                })
                // vm.selectedFacility selected facilities
                // vm.selectedCard selected Cards
            }
        }

        function getIpAddress() {
            propertyService.getIpAddress().then(function (response) {
                vm.IpAddress = response;
            }).catch(function (error) {

            })
        }

        function getDomesticAnimal() {
            hotelService.getDomesticAnimal($cookies.get("lang")).then(function (response) {
                vm.domesticAnimalList = response;
            });
        }

        function getRoomFacilities() {
            hotelService.GetRoomFacilities($cookies.get("lang")).then(function (response) {
                vm.RoomFacilityList = response;
                _.each(vm.RoomFacilityList, function (list) {
                    list.isChecked = false;
                });
            });
        }

        function cancelationPolicy() {
            propertyService.getCancelationPolicy($cookies.get("lang")).then(function (response) {
                vm.cancelationPolicy = response;
            }).catch(function (error) {

            });
        }
        function getRoomView() {
            hotelService.getRoomView($cookies.get("lang")).then(function (response) {
                vm.roomViewList = response;
            });
        }

        function getSmokingStatus() {
            hotelService.getSmokingStatus($cookies.get("lang")).then(function (response) {
                vm.smokingStatusList = response;
            });
        }

        function getRoomType() {
            hotelService.getRoomType($cookies.get("lang")).then(function (response) {
                vm.roomTypeList = response;
            });
        }

        function getChildrenPolicyList() {
            hotelService.getChildrenPolicy($cookies.get("lang")).then(function (response) {
                vm.childrenPolicyList = response;
            });
        }

        function getExtraBed() {
            hotelService.getExtraBedList($cookies.get("lang")).then(function (response) {
                vm.extraBedList = response;
            });
        }

        function getBabyCoat() {
            hotelService.getBabyCoat($cookies.get("lang")).then(function (response) {
                vm.babyCoatList = response;
            });
        }

        function getChannelManager() {
            hotelService.getChannelManager().then(function (response) {
                vm.channelManagerList = response;
            });
        }

        function getCreditCard() {
            hotelService.getCreditCard().then(function (response) {
                vm.creditCardList = response;
                _.each(vm.creditCardList, function (card) {
                    card.isChecked = false;
                });
            });
        }

        function getReservationCurrency() {
            hotelService.getPropertyReservationCurrency($cookies.get("lang")).then(function (response) {
                vm.reservationCurrencyList = response;
            });
        }

        function countryChange(countryId) {
            vm.cityList = [];
            vm.city = '';
            if (countryId !== undefined) {
                hotelService.getCityForDropdownByCountryId(countryId, $cookies.get("lang")).then(function (response) {
                    if (angular.isArray(response)) {
                        vm.cityList = response;
                    } else {
                        toastr.warning(response);
                    }
                });
            }
        }

        function getCountry() {
            hotelService.getCountryForDropdown($cookies.get("lang")).then(function (response) {
                vm.countryList = response;
            });
        }

        function getPropertyType() {
            hotelService.getPropertyType($cookies.get("lang")).then(function (response) {
                vm.propertyTypeList = response;
            })
        }

        function getPropertyClass() {
            hotelService.getPropertyClass($cookies.get("lang")).then(function (response) {
                vm.propertyClassList = response;
            });

        }

        function getAccommodationList() {
            hotelService.getPropertyAccommodationList($cookies.get("lang")).then(function (response) {
                vm.propertyAccommodationList = response;
            });
        }
        function getPropertyTextMessage(culture, messageCode, labelId) {
            console.log("property text message");
            return hotelService.getTextMessage(culture, messageCode, labelId).then(function (response) {
                vm.propertylabel = response;
            }).catch(function (error) {
                return error;
            });
        }
    }
    angular
    .module("property")
    .controller("propertyController", propertyController)
    propertyController.$inject = ["$scope", "$cookies", "hotelService", "propertyService","$uibModal"];
})();