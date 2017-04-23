(function () {
    "use strict";
    function profileController($rootScope, $cookies, profileService) {
        var vm = this;
        activate();
        function activate() {
            var culture = $cookies.get("lang");
            var userId=$cookies.get("userId");
            var arrId = "lblsettings,lblbookinghistory,lblcrdeicardinfo,lblwhislist,lbloverview,lbltrvaletype,lblTotalTraveled,lblRecentlyActive,lblYourList,lblCity,lblCountry,lblTrips,lblHello,lblMemberSince,lblReservationID,lblProperty,lblTotalRoomPrice,lblReservationID1,lblPinCode,lblReservationDate,lblProperty1,lblCheckInDate,lblCheckOutDate,lblPayableAmount,lblStatus";
            var arrMessageCode = "Settings,Bookinghistory,CreditCardInfo,Mywishlists,Overview1,TravellerType,TotalTraveled,RecentlyActive,YourList,City,Country,Trips,Hello,MemberSince,ReservationID,Property,TotalRoomPrice,ReservationID,PinCode,ReservationDate,Property,CheckInDate,CheckOutDate,PayableAmount,Status";
            getRecentActiveReservation(culture, $cookies.get("userId"));
            getYourReservation(culture, $cookies.get("userId"));
            getProfileTextMessage(culture, arrMessageCode, arrId);
            //getUserDashboardDetails(culture, userId);
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
        //function getUserDashboardDetails(culture, userId) {
        //    if (!$rootScope.userDashboard) {
        //        profileService.getUserDashboardDetails(culture, userId).then(function (response) {
        //            vm.userDashboard = response;
        //        }).catch(function (error) {

        //        });
        //    }
        //    else {
        //        vm.userDashboard = $rootScope.userDashboard;
        //    }
        //}
    }
    angular
    .module("profileView")
    .controller("profileController", profileController)
    profileController.$inject = ["$rootScope", "$cookies", "profileService"];
})();