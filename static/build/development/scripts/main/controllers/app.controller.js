(function () {
    'use strict';

    angular
        .module('main.controllers')
        .controller('AppController', AppController);

    AppController.$inject = ['$rootScope', '$scope', '$sce', '$state', 'Main', 'Users'];

    function AppController($rootScope, $scope, $sce, $state, Main, Users){
        var vm = this;

        $rootScope.$on("update_user_info", function(event, message){
            vm.fbUser = message;
            $scope.fbUser = message;
            console.log(vm.fbUser);
            console.log($scope.fbUser);
            activate();
        });

        function activate(){

            Users.getUser(vm.fbUser.id)
                .then(getUserSuccess)
                .catch(getUserError);

        }

        function getUserSuccess(response){
            console.log(response);
            $scope.isUser = true;
            $scope.user = response;
            vm.user = response;
            console.log(vm.user);
        }

        function getUserError(errorMsg){
            console.log(errorMsg);

        }

    var mediaPath = media_path('');
    console.log('media path', mediaPath);
    var staticPath = static_path('');
    console.log('static path', staticPath);

    $scope.path = { 
        static_files: $sce.trustAsResourceUrl(staticPath),
        media: $sce.trustAsResourceUrl(mediaPath),
    };

    }
})();
