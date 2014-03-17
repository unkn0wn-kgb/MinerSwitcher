'use strict';

var sockjs  = require('sockjs'),
    express = require('express'),
    _ = require('lodash'),
    http = require('http');


var _connections = [];

var _ws = function(){

    // 1. Echo sockjs server
    var sockjs_opts = {sockjs_url: 'http://cdn.sockjs.org/sockjs-0.3.min.js'};

    var sockjs_srv = sockjs.createServer(sockjs_opts);

    sockjs_srv.on('connection', function(conn) {

        _connections.push(conn);

        conn.on('data', function(message) {
            conn.write(message);
        });
    });

    sockjs_srv.on('close', function(conn) {

        _.remove(_connections,function(c){return c.id === conn.id;});

    });


    var app = express();
    var server = http.createServer(app);

    sockjs_srv.installHandlers(server, {prefix:'/watch'});

    console.log(' [*] Listening on 0.0.0.0:9000' );
    server.listen(9000, '0.0.0.0');

};

exports.ws = _ws;
exports.getConnections = function(){
    return _connections;
};