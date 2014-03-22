'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.gpios').factory('GPIOS', ['$resource', function($resource) {
    return $resource('gpios/:gpioId', {
        gpioId: '@_id'
    }, {
        update: {
            method: 'PUT'
        },
        populate: {
            method: 'POST',
            isArray:true
        },
        reset: {
            method: 'POST',
            isArray:true
        },
        poweroff: {
            method: 'POST',
            isArray:true
        }
    });
}]);