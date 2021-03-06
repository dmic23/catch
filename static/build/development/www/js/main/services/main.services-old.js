(function () {
    'use strict';

    angular
        .module('main.services')
        .factory('Main', Main);

    Main.$inject = ['$rootScope', '$http', '$q', '$state', '$location', '$window'];

    function Main($rootScope, $http, $q, $state, $location, $window) {

        var Main = {
            // login: login,
            logout: logout,
            // fbLogin: fbLogin,
            getFBUser: getFBUser,
            checkFBStatus: checkFBStatus,

        };

        return Main;

        function generalCallbackSuccess(response){
            console.log(response)
            console.log(response.data)
            return response.data;
        }

        function generalCallbackError(response){
            return $q.reject('Error '+response.status+'');
        }

        function getAll(){
            return $http.get('http://localhost:8000/api/v1/users/')
                .then(generalCallbackSuccess)
                .catch(generalCallbackError);
        }

        // function login(response) {
        //     return $http.post('/api/v1/login/', {
        //         email: response.email, 
        //         password: response.id,
        //         first_name: response.first_name,
        //         last_name:response.last_name
        //     }).then(generalCallbackSuccess).catch(generalCallbackError);
        // }

        function loginSuccess(response){
            $state.go('app.feed');
        }

        function logout() {
            return $http.post('http://localhost:8000/api/v1/logout/')
                .then(logoutSuccess)
                .catch(generalCallbackError);
        }

        function logoutSuccess(response) {
            FB.logout(function(response) {
                //$state.go('login');
                $window.location.href='/accounts/login/';
            });
        }

        // function fbLogin(){
        //     var deferred = $q.defer();
        //     FB.login(function(response) {
        //         if (response.authResponse) {
        //             console.log('Welcome!  Fetching your information.... ');
        //             FB.api('/me', {
        //                 fields: 'first_name,last_name,email,picture',
        //             }, function(response) {
        //                 console.log('Good to see you, ' + response.name + '.');
        //                 console.log(response);
        //                 login(response);
        //                 deferred.resolve(response);
        //             });

        //         } else {

        //             console.log('User cancelled login or did not fully authorize.');
        //             deferred.reject('Error occured');
        //         }
        //     }, {scope:'public_profile,email,user_friends'});
        //     return deferred.promise;
        // }

        function getFBUser(){
            var deferred = $q.defer();
            FB.api('/me', {
                        fields: 'first_name,last_name,email,picture,taggable_friends.limit(1000)',
                    }, function (response){
                console.log('Good to see you, ' + response.first_name + '.');
                console.log(response);
                $rootScope.$apply(function() { 

                    $rootScope.$emit('update_user_info', response); 
                    $rootScope.fbUser = response;
                    console.log($rootScope.fbUser);

                });
                return deferred.resolve(response);
            });
        }

        function checkFBStatus(){

            // FB.Event.subscribe('auth.authResponseChange', function(response) {

            //     if (response.status === 'connected') {
            //         console.log(response);
            //         // Logged into your app and Facebook.
            //         return getFBUser();
            //     } else if (response.status === 'not_authorized') {
            //         console.log(response);
            //         // The person is logged into Facebook, but not your app.
            //         $state.go('login');
            //     } else {
            //         console.log(response);
            //         // The person is not logged into Facebook, so we're not sure if
            //         // they are logged into this app or not.
            //         $state.go('login');
            //     }

            // });
            FB.getLoginStatus(function(response) {
                var deferred = $q.defer();
                if (response.status === 'connected') {
                    console.log(response);
                    // Logged into your app and Facebook.
                    return getFBUser();
                } else if (response.status === 'not_authorized') {
                    console.log(response);
                    // The person is logged into Facebook, but not your app.
                    //$state.go('login');
                    $window.location.href='/accounts/login/';
                } else {
                    console.log(response);
                    // The person is not logged into Facebook, so we're not sure if
                    // they are logged into this app or not.
                    //$state.go('login');
                    $window.location.href='/accounts/login/';
                }
            });
        }

    }
})();
