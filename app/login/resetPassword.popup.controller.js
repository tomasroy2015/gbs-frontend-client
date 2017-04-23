(function () {
    "use strict";
    function resetPasswordController($uibModal, $uibModalInstance, loginService) {
        var vm = this,
            userId = $uibModalInstance.userId;
        vm.closePopup = closePopup;
        vm.resetPassword = resetPassword;
        vm.openLogin = openLogin;

        vm.newPassword = null;
        vm.confirmPassword = null;

        function activate() {
        }
        function resetPassword() {
            if (vm.newPassword !== vm.confirmPassword) {
                toastr.error("New Password and Confirm Password Not Matching");
                return;
            }
            return loginService.resetPassword(vm.newPassword, userId).then(function (response) {
                if (response == true) {
                    toastr.success("Password Reset Success");
                    openLogin();
                }
                if (response == false)
                    toastr.success("Error occured while reset password.");
               
            }).catch(function (error) {
                return $q.reject(error);
            });
        }

        function openLogin() {
            $uibModalInstance.dismiss(true);
            var modalInstance = $uibModal.open({
                animation: vm.animationsEnabled,
                size: "sm",
                templateUrl: "app/login/login.tmpl.html?v=3.10",
                controller: 'loginController',
                controllerAs: "vm"
            });
        }

        activate();

        function closePopup() {
            $uibModalInstance.dismiss(true);
        }




    }
    angular
    .module("home")
    .controller("resetPasswordController", resetPasswordController);
    resetPasswordController.$inject = ["$uibModal", "$uibModalInstance", "loginService"]
})();