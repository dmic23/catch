(function () {
    'use strict';

    angular
        .module('nonce.config')
        .config(config);

    config.$inject = ['$locationProvider', '$urlMatcherFactoryProvider'];

    function config($locationProvider, $urlMatcherFactoryProvider) {
        // $locationProvider.html5Mode({enabled: true, requireBase: false});
        // $locationProvider.hashPrefix('!');

		$urlMatcherFactoryProvider.caseInsensitive(true);
		$urlMatcherFactoryProvider.strictMode(false); 
    }
})();