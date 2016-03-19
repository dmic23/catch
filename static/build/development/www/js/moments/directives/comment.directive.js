(function () {
    'use strict';

    angular
        .module('moments.directives')
        .directive('comment', comment);

    comment.$inject = ['$sce', 'Moments'];

    function comment($sce, Moments) {

        var directive = {
            // transclude:true,
            controller: 'MainController',
            controllerAs: 'vm',
            restrict: 'E',
            // replace: true,
            scope: {
                moment: '=',
                // addComment: '&',
            },
            link: function(scope, elem, attrs){
                console.log(scope);
                scope.addNewComment = function(comment,momentId){
                    console.log(comment);
                    comment['moment'] = momentId;
                    console.log(comment);
                    Moments.addComment(comment)
                        .then(function(response){
                            console.log(response);
                            console.log(scope.moment);
                            scope.moment.moment_comment.push(response);
                            console.log(scope.moment);
                            scope.vm.comment = {};
                            console.log(scope.vm.comment);
                        })
                        .catch(function(errorMsg){
                            console.log(errorMsg);
                        });
                };                

            },
            templateUrl: $sce.trustAsResourceUrl('templates/directives/comment-directive.html'),
        }
        return directive;
    }
})();