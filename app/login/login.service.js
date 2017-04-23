(function () {
    "use strict";
    function loginService($q,hotelService) {
        var vm = this;

        function loginToGbsHotel(username,password) {
            return hotelService.loginToGbsHotels(username, password).then(function (data) {
                return data;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }

        function forgetPassword(email,culture) {
            return hotelService.forgetPassword(email, culture).then(function (response) {
                return response;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
       
        function registerNewUser(registerUserName,registerPassword,registerEmail,Culture) {
            return hotelService.registerNewUser(registerUserName, registerPassword, registerEmail, Culture).then(function (response) {
                return response;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }

        function resetPassword(newPassword, userId) {
            return hotelService.resetPassword(newPassword, userId).then(function (response) {
                return response;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function checksocialidvalidation(fbid, googleid, emailid) {
            return hotelService.checksocialidvalidation(fbid, googleid, emailid).then(function (response) {
                return response;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        function socialLoginInsert(fbid, googleid, emailid, Name, Gender, Image, culture) {
            return hotelService.socialLoginInsert(fbid, googleid, emailid, Name, Gender, Image, culture).then(function (response) {
                return response;
            }).catch(function (error) {
                return $q.reject(error);
            });
        }
        var service = {
            loginToGbsHotel: loginToGbsHotel,
            registerNewUser: registerNewUser,
            forgetPassword: forgetPassword,
            resetPassword: resetPassword,
            checksocialidvalidation: checksocialidvalidation,
            socialLoginInsert: socialLoginInsert
        }
        return service;

    }
    angular
    .module("login")
    .service("loginService", loginService);
    loginService.$inject = ["$q","hotelService"];
})();