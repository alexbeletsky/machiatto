var tree = require('./tree');

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

function runAssert(context, should, runner, test) {
	try {
		should(context);
	} catch (err) {
		return runner.emit('fail', test, err);
	}

	return runner.emit('pass', test);
}

function context(name) {
	var specName = name;
	var arranges = {};
	var asserts = [];
	var root = tree();
	var curr = null;

	return {
		lookup: function (name) {
			return arranges[name];
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
			runner.emit('start');

			asserts.forEach(executeAssert);

			runner.emit('end');

			function executeAssert(assert) {
				var path = assert.path({includeSelf: false});
				var context = prepareContext(path);

				runAssert(context, assert.model.fn, runner, test(assert.name, specName));

				runner.emit('test end');
			}
		}
	};
}

module.exports = context;