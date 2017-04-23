(function () {
    "use strict";
    function footerController($cookies, footerService, $rootScope, $scope) {
        var vm = this;
        vm.subscribe = subscribe;
        vm.subscribeData = {};

        activate();
        function activate() {
            var culture = $cookies.get("lang");
            var arrId = "lblverification,lblverificationsuccess,lblsubscribenow,lblsignup,txtname_box,txtemail_box,lblneversend,btnsub,lblmanagereservations,lblreservationcode,lblpicode,btnshow,lblNoRecordFoundMessage,lblNoRecordForWishList,lblAboutus,lblContactUs,lblFAQ,lblTermsAndConditions,lblDisplayReservation,lblHotelApplication,lblExtranetLogin,lblGbshotelsCopyRight,lblFOLLOWUS,lblJoinUs,lnkDisplayReservation,lnkHotelApplication,lnkExtranetLogin,lblGBSOffer";
            var arrMessageCode ="EmailFieldWarning,InsertedSuccessFully,SubscribeNow,Signuptoreceive,UserName,Email Address,WeNeverSend,Subscribe,DisplayReservations,ReservationID,PinCode,Show,NoRecordFoundMessage,NoRecordFoundMessage,Aboutus,ContactUs,FAQ,TermsAndConditions,DisplayReservations,HotelApplication,Extranet Login,GbshotelsCopyRight,FOLLOWUS,JoinUs,DisplayReservation,HotelApplication,Extranet Login,GBSOffer";
            getTeamConditionTextMessage(culture, arrMessageCode, arrId);
        }

        function subscribe() {

            if (vm.subscribeData.email == null || vm.subscribeData.username == null || vm.subscribeData.email == undefined || vm.subscribeData.username == undefined || vm.subscribeData.username == "" || vm.subscribeData.email == "") {
                toastr.error("Username and email required");
            }
            else {
                footerService.sendSubscribe(vm.subscribeData).then(function (response) {
                    toastr.info("Record has been sent successfully.");
                }).catch(function (error) {
                    toastr.error("Something goes wrong, Please try again.");
                })
            }
        }
        function getTeamConditionTextMessage(culture, messageCode, labelId) {
            footerService.getFooterTextMessage(culture, messageCode, labelId).then(function (response) {
                vm.footerlabel = response;
            }).catch(function (error) {

            })
        }

        // use below to hide the global loader: welcome message
        $scope.$on('$viewContentLoaded',
          function (event) {
              //console.log("footer $viewContentLoaded");
              setTimeout(
                function () {
                    $rootScope.isShowLoader = false;
                }, 800);
          });
    }
    angular
    .module("app")
    .controller("footerController", footerController)
    .run(function ($rootScope) {
           //console.log("init footerController")
       });
    footerController.$inject = ["$cookies", "footerService", "$rootScope", "$scope"];

})();