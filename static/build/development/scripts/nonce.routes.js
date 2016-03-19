(function () {
    'use strict';

    angular
        .module('nonce.routes')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get('$state');
            $state.go('app.feed');
        });

        $stateProvider

            .state('app', {
                abstract: true,
                url: '/app',
                controller: 'AppController',
                controllerAs: 'vm',     
                templateUrl: 'static/build/development/scripts/views/main/app.html',
                // data: {
                //     requireLogin: true
                // },
            })
            .state('app.feed', {
                url: '/feed',
                controller: 'MainController',
                controllerAs: 'vm',     
                templateUrl: 'static/build/development/scripts/views/main/feed.html',
                // data: {
                //     requireLogin: true
                // },
            })
            .state('app.capture', {
                url: '/capture',
                controller: 'CaptureController',
                controllerAs: 'vm',     
                templateUrl: 'static/build/development/scripts/views/moments/capture.html',
                // data: {
                //     requireLogin: true
                // },
            })
            .state('app.edit', {
                url: '/edit',
                controller: 'EditController',
                controllerAs: 'vm',     
                templateUrl: 'static/build/development/scripts/views/moments/edit.html',
                // data: {
                //     requireLogin: true
                // },
            })
            .state('app.complete', {
                url: '/complete',
                controller: 'CompleteController',
                controllerAs: 'vm',     
                templateUrl: 'static/build/development/scripts/views/moments/complete.html',
                // data: {
                //     requireLogin: true
                // },
            })
            .state('app.map', {
                url: '/map',
                controller: 'MomentMapController',
                controllerAs: 'vm',     
                templateUrl: 'static/build/development/scripts/views/main/moment-map.html',
                // data: {
                //     requireLogin: true
                // },
            })
            .state('login', {
                url: '/login',
                controller: 'AuthenticationController',
                controllerAs: 'vm',     
                templateUrl: 'static/build/development/scripts/views/main/login.html',
                // data: {
                //     requireLogin: true
                // },
            });
            // //dashboard
            // .state('app.dashboard', {
            //     url: '/dashboard',
            //     controller: 'DashboardController',
            //     controllerAs: 'vm',
            //     templateUrl: static_path('views/dashboard.html'),
            //     resolve: {
            //         plugins: ['$ocLazyLoad', function($ocLazyLoad) {
            //             return $ocLazyLoad.load([
            //                 static_path('scripts/vendor/datatables/datatables.bootstrap.min.css')
            //             ]);
            //         }]
            //     },
            //     data: {
            //     requireLogin: true
            //     },
            // });
    }
})();

