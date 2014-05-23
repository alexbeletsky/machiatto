var Test = require('./test');
var tree = require('./tree');

function prepare(path) {
	var context = {};

	path.forEach(function (node) {
		var fn = node.model && node.model.fn;
		fn && fn(context);
	});

	return context;
}

function run(context, should, runner, test) {
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

			asserts.forEach(function (assert) {
				var path = assert.path({includeSelf: false});
				var context = prepare(path);

				run(context, assert.model.fn, runner, new Test(assert.name, specName));

				runner.emit('test end');
			});

			runner.emit('end');
		}
	};
}

module.exports = context;