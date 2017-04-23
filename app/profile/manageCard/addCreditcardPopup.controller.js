(function () {
    "use strict";
    function addCreditcardController($cookies, $uibModalInstance, profileService, manageCardService, gbsHotelConfig) {
        var vm = this,
            userId = gbsHotelConfig.getUserId();
        vm.years = [];
        vm.closePopup = closePopup;
        vm.savecreditcards = savecreditcards;
        vm.updateCard = updateCard;
        vm.form;
        vm.cardNumber = null;
        activate();
        function activate() {
            vm.years = [];
            var dat = new Date();
            var currentYear = dat.getFullYear();
            for (var i = currentYear; i < currentYear + 20 ; i++) {
                vm.years.push(i);
            }
            if($uibModalInstance.type == "Edit")
            {
                vm.isEdit = true;
                vm.CardHolderName = $uibModalInstance.cardDetails.NameOnCreditCard;
                vm.ExpiryMonth  = $uibModalInstance.cardDetails.Month;
                vm.ExpiryYear = $uibModalInstance.cardDetails.Year;
                vm.CreditCardNumber = $uibModalInstance.cardDetails.CreditCardNumber
            }

            var arrId = "lblalready,lblplaceholdername,lblcardnumber,btnupdate,lblremovecard,lblCreditCardInfo,lblNewCreditCard,lblcardholdername,lblcardnumber1,lblvalidthru,lblvalidthru1,lbleditcard1,btnaddacard,lbladdcard,lblselectcards";
            var arrMessageCode = "CreditCardAlreadyExists,CCFullName,CCNo,Update,delete,CreditCardInfo,NewCreditCard,CCFullName,CCNo,validthru,validthru,CreditCardInfo,Add a card,Add a card,selectcard";
            var culture = $cookies.get("lang");
            getCreditCardTextMessage(culture, arrMessageCode, arrId);
        }
        

        function savecreditcards(creditInfo) {
            var cardObject = {
                "Id":0,
                "UserId": userId,
                "CreditCardProvider": vm.Provider,
                "NameOnCreditcard": vm.CardHolderName,
                "CreditCardNumber": vm.cardNumber,
                "Month": vm.ExpiryMonth,
                "Year": vm.ExpiryYear
            }
            switch (vm.Provider) {
                case "Visa":
                    cardObject.CreditCardProvider = 1
                    break;
                case "MasterCard":
                    cardObject.CreditCardProvider = 2
                    break;
                case "American Express":
                    cardObject.CreditCardProvider = 3
                    break;
                case "Maestro":
                    cardObject.CreditCardProvider = 6
                    break;
                case "Discover":
                    cardObject.CreditCardProvider = 7
                    break;
            }

            manageCardService.saveCreditCard(cardObject).then(function (response) {
                if (response == "Exist") {
                    toastr.error("Card Already exists.");
                }
                if (response == "Accept") {
                    $uibModalInstance.close();
                    toastr.success("Card Saved Successfully.");
                }
            }).catch(function (error) {
                toastr.error(error);
            })
        }
    
        function updateCard() {
            var cardObject = {
                "Id": $uibModalInstance.cardDetails.ID,
                "UserId": userId,
                "NameOnCreditcard": vm.CardHolderName,
                "Month": vm.ExpiryMonth,
                "Year": vm.ExpiryYear
            }
            manageCardService.updateCard(cardObject).then(function (response) {
                toastr.success("Card Saved Successfully.");
                $uibModalInstance.close();
            }).catch(function (error) {
                debugger;
            })
        }

        function getCreditCardTextMessage(culture, messageCode, labelId) {
            manageCardService.getCreditCardTextMessage(culture, messageCode, labelId).then(function (response) {
                vm.creditCardlabel = response;
            }).catch(function (error) {
            });
        }
        function closePopup() {
            $uibModalInstance.dismiss(true);
        }

    }

    angular
    .module("manageCard")
    .controller("addCreditcardController", addCreditcardController)
    addCreditcardController.$inject = ["$cookies", "$uibModalInstance", "profileService", "manageCardService", "gbsHotelConfig"];
})();