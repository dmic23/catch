(function () {
    'use strict';

    angular
        .module('users.services')
        .factory('Users', Users);

    Users.$inject = ['$rootScope', '$http', '$q', '$state'];

    function Users($rootScope, $http, $q, $state) {

        var Users = {
            getUser: getUser,

        };

        return Users;

        function generalCallbackSuccess(response){
            console.log(response.data)
            console.log(response)
            return response.data;
        }

        function generalCallbackError(response){
            return $q.reject('Error '+response.status+'');
        }

        function getUser(fbId){
            return $http.get('api/v1/users/'+fbId+'/')
                .then(getUserSuccess)
                .catch(generalCallbackError);
        }

        function getUserSuccess(response){
            console.log(response);
            console.log($rootScope.fbUser);
           if(response.data.email === $rootScope.fbUser.email){
                console.log("email match. is user");
                return response.data;
            } else {
                console.log("email not match. is not user");
                $state.go('login');
            }
        }

    }
})();
