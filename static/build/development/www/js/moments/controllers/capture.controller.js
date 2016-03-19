(function () {
    'use strict';

    angular
        .module('moments.controllers')
        .controller('CaptureController', CaptureController);

    CaptureController.$inject = ['$scope', '$state', 'Users', 'Moments'];

    function CaptureController($scope, $state, Users, Moments){
        var vm = this;

        activate();

        function activate(){

            vm.canvas = document.getElementById('canvas');
            vm.context = canvas.getContext('2d');
            vm.video = document.getElementById('video'),
            vm.photo = document.getElementById('photo'),
            vm.vendorUrl = window.URL || window.webkitURL;

            navigator.getMedia =   (navigator.getUserMedia ||
                                    navigator.webkitGetUserMedia ||
                                    navigator.mozGetUserMedia ||
                                    navigator.msGetUserMedia);

            navigator.getMedia({
                video: true,
                audio: false
            }, function(stream){
                vm.localStream = stream.getTracks()[0];
                vm.video.src = vm.vendorUrl.createObjectURL(stream);
                vm.video.play();
            }, function(error){
                console.log(error);
            });

        }

        vm.capture = function(){
            console.log(vm.canvas.toDataURL('image/png'));
            vm.context.drawImage(vm.video, 0, 0, 400, 300);
            vm.photo.setAttribute('src', vm.canvas.toDataURL('image/png'));
            getLocation();
        };

        function getLocation() {

            if (!navigator.geolocation){
                console.log("Geolocation is not supported by your browser");
                return;
            }

            function success(position) {
                var lat  = position.coords.latitude;
                var lng = position.coords.longitude;

                localStorage.setItem('lat', lat);
                localStorage.setItem('lng', lng);
            };

            function error() {
                output.innerHTML = "Unable to retrieve your location";
            };

            navigator.geolocation.getCurrentPosition(success, error);
        }

        vm.editCapture = function(){
            localStorage.setItem('img', canvas.toDataURL('image/png'));
            vm.video.pause();
            vm.video.src = '';
            vm.localStream.stop();
            $state.go('app.edit');
        }

    }
})();
