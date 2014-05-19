function expect(expected) {
	function assert(con, message) {
		if (con) {
			console.error(message);
		}
	}

	return function (provided) {
		expected = expected || provided;

		return {
			equal: function (actual) {
				assert(expected !== actual, 'expected: ' + expected + ' actual: ' + actual);
			}
		};
	};
}

function machiatto(spec) {
	var context = { _func: {} };

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
		fn(context, f === 'it' ? expect(context.results) : done);
	}

	var _machiatto = {};

	['given', 'when', 'it'].forEach(function (f) {
		_machiatto[f] = function (name, fn) {
			apply(f, reusable(name, fn));
			return _machiatto;
		};
	});

	return _machiatto;
}

module.exports = machiatto;