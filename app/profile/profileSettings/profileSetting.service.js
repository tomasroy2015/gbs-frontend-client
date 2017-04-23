(function () {
    "use strict";
    function profileSettingService($q, $cookies, hotelService) {
        var vm = this;

        function getCity(countryId, culture) {
           return hotelService.getCityForDropdownByCountryId(countryId, $cookies.get("lang")).then(function (response) {
               return response;
           }).catch(function (error) {
               return $q.reject(error);
           });
        }

        function getProfileDetails(culture, userId) {
            return hotelService.getProfileDetails(culture,userId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }

        function getCountryForDropdown(culture) {
            return hotelService.getCountryForDropdown(culture).then(function (response) {
                return response;
            }).catch(function (error) {
                return $q.reject(error);

            })
        }

        function updateProfile(profileData) {
            return hotelService.updateProfile(profileData).then(function (response) {
                return response;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }

        function changePassword(userId, oldPassword, newPassword) {
            return hotelService.changePassword(userId, oldPassword, newPassword).then(function (response) {
                return response;
            }).catch(function (error) {
                return $q.reject(error);
            });

        }
        function getProfileSettingTextMessage(culture, messageCode, labelId) {
            return hotelService.getTextMessage(culture, messageCode, labelId).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        var service = {
            getProfileDetails: getProfileDetails,
            getCountryForDropdown: getCountryForDropdown,
            changePassword: changePassword,
            updateProfile: updateProfile,
            getCity: getCity,
            getProfileSettingTextMessage: getProfileSettingTextMessage
        }

        return service;
    }

    angular
    .module("profileSetting")
    .service("profileSettingService", profileSettingService);
    profileSettingService.$inject = ["$q", "$cookies", "hotelService"];
})();