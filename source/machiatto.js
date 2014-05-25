var context = require('./context');

function noop() {}

function machiatto(suite) {
	var suites = [];

	var _machiatto = function (spec) {
		var _ = context(suite, spec, noop);

		var _suite = {
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

			xwhen: function (desc) {
				return this.when(desc, noop);
			},

			xand: function (desc) {
				return this.and(desc, noop);
			},

			xshould: function (desc) {
				return this.should(desc, noop);
			},

			run: function (runner) {
				_.run(runner);
			}
		};

		suites.push(_suite);

		return _suite;
	};

	_machiatto.run = function (runner) {
		runner.emit('suite', {title: suite});

		suites.forEach(function (spec) {
			spec.run(runner);
		});

		runner.emit('suite end');
	};

	return _machiatto;
}

module.exports = machiatto;