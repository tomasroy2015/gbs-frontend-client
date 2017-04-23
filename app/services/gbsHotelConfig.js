(function () {
    "use strict";
    function gbsHotelConfig($cookies) {
        var vm = this;
        vm.userId = null;
        vm.password = null;
        vm.title = null;

        function setLoginDetails(response)
        {
            vm.userId = response.data.UserId;
            vm.password = response.data.UserName;
            if (response) {
                $cookies.put("userId", response.data.UserId, { expires: GBSHelper.helpers.getCookieExpire() });
                $cookies.put("username", response.data.UserName, { expires: GBSHelper.helpers.getCookieExpire() });
            }
        }
        function setRegisterDetails(response) {
            vm.userId = response.UserId;
            vm.password = response.UserName;
            if (response) {
                $cookies.put("userId", response.UserId, { expires: GBSHelper.helpers.getCookieExpire() });
                $cookies.put("username", response.UserName, { expires: GBSHelper.helpers.getCookieExpire() });
            }
        }
        function checkLoggedIn() {
            if ($cookies.get("userId") === undefined || $cookies.get("userId") === null || $cookies.get("userId") === "" || $cookies.get("username") === undefined || $cookies.get("username") === null || $cookies.get("username") === "") {
                return false;
            } else {
                return true;
            }
        }

        function setTitle(title) {
            vm.title = title;
        }

        function getTitle() {
            return vm.title;
        }

        function getUserId() {
            return $cookies.get("userId");
        }
        


        var service = {
            setLoginDetails: setLoginDetails,
            setRegisterDetails:setRegisterDetails,
            checkLoggedIn: checkLoggedIn,
            getUserId: getUserId,
            setTitle: setTitle,
            getTitle: getTitle,
            title: getTitle
        }
        return service;

    }
    angular
    .module("app")
    .service("gbsHotelConfig", gbsHotelConfig)
    gbsHotelConfig.$inject = ["$cookies"];
})();