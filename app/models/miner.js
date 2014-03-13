'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Article Schema
 */
var MinerSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	name: {
		type: String,
		default: '',
		trim: true
	},
	pcname: {
		type: String,
		default: '',
		trim: true
	},
    ip: {
        type: String,
        default: '',
        trim: true
    },
    port: {
        type: Number,
        default: 4028
    },
    gpio: {
        type: Schema.ObjectId,
        ref: 'GPIO'
    },
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

/**
 * Validations
 */
MinerSchema.path('name').validate(function(name) {
	return name.length;
}, 'Miner Name cannot be blank');

MinerSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).populate('user', 'displayName')
        .exec(cb);
    }
};

mongoose.model('Miner', MinerSchema);