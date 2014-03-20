'use strict';

//Miner service used for miners REST endpoint
angular.module('mean.miners').factory('Miners', ['$resource', function($resource) {
    return $resource('miners/:minerId', {
        minerId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);