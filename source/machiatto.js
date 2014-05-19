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

	return {
		given: function (name, fn) {
			if (fn) {
				context._func[name] = fn;
			} else {
				fn = context._func[name];
			}

			if (!fn) {
				throw new Error('no function');
			}

			fn(context);
			return this;
		},

		when: function (name, fn) {
			if (fn) {
				context._func[name] = fn;
			} else {
				fn = context._func[name];
			}

			if (!fn) {
				throw new Error('no function');
			}

			fn(context);
			return this;
		},

		it: function (name, fn) {
			fn(expect(context.results));
			return this;
		}
	};
}

module.exports = machiatto;