var EventEmitter = require('events').EventEmitter;
var async = require('async');

function runAssert(runner) {
	return function (assert, callback) {
		assert.run(runner, callback);
	};
}

function suite(title, asserts) {
	return {
		title: title,
		// FIXME
		root: false,

		run: function (callback) {
			async.eachSeries(asserts, runAssert(this), callback);
		}
	};
}

module.exports = suite;
