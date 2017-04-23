(function () {
    "use strict";
    function aboutusController($cookies, aboutusService) {
        var vm = this;

        vm.pageClass = 'page-about';

        function activate() {
            var culture = $cookies.get("lang");
            getAboutUs(culture);
            var arrId = "lblcontactus1,lblabout,lblfaq,lblterms,lblmanagereservation,lbladdproperty,lblextranetlogin,lblabout1,lblabout2";
            var arrMessageCode = "ContactUs,Aboutus,FAQ,TermsAndConditions,DisplayReservations,HotelApplication,Extranet Login,Aboutus,AboutGbshotels.com";
            getAboutUsTextMessage(culture, arrMessageCode, arrId);
        }
        activate();

        function getAboutUs(culture) {
            aboutusService.getAboutUs(culture).then(function (response) {
                vm.aboutus = response;
            }).catch(function (error) {
                toastr.error("Something goes wrong, Please try again.");
            })
        }
        function getAboutUsTextMessage(culture, messageCode, labelId) {
            aboutusService.getAboutUsTextMessage(culture, messageCode, labelId).then(function (response) {
                vm.aboutuslabel = response;
            }).catch(function (error) {

            })
        }
    }
    angular
   .module("aboutus")
   .controller("aboutusController", aboutusController);
    aboutusController.$inject = ["$cookies", "aboutusService"];
})();