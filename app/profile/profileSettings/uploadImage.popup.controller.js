(function () {
    "use strict";
    function imageUploadController($cookies, $uibModalInstance, Upload, API_URL,$rootScope) {
        var vm = this;
        vm.closePopup = closePopup;
        vm.fileUpload = fileUpload;
        activate();
        var userId = $cookies.get("userId");
        function activate() {

        }

        function fileUpload(file) {
            file.upload = Upload.upload({
                url: API_URL.URL + 'profile/UpdateProfilePicture?userId=' + userId,
                method: "POST",
                file: file
            });

            file.upload.then(function (response) {
                if (response.data != "") {
                    $rootScope.userphoto = "./Images/Users/" + response.data;
                    toastr.success("Updated successfully.");
                    closePopup();
                }
            }, function (response) {
                toastr.error("Error occured  while update the photo.");
            });
        }

        function closePopup() {
            $uibModalInstance.close();
        }
    }
    angular
    .module("profile")
    .controller("imageUploadController", imageUploadController)
    imageUploadController.$inject = ["$cookies", "$uibModalInstance", "Upload", "API_URL", "$rootScope"];

})();