(function () {
    "use strict";
    function confirmPopupController($state, $uibModalInstance, hotelService, $cookies) {
        var vm = this;
        vm.closePopup = closePopup;
        vm.yes = yes;
        vm.Message = $uibModalInstance.Message;
        activate();
        function activate() {
        }
      
        function yes() {
            $uibModalInstance.close("Yes");
        }

        function closePopup() {
            $uibModalInstance.dismiss();
        }
    }
    angular
    .module("app")
    .controller("confirmPopupController", confirmPopupController);
    confirmPopupController.$inject = ["$state", "$uibModalInstance", "hotelService", "$cookies"];

})();