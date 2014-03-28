'use strict';

var path = require('path'),
	rootPath = path.normalize(__dirname + '/../..');

module.exports = {
	app: {
		title: 'MinerSwitcher',
		description: 'Raspberry PI and Nodejs miners internet reset stack',
		keywords: ''
	},
	db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI,
	root: rootPath,
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions'
};