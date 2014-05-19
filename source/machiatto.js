var EventEmitter = require('events').EventEmitter;
var Reporter = require('./reporters/dot');

function expect(runner, context) {
	function assert(con, message) {
		var test = {
			slow: function () {
				return 100;
			}
		};

		if (!con) {
			runner.emit('fail', test);
		} else {
			runner.emit('pass', test);
		}

		runner.emit('test end');
	}

	return function (provided) {
		var expected = context.result || provided;

		return {
			equal: function (actual) {
				assert(expected === actual, 'expected: ' + expected + ' actual: ' + actual);
			}
		};
	};
}

function reporter(runner) {
	return new Reporter(runner);
}

function machiatto(spec) {
	var runner = new EventEmitter();
	var context = { _func: {} };

	reporter(runner);

	function reusable(name, fn) {
		if (fn) {
			context._func[name] = fn;
		} else {
			fn = context._func[name];
		}

		if (!fn) {
			throw new Error('no function');
		}

		return fn;
	}

	function done() {

	}

	function apply(f, fn) {
		fn(context, f === 'then' ? expect(runner, context) : done);
	}

	var _machiatto = {};

	runner.emit('start');

	['given', 'when', 'then'].forEach(function (f) {
		_machiatto[f] = function (name, fn) {
			apply(f, reusable(name, fn));
			return _machiatto;
		};
	});

	return _machiatto;
}

module.exports = machiatto;