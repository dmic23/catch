(function () {
    'use static';

    angular
        .module('users.controllers')
        .controller('UserController', UserController);

    UserController.$inject = ['$scope', '$state'];

    function UserController($scope, $state){
        var vm = this;

        activate();

        function activate(){

            vm.userString = 'Here is the user string';

        }

    }
})();