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
		return runner.emit('pending');
	}

	try {
		assert.model.fn(context);
	} catch (err) {
		return runner.emit('fail', test, err);
	}

	return runner.emit('pass', test);
}

function context(spec, suite, noop) {
	var arranges = {};
	var asserts = [];
	var root = tree({name: spec + ' root ' + suite});

	var curr = null;
	var skipped = false;

	var cache = roots[spec] = roots[spec] || [];
	cache.push(root);

	return {
		lookup: function (name) {
			var found;

			for(var i = 0; i < roots[spec].length; i++) {
				found = roots[spec][i].find(pred);

				if (found) {
					break;
				}
			}

			return found && found.model.fn;

			function pred(node) {
				return node.model && node.model.name === name && node.model.fn !== noop;
			}
		},

		establish: function (name, fn) {
			fn = fn || this.lookup(name);

			if (!fn) {
				throw new Error('missing function for ' + name);
			}

			curr = root.add({name: name, fn: fn});
			arranges[name] = fn;

			return this;
		},

		arrange: function (name, fn) {
			if (!curr) {
				throw new Error('context in not established, make sure `.when()` is called before');
			}

			fn = fn || this.lookup(name);

			if (!fn) {
				throw new Error('missing function for ' + name);
			}

			curr = curr.add({name: name, fn: fn});
			arranges[name] = fn;

			return this;
		},

		assert: function (name, fn) {
			var assert = curr.add({name: name, fn: fn});
			asserts.push(assert);

			return this;
		},

		run: function (runner) {
			asserts.forEach(executeAssert);

			function executeAssert(assert) {
				if (!assert.run) {
					var path = assert.path({includeSelf: false});
					var context = prepareContext(path);

					//console.log(util.inspect(debug(path), {depth: 5}));
					runAssert(context, assert, runner, test(assert.name, spec), noop);

					runner.emit('test end');
				}
			}
		}
	};
}

module.exports = context;