var util = require('util');
var Test = require('./test');

function Context(specName) {
	this.specName = specName;
	this.arranges = [];
	this.asserts = [];
	this.path = [];
}

Context.prototype.lookup = function (name) {
	var filtered = this.arranges.filter(function (a) {
		return a.name === name;
	})[0];

	return filtered && filtered.fn;
};

Context.prototype.establish = function (name, fn) {
	this.arrange(name, fn);
};

Context.prototype.arrange = function (name, fn) {
	var exists = this.lookup(name);
	if (!exists) {
		this.arranges.push({name: name, fn: fn});
	}

	this.path.push(name);
};

Context.prototype.assert = function (name, fn) {
	this.asserts.push({name: name, fn: fn, path: this.path});
};

Context.prototype.run = function (runner) {
	var me = this;
	var specName = this.specName;

	console.log('run', util.inspect(this.path, {depth: 4}));

	runner.emit('start');

	this.asserts.forEach(function (assert) {
		var context = {};

		assert.path.forEach(function (name) {
			me.lookup(name)(context);
		});

		run(context, assert.fn, runner, new Test(assert.name, specName));
		runner.emit('test end');
	});

	runner.emit('end');

	function run(context, should, runner, test) {
		try {
			should(context);
		} catch (err) {
			return fail(err);
		}

		return pass();

		function pass() {
			runner.emit('pass', test);
		}

		function fail(err) {
			runner.emit('fail', test, err);
		}
	}
};

module.exports = Context;