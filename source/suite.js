var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;

function suite(title, asserts) {
	var _suite = {
		title: title,
		asserts: asserts
	};

	return _.extend(_suite, new EventEmitter());
}

module.exports = suite;
