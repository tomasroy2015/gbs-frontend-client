(function () {
    "use strict";
    function termsandconditionController($cookies, termsandconditionService) {
        var vm = this;
         
        //vm.hideTermsPopup = hideTermsPopup;
        function activate() {
            var culture = $cookies.get("lang");
            var arrId = "lblcontactus1,lblabout,lblfaq,lblterms,lblmanagereservation,lbladdproperty,lblextranetlogin";
            var arrMessageCode = "ContactUs,Aboutus,FAQ,TermsAndConditions,DisplayReservations,HotelApplication,Extranet Login";
            //if ($stateParams.terms) {
            //    vm.termsonly = true;
            //}
            //else {
            //    vm.termsonly = null;
            //}
            getTermsCondition(culture);
            getTeamConditionTextMessage(culture, arrMessageCode, arrId);
        }
        activate();
        //function hideTermsPopup()
        //{
        //    $uibModalInstance.dismiss(true);
        //}
        function getTermsCondition(culture) {
            termsandconditionService.getTermsCondition(culture).then(function (response) {
                vm.listTearmsCondition = response;
            }).catch(function (error) {

            })
        }
        function getTeamConditionTextMessage(culture, messageCode, labelId) {
            termsandconditionService.getTeamConditionTextMessage(culture, messageCode, labelId).then(function (response) {
                vm.termConditionlabel = response;
            }).catch(function (error) {

            })
        }
    }
    angular
   .module("termsandcondition")
   .controller("termsandconditionController", termsandconditionController)
    .controller("termsController", termsController);
    termsandconditionController.$inject = ["$cookies", "termsandconditionService"];
    termsController.$inject = ["$cookies", "termsandconditionService","$uibModalInstance"];
    function termsController($cookies, termsandconditionService,$uibModalInstance) {
        var vm = this;
         
        function activate() {
            var culture = $cookies.get("lang");
            var arrId = "lblcontactus1,lblabout,lblfaq,lblterms,lblmanagereservation,lbladdproperty,lblextranetlogin";
            var arrMessageCode = "ContactUs,Aboutus,FAQ,TermsAndConditions,DisplayReservations,HotelApplication,Extranet Login";
            getTermsCondition(culture);
            getTeamConditionTextMessage(culture, arrMessageCode, arrId);
        }
        
        vm.hideTermsPopup = hideTermsPopup;
        function getTermsCondition(culture) {
            termsandconditionService.getTermsCondition(culture).then(function (response) {
                vm.listTearmsCondition = response;
            }).catch(function (error) {

            })
        }
        function getTeamConditionTextMessage(culture, messageCode, labelId) {
            termsandconditionService.getTeamConditionTextMessage(culture, messageCode, labelId).then(function (response) {
                vm.termConditionlabel = response;
            }).catch(function (error) {

            })
        }
        function hideTermsPopup() {
            $uibModalInstance.dismiss(true);
        }

        activate();
    };

})();