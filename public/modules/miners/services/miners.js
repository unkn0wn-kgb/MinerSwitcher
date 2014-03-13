'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.miners').factory('Miners', ['$resource', function($resource) {
    return $resource('miners/:minerId', {
        minerId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);