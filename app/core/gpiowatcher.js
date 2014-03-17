'use strict';

var wssrv = require('../../config/wsserver');

var _gpionotify = function(){

    setInterval(function(){

        var connections = wssrv.getConnections();

        for(var i=0;i<connections.length;i++) {

            var con = connections[i];

            con.write('blah');
        }

    },2000);

};

exports.startnotify = _gpionotify;

