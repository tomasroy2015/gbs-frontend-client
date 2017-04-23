(function () {
    "use strict";
    function forgetPasswordController(loginService, $uibModalInstance, $cookies) {
        var vm = this;
        vm.closePopup = closePopup;
        vm.forgetPassword = forgetPassword;
        vm.email = "";
        function activate() {
        }

        function forgetPassword() {
            if (vm.email == null) {
                toastr.error("Email is Required");
            }
            else {
                loginService.forgetPassword(vm.email, $cookies.get("lang")).then(function (response) {
                    if (response == "Sent") {
                        toastr.success("Password sent to your registered Email");
                        $uibModalInstance.dismiss(true);
                    }
                    if (response == "NotFound") {
                        toastr.error("Email is not registered with system. please try with correct email address.");
                        
                    }
                    if (response == "Fail") {
                        toastr.error("Error occured while sending email.");
                    }
                }).catch(function (error) {
                    toastr.error(error);
                })
            }
        }

        function closePopup() {
            $uibModalInstance.dismiss(true);
        }
        activate();
    }
    angular
    .module("app")
    .controller("forgetPasswordController", forgetPasswordController);
    forgetPasswordController.$inject = ["loginService", "$uibModalInstance", "$cookies"];
})();