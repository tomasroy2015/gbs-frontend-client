(function () {
    "use strict";
    function profileCreditCardController($rootScope, $cookies, profileService, $uibModal, manageCardService) {
        var vm = this,
        culture = $cookies.get("lang"),
        userId = $cookies.get("userId");
        vm.showAddCardPopup = showAddCardPopup;
        vm.confirmRemove = confirmRemove;
        vm.editCard = editCard;
        activate();
        function activate() {
            getUserCreditCard();
        }

        function getCountry() {
          
        }
        function getUserCreditCard() {
            manageCardService.getUserCreditCard(culture, userId).then(function (response) {
                vm.userCreditCard = response;
            }).catch(function (error) {

            })
        }

        function confirmRemove(Id, name) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: "app/common/confirmDialogue/confirm.popup.tmpl.html?v=3.10",
                controller: 'confirmPopupController',
                controllerAs: "vm"
            });
            modalInstance.Message = "Card with Name : " + name + " Will be Removed";

            modalInstance.result.then(function (data) {
                manageCardService.removeCard(Id).then(function (response) {
                    if (response == true) {
                        toastr.success("Card Removed Success");
                        getUserCreditCard();
                    }
                }).catch(function (error) {
                    debugger;
                })
            })

        }

        function editCard(id) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: "app/profile/manageCard/addCreditcardPopup.tmpl.html?v=3.10",
                controller: 'addCreditcardController',
                controllerAs: "vm",
                backdrop: 'static',
                keyboard: false
            });
            modalInstance.type = 'Edit';
            modalInstance.cardDetails = _.find(vm.userCreditCard, function (card) {
                return card.ID == id;
            });

            modalInstance.result.then(function (data) {
                getUserCreditCard();
            }).catch(function (error) {
            });

        }


        function showAddCardPopup() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: "app/profile/manageCard/addCreditcardPopup.tmpl.html?v=3.10",
                controller: 'addCreditcardController',
                controllerAs: "vm",
                backdrop: 'static',
                keyboard: false
            });

            modalInstance.result.then(function (data) {
                getUserCreditCard();
            }).catch(function (error) {
            });
        }
    }

    angular
    .module("manageCard")
    .controller("profileCreditCardController", profileCreditCardController)
    profileCreditCardController.$inject = ["$rootScope", "$cookies", "profileService", "$uibModal", "manageCardService"];
})();