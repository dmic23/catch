(function () {
    'use static';

    angular
        .module('moments.controllers')
        .controller('MomentsController', MomentsController);

    MomentsController.$inject = ['$scope', '$state', 'Users', 'Moments'];

    function MomentsController($scope, $state, Users, Moments){
        var vm = this;

        activate();

        function activate(){

            // Moments.getAllMoments()
            //     .then(getAllMomentsSuccess)
            //     .catch(getAllMomentsError);

        }

        function getAllMomentsSuccess(response){
            console.log(response);
        }

        function getAllMomentsError(errorMsg){
            console.log(errorMsg);
        }

    }
})();