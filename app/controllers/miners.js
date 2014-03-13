'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Miner = mongoose.model('Miner'),
	_ = require('lodash');

/**
 * Create a miner
 */
exports.create = function(req, res) {

    var gpio = (_.isUndefined(req.body.gpio) ? null : req.body.gpio._id );
    var body = _.extend(req.body, { gpio: gpio });
    var miner = new Miner(body);
	miner.user = req.user;

	miner.save(function(err) {
		if (err) {
			return res.send('users/signup', {
				errors: err.errors,
				miner: miner
			});
		} else {
			res.jsonp(miner);
		}
	});
};

/**
 * Show the current miner
 */
exports.read = function(req, res) {
	res.jsonp(req.miner);
};

/**
 * Update a miner
 */
exports.update = function(req, res) {
	var miner = req.miner;

	miner = _.extend(miner, req.body);

	miner.save(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(miner);
		}
	});
};

/**
 * Delete a miner
 */
exports.delete = function(req, res) {
	var miner = req.miner;

	miner.remove(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(miner);
		}
	});
};

/**
 * List of Miners
 */
exports.list = function(req, res) {
	Miner.find().populate('gpio').sort('-name').exec(function(err, miners) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(miners);
		}
	});
};

/**
 * Miner middleware
 */
exports.minerByID = function(req, res, next, id) {
	Miner.load(id, function(err, miner) {
		if (err) return next(err);
		if (!miner) return next(new Error('Failed to load miner ' + id));
		req.miner = miner;
		next();
	});
};

/**
 * Miner authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.miner.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};