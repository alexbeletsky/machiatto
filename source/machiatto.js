var EventEmitter = require('events').EventEmitter;
var Reporter = require('./reporters/dot');

function expect(runner, context) {
	function assert(condition, message) {
		var test = {
			slow: function () {
				return 100;
			},

			fullTitle: function () {
				return 'full title';
			}
		};

		if (!condition) {
			runner.emit('fail', test, new Error('message'));
		} else {
			runner.emit('pass', test);
		}

		runner.emit('test end', test);
	}

	function evaluate() {
		var givens = context._spec.given;
		givens.forEach(function (g) {
			g(context);
		});

		var whens = context._spec.when;
		whens.forEach(function (w) {
			w(context);
		});

		return context.result;
	}

	return function (provided) {
		var actual = evaluate() || provided;

		console.log(actual);

		return {
			equal: function (expected) {
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
	var context = { _func: {}, _spec: {name: spec} };

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

	function addToContext(context, name, fn) {
		var s = context._spec[name] = context._spec[name] || [];
		s.push(fn);
	}

	var _machiatto = {
		run: function () {
			runner.emit('start');

			var thens = context._spec.then;
			thens.forEach(function (t) {
				t(context, expect(runner, context));
			});

			runner.emit('end');
		}
	};

	['given', 'when', 'then'].forEach(function (f) {
		_machiatto[f] = function (name, fn) {
			addToContext(context, f, reusable(name, fn));
			return _machiatto;
		};
	});

	return _machiatto;
}

module.exports = machiatto;