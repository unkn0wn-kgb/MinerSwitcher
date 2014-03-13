'use strict';

//Authentication service for user variables
angular.module('mean.users').factory('Authentication', ['$cookies',
	function($cookies,$http) {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);