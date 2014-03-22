'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	GPIO = mongoose.model('GPIO'),
	_ = require('lodash');


/**
 * Create a gpios
 */
exports.create = function(req, res) {

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
                    gpio: 25,
                    out: true,
                    value:0
                },{
                    name: 'RELAY 2',
                    index: 1,
                    gpio: 17,
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
                    gpio: 22,
                    out: true,
                    value:0
                },{
                    name: 'RELAY 5',
                    index: 4,
                    gpio: 23,
                    out: true,
                    value:0
                },{
                    name: 'RELAY 6',
                    index: 5,
                    gpio: 24,
                    out: true,
                    value:0
                }];

                GPIO.create(aryGPIOS,function(err,g0,g1,g2,g3,g4,g5,g6){
                    if (err) {
                        res.render('error', {
                            status: 500
                        });
                    } else {
                        var aryrt = [];
                        aryrt.push(g0,g1,g2,g3,g4,g5,g6);
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



};


/**
 * PowerOff GPIO
 */
exports.poweroff = function(req, res) {
    var gpio = req.gpio;



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