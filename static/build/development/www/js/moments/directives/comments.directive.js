(function () {
    'use strict';

    angular
        .module('moments.directives')
        .directive('comments', comments);

    comments.$inject = ['$sce'];

    function comments($sce) {

        var directive = {
            // transclude:true,
            controller: 'MainController',
            controllerAs: 'vm',
            restrict: 'E',
            // replace: true,
            scope: {
                momentComment: '=',
            },
            templateUrl: $sce.trustAsResourceUrl('templates/directives/comments-directive.html'),
        }
        return directive;
    }
})();