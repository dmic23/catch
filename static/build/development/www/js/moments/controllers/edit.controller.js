(function () {
    'use strict';

    angular
        .module('moments.controllers')
        .controller('EditController', EditController);

    EditController.$inject = ['$scope', '$state', 'Users', 'Moments'];

    function EditController($scope, $state, Users, Moments){
        var vm = this;

        activate();

        function activate(){

            vm.canvas = document.getElementById('cnvs');
            vm.context = vm.canvas.getContext('2d');
            vm.img = localStorage.getItem('img');
            var image = new Image();

            image.onload = function(){
                vm.context.drawImage(image, 0, 0);
            }
            image.src = vm.img;

        }

        vm.completeCapture = function(){
            localStorage.setItem('img', vm.canvas.toDataURL('image/png'));
            $state.go('app.complete');
        }

    }
})();