(function () {
    'use static';

    angular
        .module('main.controllers')
        .controller('AuthenticationController', AuthenticationController);

    AuthenticationController.$inject = ['$scope', '$state', 'Main', '$ionicLoading'];

    function AuthenticationController($scope, $state, Main, $ionicLoading){
        var vm = this;

        activate();

        function activate(){

            console.log('Auth controller!');

            vm.authString = 'Here is the auth string';

        }

        vm.fbLogin = function(){
            $ionicLoading.show({
                templateUrl: 'templates/loading/login-loading.html'
            });
            Main.fbLogin()
                .then(fbLoginSuccess)
                .catch(fbLoginError);
        }

        function fbLoginSuccess(response){
            console.log(response);
        }

        function fbLoginError(errMsg){
            console.log(errMsg);
            $ionicLoading.hide();
        }

    }
})();
