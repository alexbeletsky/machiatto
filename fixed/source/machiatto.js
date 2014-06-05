var context = require('./context');

function machiatto(suite) {
	var suites = [];

	var _machiatto = function (spec) {
		var _ = context(suite, spec);
		suites.push(_);

		return {
			when: function (desc, fn) {
				_.establish(desc, fn);
				return this;
			},

			and: function (desc, fn) {
				_.arrange(desc, fn);
				return this;
			},

			should: function (desc, fn) {
				_.assert(desc, fn);
				return this;
			},

			skip: function () {
				_.skip();
				return this;
			},

			only: function () {
				_.only();
				return this;
			},

			xwhen: function (desc) {
				return this.when(desc, 'noop');
			},

			xand: function (desc) {
				return this.and(desc, 'noop');
			},

			xshould: function (desc) {
				return this.should(desc, 'noop');
			}
		};
	};

	_machiatto._name = function () {
		return suite;
	};

	_machiatto._asserts = function () {
		return suites.reduce(function (asserts, suite) {
			asserts = asserts.concat(suite.asserts());
			return asserts;
		}, []);
	};

	return _machiatto;
}

module.exports = machiatto;