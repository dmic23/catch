(function () {
    'use strict';

    angular
        .module('moments.services')
        .factory('Moments', Moments);

    Moments.$inject = ['$http', '$q'];

    function Moments($http, $q) {

        var Moments = {

            getAllMoments: getAllMoments,
            postMoment: postMoment,
            addComment: addComment,
            likeMoment: likeMoment,

        };

        return Moments;

        function generalCallbackSuccess(response){
            console.log(response.data)
            console.log(response)
            return response.data;
        }

        function generalCallbackError(response){
            return $q.reject('Error '+response.status+'');
        }

        function getAllMoments(){
            return $http.get('api/v1/moments/')
                .then(generalCallbackSuccess)
                .catch(generalCallbackError);
        }

        function postMoment(moment){
            console.log(moment);
            return $http.post('api/v1/moments/', moment)
                .then(generalCallbackSuccess)
                .catch(generalCallbackError);
        }

        function addComment(comment){
            return $http.post('api/v1/comments/', comment)
                .then(generalCallbackSuccess)
                .catch(generalCallbackError);
        }

        function likeMoment(like){
            return $http.post('api/v1/likes/', like)
                .then(generalCallbackSuccess)
                .catch(generalCallbackError);
        }
    }
})();
