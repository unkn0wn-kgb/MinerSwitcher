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
            url:'gpios/:gpioId/:action',
            params: {
                action: 'reset'
            },
            method: 'POST',
            isArray:false
        },
        poweroff: {
            method: 'POST',
            url:'gpios/:gpioId/:action',
            params: {
                action: 'poweroff'
            },
            isArray:false
        },
        poweron: {
            method: 'POST',
            url:'gpios/:gpioId/:action',
            params: {
                action: 'poweron'
            },
            isArray:false
        }

    });
}]);