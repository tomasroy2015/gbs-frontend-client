(function () {
    'use strict';

    function routeConfigurator($stateProvider, $urlRouterProvider, cfpLoadingBarProvider, $httpProvider, $locationProvider) {
        //$locationProvider.hashPrefix('');
        $locationProvider.hashPrefix('!');

        //$httpProvider.defaults.withCredentials = true;
        //$locationProvider.html5Mode(true).hashPrefix('!');
        //if (window.history && window.history.pushState) {
        //    $locationProvider.html5Mode({
        //        enabled: true,
        //        requireBase: false
        //    }).hashPrefix('!');
        //}

         //,IdleProvider, KeepaliveProvider
        //IdleProvider.idleDuration(10 * 60); // 10 minutes idle
        //IdleProvider.warningDuration(30); // 30 second warning
        //KeepaliveProvider.interval(5 * 60); // 5 minute keep-alive ping
        //cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
        cfpLoadingBarProvider.includeSpinner = true;

        //cfpLoadingBarProvider.spinnerTemplate = '<div class="pt-spinner-overlay"><img class="imageRotate"  style="width: 50px;position:absolute; top: 50%; left: 50%;"  src="content/images/Loading_icon.png" /></div>';
        //      cfpLoadingBarProvider.spinnerTemplate = '<div id="loader">\
        //    <div id="box"></div>\
        //    <div id="hill"></div>\
                //</div>';

        //     var isHotelDetail = getUrlParameter("hotelname");
        //     var loaderTemp = '<div class="pt-spinner-overlay"><div class="cs-loader"><div class="cs-loader-title">Welcome to ';
        //     if (isHotelDetail === undefined || isHotelDetail == "") {
        //         loaderTemp += "GBS HOTELS";
        //     }
        //     else {
        //         loaderTemp += unescape(isHotelDetail).trunc(20);//Used to truncate prototype method of JS6
        //     }
        //     loaderTemp += '</div><div class="cs-loader-inner">\
        //    <label>	<i class="fa fa-star" aria-hidden="true"></i></label>\
        //    <label>	<i class="fa fa-star" aria-hidden="true"></i></label>\
        //    <label>	<i class="fa fa-star" aria-hidden="true"></i></label>\
        //    <label>	<i class="fa fa-star" aria-hidden="true"></i></label>\
        //    <label>	<i class="fa fa-star" aria-hidden="true"></i></label>\
        //    <label>	<i class="fa fa-star" aria-hidden="true"></i></label>\
        //  </div>\
        //  </div>\
        //</div>';
        //cfpLoadingBarProvider.spinnerTemplate = loaderTemp;
         
        $urlRouterProvider
            .when('', '/home')
            .when('/', '/home')
            //.when('/home', {
            //    templateUrl: 'home/home.html',
            //    controller: "homeController",
            //    controllerAs: "vm"
            //})
            .otherwise('/');
        $stateProvider 
            .state('master', {
                abstract: true,
                templateUrl: 'app/layout/gbs.allstate.html',
                resolve: {
                    languageResolve: function (hotelService) {
                        return hotelService.getCulture().then(function (response) {
                            return response;
                        }).catch(function (err) {

                        });
                    },
                    cultureResolve: function (languageResolve, hotelService, $cookies, $http) {

                        //var isClearAll = true;
                        //if (isClearAll) {
                        //    var cookies = $cookies.getAll();
                        //    angular.forEach(cookies, function (v, k) {
                        //        $cookies.remove(k);
                        //    });
                        //}
                       // console.log("appconfig resolve");
                         
                        var lang = $cookies.get("lang");
                        if (lang == null || lang == undefined) {
                            var json = 'http://ipinfo.io/json';
                            if (window.location.href.indexOf("https") != -1) {
                                json = 'https://ipinfo.io/json';
                            }
                          //  var promie = $http.get(json);
                            $.ajax({
                                url: json,
                                async: false,
                                dataType: 'json',
                                success: function (data) {
                                    // do stuff with response.
                                    lang = "en";
                                    
                                    if (data.country == 'FR')
                                        lang = "fr";
                                    if (data.country == 'RU')
                                        lang = "ru";
                                    if (data.country == 'DE')
                                        lang = "de";
                                    if (data.country == 'GB')
                                        lang = "en";
                                    if (data.country == 'TR')
                                        lang = "tr";
                                    if (data.country == 'SA')
                                        lang = "ar";
                                    $cookies.put("lang", lang, { expires: GBSHelper.helpers.getCookieExpire() });
                                    return hotelService.getCurrencyLoad(lang).then(function (response) { return response; }).catch(function (err) { console.log(err) });
                                }
                            });
                        }
                        else {
                            return hotelService.getCurrencyLoad(lang).then(function (response) { return response; }).catch(function (err) { console.log(err) });
                        }
                    }

                }
            })
            .state('master.gbs', {
                abstract: true,
                views: {
                    "HeaderView": {
                        templateUrl: "app/layout/topnav.html?v=3.10",
                        controller: "topNavigationController",
                        controllerAs: "vm",

                    },
                    "ContentView": {
                        templateUrl: "app/layout/content.tmpl.html?v=3.10"
                    },
                    "FooterView": {
                        templateUrl: "app/layout/footer.html?v=3.10",
                        controller: "footerController",
                        controllerAs: "vm"
                    }
                }
            });
     
    }

    
    //Facebook provider
    //function facebookProvider($facebookProvider)
    //{
    //    $facebookProvider.setAppId(facebookID).setPermissions(['email', 'user_friends']);
    //}

    //function idleConfigurator($routeProvider, IdleProvider, KeepaliveProvider) {
    //    console.log("ideal provider");
    //    IdleProvider.idleDuration(10 * 60); // 10 minutes idle
    //    IdleProvider.warningDuration(30); // 30 second warning
    //    KeepaliveProvider.interval(5 * 60); // 5 minute keep-alive ping
    //}

    function allowCookie($httpProvider) {
      // $httpProvider.defaults.withCredentials = true;
    }

    //function authProvider($authProvider) {
    //        $authProvider.facebook({
    //            //live: clientId: '1103816132975397'
    //            clientId: '253111121388184',
    //        });

    //        // Optional: For client-side use (Implicit Grant), set responseType to 'token' (default: 'code')
    //        $authProvider.facebook({
    //            //clientId: '1103816132975397',
    //            clientId: '253111121388184',
    //            responseType: 'token',
    //            redirectUri: window.location.origin + '/',
    //            requiredUrlParams: ['display', 'scope'],
    //            scope: ['email'],
    //            scopeDelimiter: ',',
    //            display: 'popup',
    //            oauthType: '2.0'
    //        });

    //        $authProvider.google({
    //            //clientId: '368302432175-00mdonk78c454dvohgup6h0fl95glvbi.apps.googleusercontent.com'
    //            clientId: '1003522574619-rime6t81jg0p9o2lnren6j4toarh9b43.apps.googleusercontent.com'
    //            // client secreat: WvOAyUhJmpD-MQvTRD579Phn
    //            //, optionalUrlParams: ['access_type']
    //            , scope: "https://www.googleapis.com/auth/plus.profile.emails.read"
    //           //, accessType: 'plus,profile,emails,read,offline'
    //            //,redirectUri: window.location.origin + '/' 
    //            // ,url: '/auth/google',
    //            , url: '/auth/google'
    //            ,authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
    //            redirectUri: window.location.origin + '/'
    //        });
    //}
   
    String.prototype.trunc = String.prototype.trunc ||
      function (n) {
          return (this.length > n) ? this.substr(0, n - 1) + '...' : this;
      };
        var facebookID =
        (
            window.location.href.indexOf('localhost') != -1 ?
            '253111121388184' //this is for locahost testing
            : '1103816132975397' //  live: clientId
        );
    
    //to save last position of scroll on view state changes : BY: Abhishek on 30-09-2016
    // Not working now, may be some issue 
    function fnkeepScrollPos($route, $window, $timeout, $location, $anchorScroll) {
            // cache scroll position of each route's templateUrl
            var scrollPosCache = {};
            // compile function
            return function(scope, element, attrs) {

                scope.$on('$routeChangeStart', function() {
                    // store scroll position for the current view
                    if ($route.current) {
                        scrollPosCache[$route.current.loadedTemplateUrl] = [ $window.pageXOffset, $window.pageYOffset ];
                    }
                });

                scope.$on('$routeChangeSuccess', function () {
                   
                    // if hash is specified explicitly, it trumps previously stored scroll position
                    if ($location.hash()) {
                        $anchorScroll();

                        // else get previous scroll position; if none, scroll to the top of the page
                    } else {
                        var prevScrollPos = scrollPosCache[$route.current.loadedTemplateUrl] || [ 0, 0 ];
                        $timeout(function() {
                            $window.scrollTo(prevScrollPos[0], prevScrollPos[1]);
                        }, 0);
                    }
                });
            }
       

    }

   
    angular
        .module('app')
        .config(routeConfigurator)
        .config(allowCookie)
        //.config(['$cookiesProvider', function($cookiesProvider) {
        //    // Set $cookies defaults
        //    var now = new Date();
        //    now.setDate(now.getDate() + 30);
        //    $cookiesProvider.defaults.path = '/';
        //    $cookiesProvider.defaults.secure = true;
        //    $cookiesProvider.defaults.expires = now;
        //    //$cookiesProvider.defaults.domain = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        //}])
        //.config(function (notyProvider) {
        //    notyProvider.settings = {
        //        theme: 'relax',
        //        text: 'alert message',
        //        layout: 'bottomLeft',
        //        dismissQueue: true,
        //        force: true,
        //        easing: 'swing',
        //        timeout: 5000,
        //        closeWith: [],
        //        maxVisible: 4,
        //        animation: {
        //            open: 'animated  fadeInUp',
        //            close: 'animated fadeOutDown',
        //            easing: 'swing',
        //            speed: 500
        //        }
        //    }
        //})
        // below social provider commented, it was not working well
        //.config(authProvider)
        //.config(facebookProvider)
        .config(['$facebookProvider', function ($facebookProvider) {
            $facebookProvider.setAppId(facebookID).setPermissions(['email', 'user_friends']);
        }])
        .run(['$rootScope', '$window', '$location', function ($rootScope, $window, $location) {
            //console.log("run app config");
            (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
            $rootScope.$on('fb.load', function () {
                $window.dispatchEvent(new Event('fb.load'));
            });

            // initialise google analytics
            $window.ga('create', 'UA-46104079-1', 'auto');
            //ga('create', 'UA-46104079-1', 'auto');
            //ga('send', 'pageview');
            // track pageview on state change
            $rootScope.$on('$stateChangeSuccess', function (event) {
                $window.ga('send', 'pageview', $location.path());
            });

        }])
        .constant("API_URL", {
            URL: (window.location.href.indexOf('localhost') != -1 ? 
                    // "http://localhost:49365/api/"
                    // "https://localhost:44304/api/" 
                      "http://localhost:8096/api/"
                    //    "https://localhost:4430/api/"
                 :
                  //   "http://api.gdsbooking.com/api/"
                    "https://api.gbshotels.com/api/"
                 )
        })
        .constant("GOOGLE_API_KEY",{
            KEY:(window.location.href.indexOf('localhost') != -1 ? 
                      "AIzaSyCxWF0eLCoV4XdLU-CLZl88LO4frFVitqI"
                    : "AIzaSyBWUA5rOR3O3p9Y2b0_py7oeOmI76NLCeA"
                 ),
            URL: "https://www.googleapis.com/plus/v1/people",
            USERCONTENT: (window.location.href.indexOf('localhost') != -1 ? 
                    "1003522574619-rime6t81jg0p9o2lnren6j4toarh9b43.apps.googleusercontent.com"
                    :"1005463768683-j5utop9jun4o6d84m3jqeage1gogkijv.apps.googleusercontent.com"
                    // OLD MVC :  "368302432175-00mdonk78c454dvohgup6h0fl95glvbi.apps.googleusercontent.com"
                 )
        }).
    constant("API_Extranet", { URL: "https://167.114.102.159:8081" })
    //new directive reference : http://jsfiddle.net/abhishekbhalani/hqLjq3fb/
    .directive('autoScroll', function ($document, $timeout, $location) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.okSaveScroll = true;
                scope.scrollPos = {};
                $document.bind('scroll', function () {
                    if (scope.okSaveScroll) {
                        scope.scrollPos[$location.path()] = $(window).scrollTop();
                    }
                });

                scope.scrollClear = function (path) {
                    scope.scrollPos[path] = 0;
                };

                scope.$on('$locationChangeSuccess', function (route) {
                    $timeout(function () {
                        $(window).scrollTop(scope.scrollPos[$location.path()] ? scope.scrollPos[$location.path()] : 0);
                        scope.okSaveScroll = true;
                    }, 0);
                });

                scope.$on('$locationChangeStart', function (event) {
                    scope.okSaveScroll = false;
                });
            }
        };
    })
   // .directive('compileHtml', compileHtml)

    // Common directive for Focus
    .directive('focus',
        function ($timeout) {
            return {
                scope: {
                    trigger: '@focus'
                },
                link: function (scope, element) {
                    scope.$watch('trigger', function (value) {
                        if (value === "true") {
                            $timeout(function () {
                                element[0].focus();
                            });
                        }
                    });
                }
            };
        }
    );
    
    //will use at hoteldetails
   /* function compileHtml($compile)
    {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch(function () {
                    console.log('watch dynamic images ');
                    return scope.$eval(attrs.compileHtml);
                }, function (value) {
                    element.html(value); 
                    $compile(element.contents())(scope);
                });
            }
        };
    }*/
   
    //routeConfigurator.$inject = ["$stateProvider", "$urlRouterProvider", "cfpLoadingBarProvider", "IdleProvider", "KeepaliveProvider"];
    routeConfigurator.$inject = ["$stateProvider", "$urlRouterProvider", "cfpLoadingBarProvider","$httpProvider","$locationProvider"];
    
    //Below not worked so comment temporary
    //authProvider.$inject = ["$authProvider"];

    // new FB provider
  //  facebookProvider.$inject = ["$facebookProvider"];

    //  idleConfigurator.$inject = ["$routeProvider", "IdleProvider", "KeepaliveProvider"]
    /***Start : To save last position of scroll on view state changes : BY: Abhishek on 30-09-2016
    // Not working now, may be some issue 
    //keepScrollDirective.$inject=['$route', '$window', '$timeout', '$location', '$anchorScroll'];
    End**/
})();