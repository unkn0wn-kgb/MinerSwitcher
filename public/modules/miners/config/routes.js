'use strict';

//Setting up route
angular.module('mean.miners').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listMiners', {
			url: '/miners',
			templateUrl: 'modules/miners/views/list.html'
		}).
		state('createMiner', {
			url: '/miners/create',
			templateUrl: 'modules/miners/views/create.html'
		}).
		state('viewMiner', {
			url: '/miners/:minerId',
			templateUrl: 'modules/miners/views/view.html'
		}).
		state('editMiner', {
			url: '/miners/:minerId/edit',
			templateUrl: 'modules/miners/views/edit.html'
		});
	}
]);