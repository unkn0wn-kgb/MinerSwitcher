'use strict';

angular.module('mean.watcher').factory('WatcherService', ['$q', '$rootScope', function($q, $rootScope) {
    // We return this object to anything injecting our service
    var Service = {};
    // Keep all pending requests here until they get responses

    // Create our websocket object with the address to the websocket
    var ws = new SockJS('http://localhost:9000/watch');

    ws.onopen = function(){
        console.log('Socket has been opened!');
    };

    ws.onmessage = function(message) {
        listener(JSON.parse(message.data));
    };

    function listener(data) {
        var messageObj = data;

        // If an object exists with callback_id in our callbacks object, resolve it
        if(messageObj !== null) {
            $rootScope.$broadcast('gpioUpdate', messageObj);
            console.log('Received data from websocket: ', messageObj);
        }
    }

    return Service;
}]);


