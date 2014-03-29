'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	GPIO = mongoose.model('GPIO'),
    ioport = require('pi-gpio'),
	_ = require('lodash');


/**
 * Create a gpios
 */
exports.create = function(req, res) {
/*var pinMapping = {
 "3": 0,
 "5": 1,
 "7": 4,
 "8": 14,
 "10": 15,
 "11": 17,
 "12": 18,
 "13": 21,
 "15": 22,
 "16": 23,
 "18": 24,
 "19": 10,
 "21": 9,
 "22": 25,
 "23": 11,
 "24": 8,
 "26": 7
 };*/
    //Generate GPIOS
    GPIO.find().sort('-index').exec(function(err, gpios) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            if (gpios === null || gpios.length <= 0) {
                //var gpio = new GPIO(req.body);

                var aryGPIOS = [{
                    name: 'RELAY 1',
                    index: 0,
                    gpio: 22,
                    out: true,
                    value:0
                },{
                    name: 'RELAY 2',
                    index: 1,
                    gpio: 11,
                    out: true,
                    value:0
                },{
                    name: 'RELAY 3',
                    index: 2,
                    gpio: 27,
                    out: true,
                    value:0
                },{
                    name: 'RELAY 4',
                    index: 3,
                    gpio: 15,
                    out: true,
                    value:0
                },{
                    name: 'RELAY 5',
                    index: 4,
                    gpio: 16,
                    out: true,
                    value:0
                },{
                    name: 'RELAY 6',
                    index: 5,
                    gpio: 18,
                    out: true,
                    value:0
                }];

                GPIO.create(aryGPIOS,function(err,g0,g1,g2,g3,g4,g5){
                    if (err) {
                        res.render('error', {
                            status: 500
                        });
                    } else {
                        var aryrt = [];
                        aryrt.push(g0,g1,g2,g3,g4,g5);
                        res.jsonp(aryrt);
                    }
                });

            }
        }
    });
};

/**
 * Show the current gpio
 */
exports.read = function(req, res) {
	res.jsonp(req.gpio);
};

/**
 * Update a gpio
 */
exports.update = function(req, res) {
	var gpio = req.gpio;

    gpio = _.extend(gpio, req.body);

    gpio.save(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(gpio);
		}
	});
};

/**
 * List of gpios
 */
exports.list = function(req, res) {
	GPIO.find().sort('+index').exec(function(err, gpios) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(gpios);
		}
	});
};

/**
 * Reset GPIO
 */
exports.reset = function(req, res) {

    var gpio = req.gpio;

    if (!_.isNull(gpio.gpio)) {
        ioport.open(gpio.gpio, 'output', function(err) {     // Open pin 16 for output
            ioport.write(gpio.gpio, 1, function() {          // Set pin 16 high (1)

                setTimeout(function(){
                    ioport.write(gpio.gpio, 0, function() {
                        // Close pin 16
                        ioport.close(gpio.gpio);
                        res.jsonp({success:true});
                    });
                },200);
            });
        });
    }


};


/**
 * PowerOff GPIO
 */
exports.poweroff = function(req, res) {
    var gpio = req.gpio;

    if (!_.isNull(gpio.gpio)) {
        ioport.open(gpio.gpio, 'output', function(err) {     // Open pin 16 for output
            ioport.write(gpio.gpio, 1, function() {          // Set pin 16 high (1)

                setTimeout(function(){
                    ioport.write(gpio.gpio, 0, function() {
                        // Close pin 16
                        ioport.close(gpio.gpio);
                        res.jsonp({success:true});
                    });
                },10000);
            });
        });
    }

};

/**
 * PowerOn GPIO
 */
exports.poweron = function(req, res) {
    var gpio = req.gpio;

    if (!_.isNull(gpio.gpio)) {
        ioport.open(gpio.gpio, 'output', function(err) {     // Open pin 16 for output
            ioport.write(gpio.gpio, 1, function() {          // Set pin 16 high (1)

                setTimeout(function(){
                    ioport.write(gpio.gpio, 0, function() {
                        // Close pin
                        ioport.close(gpio.gpio);
                        res.jsonp({success:true});
                    });
                },800);
            });
        });
    }

};


/**
 * Article middleware
 */
exports.gpioByID = function(req, res, next, id) {
    GPIO.load(id, function(err, gpio) {
        if (err) return next(err);
        if (!gpio) return next(new Error('Failed to load gpio ' + id));
        req.gpio = gpio;
        next();
    });
};