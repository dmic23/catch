(function () {
    'use strict';

    angular
        .module('moments.directives')
        .directive('like', like);

    like.$inject = ['Moments'];

    function like(Moments) {

        var directive = {
            // transclude:true,
            // controller: 'MainController',
            // controllerAs: 'vm',
            restrict: 'E',
            // replace: true,
            scope: {
                user: '=',                
                moment: '=',

            },
            link: function(scope, elem, attrs){
                scope.likeMoment = function(momentId, user){
                    if(scope.moment.moment_like.length){
                        angular.forEach(scope.moment.moment_like, function(like){
                            if(like.liked_by.id === user.id){
                                console.log("LIKED BY USER, NOW UNLIKING", like.id);
                                unLike(like.id, momentId);

                            } else {
                                addLike(momentId);
                            }  
                        });                      
                    } else {
                        addLike(momentId);
                    }
                };

                function addLike(momentId){
                    var like = {};
                    like['moment'] = momentId;
                    Moments.likeMoment(like)
                        .then(function(response){
                            console.log(response);
                            scope.moment.moment_like.push(response);
                        })
                        .catch(function(errorMsg){
                            console.log(errorMsg);
                        });
                };  

                function unLike(likeId, momentId){
                    var like = {};
                    like['moment'] = momentId;
                    like['likeId'] = likeId;
                    Moments.unLikeMoment(like)
                        .then(function(response){
                            console.log(response);
                            // scope.moment.moment_like.push(response);
                        })
                        .catch(function(errorMsg){
                            console.log(errorMsg);
                        });
                };             

            },
            template: '<div class="">'+'<button class="button button-icon icon ion-heart" ng-click="likeMoment(moment.id, user)"></button>'+'</div>' ,
        }
        return directive;
    }
})();