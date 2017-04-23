(function () {
    angular
        .module("home", [])
     .run(function ($rootScope) {
         //console.log("run home module");
         if (getUrlParameter("hotelname"))
             $rootScope.hotelname = unescape(getUrlParameter("hotelname")).trunc(20);
         else
             $rootScope.hotelname = "GBS Hotels";
     }); 
})();