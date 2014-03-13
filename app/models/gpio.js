'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * User Schema
 */
var GPIOSchema = new Schema({
    name: {
        type: String,
        default: '',
        trim: true
    },
    index: {
        type: Number,
        required: true,
        default: '0',
        min: -1,
        max: 5,
        unique:true
    },
    gpio: {
        type: Number,
        required: true,
        default: '0',
        min: 0,
        max: 30,
        unique:true
    },
    out: {
        type: Boolean,
        default:false
    },
    value: {
        type: Number,
        required: true,
        default: '0',
        min: 0,
        max: 1
    }
});

GPIOSchema.pre('save',function(next) {
    var self = this;
    mongoose.models.GPIO.findOne({index : self.index},function(err, gpio) {
        if(err) {
            next(err);
        } else if(gpio) {
            self.invalidate('gpio','GPIO already exists');
            next(new Error('GPIO already exists'));
        } else {
            next();
        }
    });
    next();
});

mongoose.model('GPIO', GPIOSchema);