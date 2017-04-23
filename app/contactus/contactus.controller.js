(function () {
    "use strict";
    function contactusController($cookies, contactusService, NgMap, hotelService) {
        var vm = this;
        vm.pageClass = 'page-contact';

        vm.sendMessage = sendMessage;
        vm.contactus = {};
        function activate() {
            var culture = $cookies.get("lang");
            getCountry(culture);
            getSubject(culture);
            getIpAddress();
            var arrId = "lblcontactus,lbladdress,lblphone,lblemail,lblfname,lblsname,lblstreet,lblcode1,lblcode2,lblusernames,lblcontact,lblemailid,btnsendemail,lblsubject,lblmessage,lblsurname,lblcountry,lblsatulation";
            var arrMessageCode = "Contact,Address,Phone,Email,Stephen J,Jessen,2 Queen anne street,London,W1G 9LQ,Name,Phone,Email,sendemail,subject,message,Surname,Country,Salutation";
            getContactUsTextMessage(culture, arrMessageCode, arrId);
        }

        function getIpAddress() {
            hotelService.getIpAddress().then(function (response) {
                vm.contactus.IPAddress = response;
            }).catch(function (error) {
            });
        }

        function getCountry(culture) {
            hotelService.getCountryForDropdown(culture).then(function (response) {
                vm.countryList = response;
            }).catch(function (error) {
            });
        }
        function getContactUsTextMessage(culture, messageCode, labelId) {
            contactusService.getContactUsTextMessage(culture, messageCode, labelId).then(function (response) {
                vm.contactuslabel = response;
            }).catch(function (error) {
            });
        }
        function sendMessage(form) {
            if (!form.$valid) {
                toastr.error("Please fill all required Fields")
            }
            else {
                var userId = $cookies.get("userId");
                if (userId !== undefined && userId !== null) {
                    vm.contactus.UserId = userId;
                }
                else {
                    vm.contactus.UserId = 0;
                }
                hotelService.saveContactUsData(vm.contactus).then(function (response) {
                    if (form) {
                        form.$setPristine();
                        form.$setUntouched();
                    }
                    vm.contactus = {};
                    toastr.success("Mail Send Success");
                }).catch(function (error) {
                    console.log(error);
                    toastr.error(error.Message);
                });


            }
        }

        function getSubject(culture) {
            hotelService.getEmailSubject(culture).then(function (response) {
                vm.subjectList = response;
            });
        }

        activate();
    }
    angular
   .module("contactus")
   .controller("contactusController", contactusController);
    contactusController.$inject = ["$cookies", "contactusService", "NgMap", "hotelService"];
})();