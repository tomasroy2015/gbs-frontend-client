(function () {
    "use strict";
    function destinationController($cookies, destinationService) {
        var vm = this;
        vm.getCountryWithContinents = getCountryWithContinents;
        vm.selectedId = 0;
        activate();
        function activate() {
            var culture = $cookies.get("lang");
            getContinentsCountry(culture);
            getContinents(culture);
        }
        function getContinentsCountry(culture) {
            destinationService.getContinentsCountry(culture).then(function (response) {
                vm.continentsCountry = response;
            }).catch(function (error) {

            })
        }

        function getContinents(culture) {
            destinationService.getContinents(culture).then(function (response) {
                vm.continents = response;


                //load initial selection
                if (vm.continents.length > 0 && vm.continents[0]) {
                    getCountryWithContinents(vm.continents[0].Id);
                 
                }

            }).catch(function (error) {

            })
        }

        function getCountryWithContinents(continetId) {
            return destinationService.getCountryWithContinents($cookies.get("lang"), continetId).then(function (response) {
                vm.countrywithcontient = response;
                //set selected ID
                vm.selectedId = continetId;
            }).catch(function (error) {
                return error;
            });
        }
    }
    angular
    .module("destination")
    .controller("destinationController", destinationController)
    destinationController.$inject = ["$cookies", "destinationService"];
})();