(function () {
    'use strict';

    angular
        .module('moments.controllers')
        .controller('CompleteController', CompleteController);

    CompleteController.$inject = ['$scope', '$state', '$uibModal', 'Users', 'Moments'];

    function CompleteController($scope, $state, $uibModal, Users, Moments){
        var vm = this;

        vm.newMoment = {};
        vm.newMoment.tagged = [];

        activate();

        function activate(){

            vm.canvas = document.getElementById('cnvs');
            vm.context = vm.canvas.getContext('2d');
            vm.img = localStorage.getItem('img');
            var image = new Image();

            console.log(vm.img);
            image.onload = function(){
                vm.context.drawImage(image, 0, 0);
            };
            image.src = vm.img;

            var input  = document.getElementById('placesList');
            // var allPlaces = new google.maps.places.Autocomplete(input, {types: ['establishment']});
            // console.log(allPlaces);

            var lat = parseFloat(localStorage.getItem('lat'));
            console.log('Lat', lat);
            vm.newMoment.moment_lat = lat.toFixed(6);
            var lng = parseFloat(localStorage.getItem('lng'));
            console.log('Lng', lng);
            vm.newMoment.moment_lng = lng.toFixed(6);

            var request = {
                location: {lat:lat, lng:lng},
                radius: '500'
            };

            var service = new google.maps.places.PlacesService(input);
            service.nearbySearch(request, callback);

            function callback(results, status) {
                
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    console.log(results);
                    vm.locations = results;
                    console.log(vm.locations);
                }
            }
        };

        $scope.open = function(size){

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: static_path('scripts/views/modals/location-modal.html'),
                controller: 'MomentLocationModalCtrl',
                controllerAs: 'vm',
                size: size,
                resolve: {
                    locations: function () {
                        return vm.locations;
                    }
                }
            });

            modalInstance.result.then(function (selectedLoc){
                console.log(selectedLoc);
                vm.newMoment.loc_name = selectedLoc.location.name;
                vm.newMoment.loc_id = selectedLoc.location.place_id;
                vm.newMoment.loc_vicinity = selectedLoc.location.vicinity;
                console.log(vm.newMoment);
            });
        };

        vm.addTag = function(friend){
            console.log(friend);
            vm.newMoment.tagged.push(friend.id);
        };

        vm.postMoment = function(){
            console.log(vm.img);
            var blob = new Blob([vm.img], {type: 'image/png'});
            console.log('NewBlob : ', blob);
            var filename = $scope.user.first_name+'_'+$scope.user.last_name;
            var file = new File([vm.img], filename+'.png');
            console.log('NewFile : ', file);
            vm.newMoment.image = vm.img;
            // vm.newMoment.tagged = '';
            console.log('VM.NewMoment', vm.newMoment);
            Moments.postMoment(vm.newMoment)
                .then(postMomentSuccess)
                .catch(postMomentError);
        }

        function postMomentSuccess(response){
            console.log(response);
            $state.go('app.feed');

        }

        function postMomentError(errorMsg){
            console.log(errorMsg);
        }


    }
})();