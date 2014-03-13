'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var gpios = require('../../app/controllers/gpios');

	// Article Routes
	app.get('/gpios', gpios.list);
	app.post('/gpios', users.requiresLogin, gpios.create);

};