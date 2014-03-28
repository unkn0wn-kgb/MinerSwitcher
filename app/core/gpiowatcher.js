'use strict';

var wssrv = require('../../config/wsserver'),
    mongoose = require('mongoose'),
    GPIOModel = require('../models/gpio'),
    GPIO = mongoose.model('GPIO'),
    _ = require('lodash');

var _gpionotify = function(){

    var value = 0;
    /*setInterval(function(){

        GPIO.find().sort('-index').exec(function(err, gpios) {
            if (!err) {
                var connections = wssrv.getConnections();

                for(var i=0;i<connections.length;i++) {

                    var con = connections[i];

                    if (gpios === null || gpios.length > 0) {

                        if (value === 0) {
                            value = 1;
                        } else {
                            value = 0;
                        }
                        gpios[0].value = value;

                        con.write(JSON.stringify(gpios[0]));
                    }


                }


            }
        });




    },5000);*/

};

exports.startnotify = _gpionotify;

