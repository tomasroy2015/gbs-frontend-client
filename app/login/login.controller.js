(function () {
    "use strict";
    //function loginController($uibModal, $rootScope, loginService, $uibModalInstance, $cookies, gbsHotelConfig, $state, $auth, $resource, $scope, $facebook) {
    function loginController($uibModal, $rootScope, loginService, $uibModalInstance, $cookies, gbsHotelConfig, $state, $resource, $scope, $facebook, GOOGLE_API_KEY, $http) {
        var vm = this;
        vm.login = login;
        vm.register = register;
        vm.closePopup = closePopup;
        vm.username = "";
        vm.password = "";
        vm.registerUserName == null;
        vm.registerPassword == null;
        vm.registerEmail == null;
        vm.openForgetPassword = openForgetPassword;
        vm.lAction = lAction;
        vm.googleID = GOOGLE_API_KEY.USERCONTENT;
        // local: "1003522574619-rime6t81jg0p9o2lnren6j4toarh9b43.apps.googleusercontent.com";
        //Live:  '368302432175-00mdonk78c454dvohgup6h0fl95glvbi.apps.googleusercontent.com'


        function activate() {
        }

        function openForgetPassword() {
            vm.animationsEnabled = true;
            var modalInstance = $uibModal.open({
                animation: vm.animationsEnabled,
                size: "sm",
                templateUrl: "app/login/forgetPassword.tmpl.html?v=3.10",
                controller: 'forgetPasswordController',
                controllerAs: "vm"
            });
        }

       
        //google plus with directive
        $scope.$on('event:google-plus-signin-success', function (event, authResult) {
            $http({
                url: GOOGLE_API_KEY.URL + "/"+authResult.getId()+"?key=" + GOOGLE_API_KEY.KEY,
                dataType: 'json',
                method: 'GET',
            }).then(function (response) {
                var resp = response.data;
                var gender = "";
                if (resp.gender == "male") {
                    gender = 1;
                }
                else {
                    gender = 2;
                }


                var fbid = null;
                var googleid = resp.id;
                var gmailId = authResult.getBasicProfile().U3;
                var gphoto = authResult.getBasicProfile().Paa; 
                var jsonInsert = {
                    fbid: fbid, googleid: resp.id, emailid: gmailId, Name: resp.displayName,
                    Gender: gender, Image: resp.image.url
                };
                var json = {
                    fbid: fbid, googleid: resp.id, emailid: gmailId
                };

                loginService.checksocialidvalidation(resp.id, googleid, gmailId).then(function (response) {
                    if (response != null) {
                        gbsHotelConfig.setRegisterDetails(response);
                        $uibModalInstance.close(true);
                        $rootScope.$broadcast('userLoggedIn', 'message');
                        $state.go("master.gbs.profile.userProfile.View");
                    }
                    else {
                        if (typeof gmailId != 'undefined') {
                            loginService.socialLoginInsert(resp.id, googleid, gmailId, resp.displayName, gender, gphoto, $cookies.get("lang")).then(function (response) {
                                if (response == null)
                                    toastr.error("Something goes wrong, Please try again.");
                                else {
                                    gbsHotelConfig.setRegisterDetails(response);
                                    $uibModalInstance.close(true);
                                    $rootScope.$broadcast('userLoggedIn', 'message');
                                    $state.go("master.gbs.profile.userProfile.View");
                                    toastr.info("Successfully registered.");
                                }
                            }).catch(function (error) {
                                toastr.error("Something goes wrong, Please try again.");
                            })

                        }
                    }
                }).catch(function (error) {
                    toastr.error("Something goes wrong, Please try again.");
                })

            }).catch(function (error) {
                toastr.error("Something goes wrong, Please try again.");
            });
            // Send login to server or save into cookie
        });

        $scope.$on('event:google-plus-signin-failure', function (event, authResult) {
            // Auth failure or signout detected
        });
        //end
        // FB login settings
        $scope.$on('fb.auth.authResponseChange', function () {

            $scope.status = $facebook.isConnected();
            if ($scope.status) {
                var uid = "http://graph.facebook.com/" + $facebook.getAuthResponse().userID + "/picture";
                $facebook.api('/me?fields=id,name,gender,email,birthday').then(function (me) {
                    var gender = "";
                    if (me.gender == "male") {
                        gender = 1;
                    }
                    else {
                        gender = 2;
                    }

                    var googleid = null;
                    //alert("hi")
                    var jsonInsert = {
                        fbid: me.id, googleid: googleid, emailid: me.email, Name: me.name,
                        Gender: gender, Image: uid
                    };

                    // alert("hi2")
                    var EmailFB = me.email;

                    loginService.checksocialidvalidation(me.id, googleid, me.email).then(function (response) {
                        if (response != null) {
                            gbsHotelConfig.setRegisterDetails(response);
                            $uibModalInstance.close(true);
                            $rootScope.$broadcast('userLoggedIn', 'message');
                            $state.go("master.gbs.profile.userProfile.View");
                        }
                        else {
                            if (typeof EmailFB != 'undefined') {
                                loginService.socialLoginInsert(me.id, googleid, me.email, me.name, gender, uid, $cookies.get("lang")).then(function (response) {
                                    if (response == null)
                                        toastr.error("Something goes wrong, Please try again.");
                                    else {
                                        gbsHotelConfig.setRegisterDetails(response);
                                        $uibModalInstance.close(true);
                                        $rootScope.$broadcast('userLoggedIn', 'message');
                                        $state.go("master.gbs.profile.userProfile.View");
                                        toastr.info("Successfully registered.");
                                    }
                                }).catch(function (error) {
                                    toastr.error("Something goes wrong, Please try again.");
                                })

                            }
                        }
                    }).catch(function (error) {
                        toastr.error("Something goes wrong, Please try again.");
                    })
                });
            }
        });

        //bind click on Facebook login event
        $scope.loginToggle = function () {
            if ($scope.status) {
                $facebook.logout();
            } else {
                $facebook.login();
            }
        };

        //end

        function register() {
            if (vm.registerUserName == null || vm.registerUserName == undefined || vm.registerPassword == null || vm.registerPassword == undefined || vm.registerEmail == null || vm.registerEmail == undefined) {
                toastr.error("All Fields Required");
            }
            else {
                loginService.registerNewUser(vm.registerUserName, vm.registerPassword, vm.registerEmail, $cookies.get("lang")).then(function (response) {
                    gbsHotelConfig.setRegisterDetails(response);
                    $uibModalInstance.close(true);
                    $rootScope.$broadcast('userLoggedIn', 'message');
                    $state.go("master.gbs.profile.userProfile.View");

                }).catch(function (error) {
                    toastr.error(error);
                })
            }

        }
        function lAction()
        {
            login();
        }
        function login() {
            if (vm.username == null || vm.password == null || vm.password == undefined || vm.username == undefined || vm.username == "" || vm.password == "") {
                toastr.error("Username and Password Required");
            }
            else {
                loginService.loginToGbsHotel(vm.username, vm.password).then(function (response) {
                    gbsHotelConfig.setLoginDetails(response);
                    $uibModalInstance.close(true);
                    $rootScope.$broadcast('userLoggedIn', 'message');
                    $state.go("master.gbs.profile.userProfile.View");

                }).catch(function (error) {
                    toastr.error(error);
                })
            }
        }

        function closePopup() {
            $uibModalInstance.dismiss(true);
        }
        activate();
    }
    angular
    .module("login")
    .controller("loginController", loginController);
    loginController.$inject = ["$uibModal", "$rootScope", "loginService", "$uibModalInstance", "$cookies", "gbsHotelConfig", "$state", "$resource", "$scope", "$facebook", "GOOGLE_API_KEY", "$http"];
    //loginController.$inject = ["$uibModal", "$rootScope", "loginService", "$uibModalInstance", "$cookies", "gbsHotelConfig", "$state", "$auth", "$resource", "$scope", "$facebook"];
})();