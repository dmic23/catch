(function () {
    'use strict';

    angular
        .module('nonce', [
            'ionic',
            'nonce.config',
            'nonce.routes',
            'main',
            'moments',
            'users'
        ]);

    angular
        .module('nonce.config', ['ui.router']);

    angular
        .module('nonce.routes', ['ui.router.router']);

    angular
        .module('nonce')
        .run(run);

    run.$inject = ['$http'];

    function run($http) {
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';
    }

    angular
        .module('nonce')
        .constant('ApiEndpoint', {
            url: 'http://localhost:8100/api/'
        })

    angular
        .module('nonce')
        .run(function($ionicPlatform) {
            $ionicPlatform.ready(function() {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);

                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }
            });
        });

    angular
        .module('nonce')
        .run(runFB);

    runFB.$inject = ['$rootScope', '$window', 'Main'];

    function runFB($rootScope, $window, Main) {

        $rootScope.fbUser = {};

        $window.fbAsyncInit = function() {

            FB.init({ 

                /* 
                The app id of the web app;
                To register a new app visit Facebook App Dashboard
                ( https://developers.facebook.com/apps/ ) 
                */

                appId: '422824637925643', 

                /* 
                Adding a Channel File improves the performance 
                of the javascript SDK, by addressing issues 
                with cross-domain communication in certain browsers. 
                */

                channelUrl: 'app/channel.html', 

                // Set if you want to check the authentication status
                // at the start up of the app 

                status: true, 

                // Enable cookies to allow the server to access 
                // the session 

                cookie: true, 

                xfbml: true, 

                version: 'v2.5'
            });

            Main.checkFBStatus();

        };

        // Are you familiar to IIFE ( http://bit.ly/iifewdb ) ?

        (function(d){
            // load the Facebook javascript SDK

            var js, 
            id = 'facebook-jssdk', 
            ref = d.getElementsByTagName('script')[0];

            if (d.getElementById(id)) {
                return;
            }

            js = d.createElement('script'); 
            js.id = id; 
            js.async = true;
            js.src = "//connect.facebook.net/en_US/all.js";

            ref.parentNode.insertBefore(js, ref);

        }(document));


    }
})();