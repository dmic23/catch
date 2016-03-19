(function () {
    'use static';

    angular
        .module('main.controllers')
        .controller('MomentMapController', MomentMapController);

    MomentMapController.$inject = ['$scope', '$state', 'Moments'];

    function MomentMapController($scope, $state, Moments){
        var vm = this;

        activate();

        function activate(){
            Moments.getAllMoments()
                .then(getAllMomentsSuccess)
                .catch(getAllMomentsError);

            if (!navigator.geolocation){
                console.log("Geolocation is not supported by your browser");
                return;
            }
            navigator.geolocation.getCurrentPosition(setMap, geoLocError);
        };

        function geoLocError() {
            output.innerHTML = "Unable to retrieve your location";
        };

        function getAllMomentsError(errorMsg){
            console.log('Could not get Moments...', errorMsg);
        };

        function getAllMomentsSuccess(response){
            vm.moments = response;
        };

        function setMap(position) {
            var lat  = position.coords.latitude;
            var lng = position.coords.longitude;

            var map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: lat, lng: lng},
                zoom: 13
            });
            checkMoments(map);
        };

        function checkMoments(map){
            console.log(map)
            console.log(vm.moments);
            angular.forEach(vm.moments, function(moment){
                console.log(moment);
                if(moment.loc_id){
                    console.log(moment);
                    var service = new google.maps.places.PlacesService(map);
                    console.log(moment.loc_id);
                    service.getDetails({ placeId: moment.loc_id }, function (response, status){
                        console.log(response);
                        console.log(status);
                        var moment_loc = response.geometry.location;
                        console.log(moment_loc);
                        plotMoment(map, moment, moment_loc);
                    });
                    console.log(service);
                } else if(moment.moment_lat && moment.moment_lng){
                    var moment_loc = {
                        lat: parseFloat(moment.moment_lat),
                        lng: parseFloat(moment.moment_lng)
                    }
                    plotMoment(map, moment, moment_loc);
                } else {
                    console.log('No location. Let\'s go to Gold Cane');
                    var moment_loc = {
                        lat: 37.769755,
                        lng: -122.447985
                    }
                    plotMoment(map, moment, moment_loc);
                }

            });
        };

        function plotMoment(map, moment, moment_loc){
            var infoContent = '<div class="row">'+'<h6>'+moment.user_moment.username+' -- '+moment.loc_name+' -- '+moment.moment_created+'</h6>'+'</div>'+'<img src="'+moment.image+'" width="200" height="auto">';
                console.log(infoContent);
                console.log(moment_loc);
                var marker = new google.maps.Marker({
                    position: moment_loc,
                    map: map,
                    title: moment.user_moment.username+' -- '+moment.loc_name+' -- '+moment.moment_created
                });
                console.log(marker);
                var infowindow = new google.maps.InfoWindow({
                    content: infoContent,
                    maxWidth: 200
                });
                marker.addListener('click', function() {
                    infowindow.open(map, marker);
                });
        }

    };
})();
