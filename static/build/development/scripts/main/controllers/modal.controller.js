(function(){
'use strict';

angular.module('nonce')
    .controller('MomentLocationModalCtrl', function ($scope, $uibModalInstance, locations) {
        var vm = this;
        vm.locations_list = locations;

        $scope.ok = function(loc){
            console.log(loc);
            vm.loc = {location:loc}
            $uibModalInstance.close(vm.loc);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
})();