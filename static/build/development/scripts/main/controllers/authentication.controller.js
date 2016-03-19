(function () {
    'use static';

    angular
        .module('main.controllers')
        .controller('AuthenticationController', AuthenticationController);

    AuthenticationController.$inject = ['$scope', '$state', 'Main'];

    function AuthenticationController($scope, $state, Main){
        var vm = this;

        activate();

        function activate(){

            console.log('Auth controller!');

            vm.authString = 'Here is the auth string';

        }

        // function FBLoginSuccess(response){
        //     console.log(response);
        // }

        // function FBLoginError(errMsg){
        //     console.log(errMsg);
        // }

        vm.fbLogin = function(){

            Main.fbLogin()
                .then(fbLoginSuccess)
                .catch(fbLoginError);
        }

        function fbLoginSuccess(response){
            console.log(response);
        }

        function fbLoginError(errMsg){
            console.log(errMsg);
        }

    }
})();
