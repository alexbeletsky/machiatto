var tree = require('./tree');

function noop() {}
var roots = {};

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
	var empty = {data: {}, name: ''};

	path.forEach(runPathFunction);

	function runPathFunction(node) {
		var type = node.model && node.model.type;
		var name = node.model && node.model.name;
		var fn = node.model && node.model.fn;

		if (name && fn) {
			empty.name += type + ' ' + name + ' ';
			fn.call(empty.data);
		}
	}

	return empty;
}

function assertRunner(assert, suite, spec, skipped, only) {
	return {
		suite: suite,

		only: only,

		run: function (runner) {
			if (!assert.run) {
				var path = assert.path({includeSelf: false});
				var context = prepareContext(path);
				var name = context.name + 'it should ' + assert.model.name;

				run(context.data, assert, runner, test(name, spec), noop);
				runner.emit('test end');
			}
		}
	};

	function run(context, assert, runner, test) {
		assert.run = true;

		if (assert.model.fn === noop || skipped) {
			return runner.emit('pending', test);
		}

		try {
			assert.model.fn.call(context);
		} catch (err) {
			return runner.emit('fail', test, err);
		}

		return runner.emit('pass', test);
	}
}

function context(suite, spec) {
	var asserts = [];
	var root = tree();
	var curr = null;

	var cache = roots[suite] = roots[suite] || [];
	cache.push(root);

	var skipped = false;
	var only = false;

	return {
		lookup: function (name) {
			var pred = function (node) {
				return node.model && node.model.name === name && node.model.fn !== noop;
			};

			for(var i = 0; i < roots[suite].length; i++) {
				var found = roots[suite][i].find(pred);

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
			if (typeof fn === 'string' && fn === 'noop') {
				fn = noop;
			}

			fn = this.reusable(name, fn);
			curr = root.add({type: 'when', name: name, fn: fn});

			return this;
		},

		arrange: function (name, fn) {
			if (typeof fn === 'string' && fn === 'noop') {
				fn = noop;
			}

			if (!curr) {
				throw new Error('context in not established, make sure `.when()` is called before');
			}

			fn = this.reusable(name, fn);
			curr = curr.add({type: 'and', name: name, fn: fn});

			return this;
		},

		assert: function (name, fn) {
			if (typeof fn === 'string' && fn === 'noop') {
				fn = noop;
			}

			var assert = curr.add({type: 'assert', name: name, fn: fn});
			asserts.push(assert);

			return this;
		},

		skip: function () {
			skipped = true;
			return this;
		},

		only: function () {
			only = true;
			return this;
		},

		asserts: function () {
			return asserts.map(function (assert) {
				return assertRunner(assert, suite, spec, skipped, only);
			});
		}
	};
}

module.exports = context;