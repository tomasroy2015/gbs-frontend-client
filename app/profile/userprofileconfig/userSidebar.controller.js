(function () {
    "use strict";
    function userProfileSidebarController($uibModal, $rootScope, $cookies, userProfileSidebarController, gbsHotelConfig) {
        var vm = this;
        vm.changeTitle = changeTitle;
        vm.username = $cookies.get("username");
        vm.EditImage = EditImage;
        $rootScope.userphoto = "./Images/profilePic.png";
        activate();
        function activate() {
            var userId = $cookies.get("userId");
            var culture = $cookies.get("lang");
            var arrId = "lblsettings,lblbookinghistory,lblcrdeicardinfo,lblwhislist,lbloverview,lbltrvaletype,lblTotalTraveled,lblRecentlyActive,lblYourList,lblCity,lblCountry,lblTrips,lblHello,lblMemberSince,lblReservationID,lblProperty,lblTotalRoomPrice,lblReservationID1,lblPinCode,lblReservationDate,lblProperty1,lblCheckInDate,lblCheckOutDate,lblPayableAmount,lblStatus";
            var arrMessageCode = "Settings,Bookinghistory,CreditCardInfo,Mywishlists,Overview1,TravellerType,TotalTraveled,RecentlyActive,YourList,City,Country,Trips,Hello,MemberSince,ReservationID,Property,TotalRoomPrice,ReservationID,PinCode,ReservationDate,Property,CheckInDate,CheckOutDate,PayableAmount,Status";

            getUserDashboardDetails(culture, userId);
            getProfileTextMessage(culture, arrMessageCode, arrId);
           
        }

        function getUserDashboardDetails(culture, userId) {
            userProfileSidebarController.getUserDashboardDetails(culture, userId).then(function (response) {
                //vm.userDashboard = response;
                $rootScope.userDashboard = response;
                $rootScope.isUserGenius = $rootScope.userDashboard.Genius ? true : false;
                var photourl = $rootScope.userDashboard.UserPhoto;
                if (photourl) {
                    if (photourl.indexOf("graph.facebook.com") != -1 || photourl.indexOf("googleusercontent.com") != -1) {
                        $rootScope.userphoto = photourl;
                    }
                    else if (photourl.indexOf("37c658304ec04310263ebfe3280f0894304a18c4") != -1) {
                        $rootScope.userphoto = "./Images/Users/" + photourl;
                    }
                    else {
                        $rootScope.userphoto = "./Images/Users/" + photourl;
                    }
                }
            }).catch(function (error) {

            })
        }

        function EditImage() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: "app/profile/profileSettings/uploadImage.popup.tmpl.html?v=3.10",
                controller: 'imageUploadController',
                controllerAs: "vm",
                backdrop: 'static',
                keyboard: false
            });
        }

        function changeTitle(title, tabName) {
            $("#overview").removeClass('active')
            $("#setting").removeClass('active')
            $("#bookingHistory").removeClass('active')
            $("#creditCard").removeClass('active')
            $("#wishList").removeClass('active')
            $rootScope.$broadcast('changeProfileTitle', title);
            switch (tabName) {
                case "overview":
                    $("#overview").addClass('active');
                    break;
                case "setting":
                    $("#setting").addClass('active')
                    break;
                case "bookingHistory":
                    $("#bookingHistory").addClass('active')
                    break;
                case "creditCard":
                    $("#creditCard").addClass('active')
                    break;
                case "wishList":
                    $("#wishList").addClass('active')
                    break;
            }
        }

        function getProfileTextMessage(culture, messageCode, labelId) {
            userProfileSidebarController.getProfileTextMessage(culture, messageCode, labelId).then(function (response) {
                vm.profilelabel = response;
            }).catch(function (error) {

            })
        }

    }
    angular
    .module("profile")
    .controller("userProfileSidebarController", userProfileSidebarController);
    userProfileSidebarController.$inject = ["$uibModal", "$rootScope", "$cookies", "profileService", "gbsHotelConfig"];

})();