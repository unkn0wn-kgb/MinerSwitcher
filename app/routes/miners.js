'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var miners = require('../../app/controllers/miners');

	// Article Routes
	app.get('/miners', miners.list);
	app.post('/miners', users.requiresLogin, miners.create);
	app.get('/miners/:minerId', miners.read);
	app.put('/miners/:minerId', users.requiresLogin, miners.hasAuthorization, miners.update);
	app.del('/miners/:minerId', users.requiresLogin, miners.hasAuthorization, miners.delete);

	// Finish by binding the article middleware
	app.param('minerId', miners.minerByID);
};