(function () {
    "use strict";
    function profileController($cookies, profileService) {
        var vm = this;
        activate();
        function activate() {
            var culture = $cookies.get("lang");
            var arrId = "lblsettings,lblbookinghistory,lblcrdeicardinfo,lblwhislist,lbloverview,lbltrvaletype,lblTotalTraveled,lblRecentlyActive,lblYourList,lblCity,lblCountry,lblTrips,lblHello,lblMemberSince,lblReservationID,lblProperty,lblTotalRoomPrice,lblReservationID1,lblPinCode,lblReservationDate,lblProperty1,lblCheckInDate,lblCheckOutDate,lblPayableAmount,lblStatus";
            var arrMessageCode = "Settings,Bookinghistory,CreditCardInfo,Mywishlists,Overview1,TravellerType,TotalTraveled,RecentlyActive,YourList,City,Country,Trips,Hello,MemberSince,ReservationID,Property,TotalRoomPrice,ReservationID,PinCode,ReservationDate,Property,CheckInDate,CheckOutDate,PayableAmount,Status";
            getRecentActiveReservation(culture, 140004);
            getYourReservation(culture, 140004);
            getProfileTextMessage(culture, arrMessageCode, arrId);
        }

        function getRecentActiveReservation(culture, userId) {
            profileService.getRecentActiveReservation(culture, userId).then(function (response) {
                vm.listRecentActiveReservation = response;
            }).catch(function (error) {

            })
        }
        function getYourReservation(culture, userId) {
            profileService.getYourReservation(culture, userId).then(function (response) {
                vm.listYourReservation = response;
            }).catch(function (error) {

            })
        }
        function getProfileTextMessage(culture, messageCode, labelId) {
            profileService.getProfileTextMessage(culture, messageCode, labelId).then(function (response) {
                vm.profilelabel = response;
            }).catch(function (error) {

            })
        }
    }
    function profileSettingController($cookies, profileSettingService) {
        var vm = this;
        activate();

        function activate() {
            var culture = $cookies.get("lang");
            getProfileDetails(culture, 140004);
        }

        function getProfileDetails(culture, userId) {
            profileSettingService.getProfileDetails(culture, userId).then(function (response) {
                vm.profileDetail = response;
            }).catch(function (error) {

            })
        }

    }
    function profileBookingHistoryController($cookies, profileService) {
        var vm = this;
        activate();
        function activate() {
        }
    }
    function profileCreditCardController($cookies, profileService) {
        var vm = this;
        activate();
        function activate() {
        }
    }
    function profileMyWishlistController($cookies, profileService) {
        var vm = this;
        activate();
        function activate() {

        }
    }
    angular
    .module("profile")
    .controller("profileController", profileController)
    .controller("profileSettingController", profileSettingController)
    .controller("profileBookingHistoryController", profileBookingHistoryController)
    .controller("profileCreditCardController", profileCreditCardController)
    .controller("profileMyWishlistController", profileMyWishlistController)
    profileController.$inject = ["$cookies", "profileService"];
    profileSettingController.$inject = ["$cookies", "profileSettingService"];
    profileBookingHistoryController.$inject = ["$cookies", "profileService"];
    profileCreditCardController.$inject = ["$cookies", "profileService"];
    profileMyWishlistController.$inject = ["$cookies", "profileService"];

})();