'use strict';

//Setting up route
angular.module('mean.articles').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listGPIOS', {
			url: '/gpios',
			templateUrl: 'modules/gpios/views/list.html'
		}).
		state('editGPIOS', {
			url: '/gpios/:gpioId/edit',
			templateUrl: 'modules/gpios/views/edit.html'
		});
	}
]);