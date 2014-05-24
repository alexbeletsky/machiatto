var util = require('util');
var tree = require('./tree');

var roots = {};

function debug(path) {
	return path.reduce(function (m, p) {
		return m + (p.model && p.model.name || '') + ' ';
	}, '');
}

function test(name, spec) {
	return {
		title: name,

		slow: function () {
			return 100;
		},

		fullTitle: function () {
			return spec + ' - ' + name;
		}
	};
}

function prepareContext(path) {
	var empty = {};

	path.forEach(runPathFunction);

	function runPathFunction(node) {
		var fn = node.model && node.model.fn;
		fn && fn(empty);
	}

	return empty;
}

function runAssert(context, assert, runner, test, noop) {
	assert.run = true;

	if (assert.model.fn === noop) {
		return runner.emit('pending', test);
	}

	try {
		assert.model.fn(context);
	} catch (err) {
		return runner.emit('fail', test, err);
	}

	return runner.emit('pass', test);
}

function context(spec, suite, noop) {
	var asserts = [];
	var root = tree();
	var curr = null;

	var cache = roots[spec] = roots[spec] || [];
	cache.push(root);

	return {
		lookup: function (name) {
			var pred = function (node) {
				return node.model && node.model.name === name && node.model.fn !== noop;
			};

			for(var i = 0; i < roots[spec].length; i++) {
				var found = roots[spec][i].find(pred);

				if (found) {
					return found.model.fn;
				}
			}
		},

		reusable: function (name, fn) {
			fn = fn || this.lookup(name);

			if (!fn) {
				throw new Error('missing function for ' + name);
			}

			return fn;
		},

		establish: function (name, fn) {
			fn = this.reusable(name, fn);
			curr = root.add({name: name, fn: fn});

			return this;
		},

		arrange: function (name, fn) {
			if (!curr) {
				throw new Error('context in not established, make sure `.when()` is called before');
			}

			fn = this.reusable(name, fn);
			curr = curr.add({name: name, fn: fn});

			return this;
		},

		assert: function (name, fn) {
			var assert = curr.add({name: name, fn: fn});
			asserts.push(assert);

			return this;
		},

		run: function (runner) {
			var executed = asserts.some(function (assert) {
				return assert.run;
			});

			if (!executed && asserts.length > 0) {
				runner.emit('suite', {title: suite});

				asserts.forEach(executeAssert);

				runner.emit('suite end');
			}

			function executeAssert(assert) {
				var path = assert.path({includeSelf: false});
				var context = prepareContext(path);

				//console.log(util.inspect(debug(path), {depth: 5}));
				runAssert(context, assert, runner, test(assert.model.name, spec), noop);

				runner.emit('test end');
			}
		}
	};
}

module.exports = context;