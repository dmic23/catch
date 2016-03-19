(function () {
    'use static';

    angular
        .module('main.controllers')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope', '$state', 'Moments'];

    function MainController($scope, $state, Moments){
        var vm = this;

        // vm.user = $scope.$parent.user;
        console.log($scope);
        console.log($scope.user);

        activate();

        function activate(){

            Moments.getAllMoments()
                .then(getAllMomentsSuccess)
                .catch(getAllMomentsError);

        }

        function getAllMomentsSuccess(response){
            console.log(response);
            vm.moments = response
        }

        function getAllMomentsError(errorMsg){
            console.log(errorMsg);
        }

        // vm.addComment = function(comment, momentId){
        //     console.log(comment);
        //     comment['moment'] = momentId;
        //     console.log(comment);
        //     Moments.addComment(comment)
        //         .then(addCommentSuccess)
        //         .catch(addCommentError);
        // }

        // function addCommentSuccess(response){
        //     console.log(response);
            // console.log(response.moment);
            // vm.newCom = _.findWhere(vm.moments, {id: response.moment});
            // console.log(vm.newCom.moment_comment);
            // vm.newCom.moment_comment.push(response);
            // $timeout(function() {
            //     $scope.$apply();
            // });
            // console.log(vm.newCom);
            // console.log(vm.moments);
            // vm.moments = vm.moments;

        // }

        // function addCommentError(errorMsg){
        //     console.log(errorMsg);
        // }
    }
})();