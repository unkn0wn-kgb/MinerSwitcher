'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var gpios = require('../../app/controllers/gpios');

	// Article Routes
	app.get('/gpios', gpios.list);
	app.post('/gpios', users.requiresLogin, gpios.create);
    app.post('/gpios/:gpioId', users.requiresLogin, gpios.reset);
    app.post('/gpios/:gpioId', users.requiresLogin, gpios.poweroff);


    // Finish by binding the article middleware
    app.param('gpioId', gpios.gpioByID);

};