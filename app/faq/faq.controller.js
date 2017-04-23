(function () {
    "use strict";
    function faqController($cookies, faqService) {
        var vm = this;


        function activate() {
            var culture = $cookies.get("lang");
            getFAQ(culture);
            var arrId = "lblcontactus1,lblabout,lblfaq,lblterms,lblmanagereservation,lbladdproperty,lblextranetlogin";
            var arrMessageCode = "ContactUs,Aboutus,FAQ,TermsAndConditions,DisplayReservations,HotelApplication,Extranet Login";
            getFAQTextMessage(culture, arrMessageCode, arrId);
        }
        activate();

        function getFAQ(culture) {
            faqService.getFAQ(culture).then(function (response) {
                vm.listFAQ = response;
            }).catch(function (error) {

            })
        }

        function getFAQTextMessage(culture, messageCode, labelId) {
            faqService.getFAQTextMessage(culture, messageCode, labelId).then(function (response) {
                vm.FAQlabel = response;
            }).catch(function (error) {

            })
        }
    }
    angular
   .module("faq")
   .controller("faqController", faqController);
    faqController.$inject = ["$cookies", "faqService"];
})();