(function () {
    "use strict";
    function profileSettingController($rootScope, $cookies, profileSettingService) {
        var vm = this;
        vm.updatePassword = updatePassword;
        vm.updateProfile = updateProfile;
        vm.getCity = getCity;
        vm.getCityNames = getCityNames;
        vm.labels = {
            Update: "Update",
            Cancel: "Cancel"
        }
       
        vm.profileDetail = {
            "CountryId": "",
            "CityId": ""
        };
        activate();
        function activate() {
           
            getCountry();
            var culture = $cookies.get("lang");
            getProfileDetails(culture, $cookies.get("userId"));
            var arrId = "lbloverview,lblaccountsettings,lblpersonalinfo,lblfirstname,lbllastname,lblemail,lblphonenumber,lbllocatoin,lblstreet,lblcity,lblzip,lblcountry,btnsavechange,lblchangepassword,lblnewpassord,lblnewpassordagain,btnchagepassord,btncancelupdate,lblCurrentPassword";
            var arrMessageCode = "Overview1,AccountSettings,Personal information,FirstName,LastName,Email,Phone,Location,StreetAddress,City,ZIPcodePostalcode,Country,Save Change,Change password,NewPassword,Repeat password,Change password,Cancel,CurrentPassword";
            getProfileSettingTextMessage(culture, arrMessageCode, arrId);
        }

        function getCityNames(name) {
            $("#cityInput").empty();
            _.each(vm.cityList, function (city) {
                if (city.CityName.toLowerCase().indexOf(name) !== -1) {
                    $("#cityInput").append("<option value=" + city.Id + ">" + city.CityName + "</option>")
                }
            });
        }

        function getCity(countryId) {
            if (countryId != "0") {
                vm.cityList = [];
                vm.city = '';
                if (countryId !== undefined) {
                    profileSettingService.getCity(countryId, $cookies.get("lang")).then(function (response) {
                        if (angular.isArray(response)) {
                            vm.cityList = response;
                        } else {
                            toastr.warning(response);
                        }
                    });
                }
            }
        }

        function getProfileDetails(culture, userId) {
            profileSettingService.getProfileDetails(culture, userId).then(function (response) {
                vm.profileDetail = response;
                vm.profileDetail.CountryId = vm.profileDetail.CountryId.toString();
                getCity(vm.profileDetail.CountryId);
            }).catch(function (error) {

            })
        }

        function updateProfile(form) {
            if (form.$invalid) {
                toastr.error("Please fill all required fields");
            }
            else {
                vm.profileDetail.UserName = $cookies.get("username");
                vm.profileDetail.UserId = $cookies.get("userId");
                if (vm.profileDetail.CountryId != null && vm.profileDetail.CountryId != "" && vm.profileDetail.CountryId != "0") {
                    vm.profileDetail.Country = _.find(vm.countryList, function (country) {
                        return country.Id == vm.profileDetail.CountryId;
                    }).CountryName;
                }
                else {
                    vm.profileDetail.CountryId = null;
                }
                if (vm.profileDetail.CityId !=null && vm.profileDetail.CityId != "" && vm.profileDetail.CityId != "0") {
                    vm.profileDetail.City = _.find(vm.cityList, function (city) {
                        return city.Id == vm.profileDetail.CityId;
                    }).CityName;
                }
                else {
                    vm.profileDetail.CityId = null;
                }
                profileSettingService.updateProfile(vm.profileDetail).then(function (response) {
                    if (response == true)
                        toastr.success("Details Updated Success");
                    if(response==false)
                        toastr.success("Error occured while updating profile details");
                }).catch(function (error) {
                    toastr.error(error);
                });
            }
        }

        function updatePassword(form) {
            if (form.$invalid) {
                toastr.error("Please fill All Required fileds");
            }
            else {
                if (vm.newPasswordConfirm != vm.newPassword) {
                    toastr.error("New Password and Confirm Password not matching");
                }
                else {
                    profileSettingService.changePassword($cookies.get("userId"), vm.oldPassword, vm.newPassword).then(function (response) {
                        vm.oldPassword = null;
                        vm.newPassword = null;
                        vm.newPasswordConfirm = null;
                        if (response == true)
                            toastr.success("Password Update Success");
                        else
                            toastr.error("Error occured while update the password.");
                        if (form) {
                            form.$setPristine();
                            form.$setUntouched();
                        }
                    }).catch(function (error) {
                        toastr.error(error);
                    })
                }
            }
        }

        function getCountry() {
            profileSettingService.getCountryForDropdown($cookies.get("lang")).then(function (response) {
                vm.countryList = response;

            });
        }

        function getProfileSettingTextMessage(culture, messageCode, labelId) {
            profileSettingService.getProfileSettingTextMessage(culture, messageCode, labelId).then(function (response) {
                vm.profileSettinglabel = response;
            }).catch(function (error) {
            });
        }
        
    }
    angular
    .module("profileSetting")
    .controller("profileSettingController", profileSettingController)
    profileSettingController.$inject = ["$rootScope", "$cookies", "profileSettingService"];

})();