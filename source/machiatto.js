var context = require('./context');

function noop() {}

function machiatto(specName) {
	var specs = [];

	var _machiatto = function (suiteName) {
		var _ = context(specName, suiteName, noop);

		var spec = {
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

		specs.push(spec);

		return spec;
	};

	_machiatto.run = function (runner) {
		specs.forEach(function (spec) {
			spec.run(runner);
		});
	};

	return _machiatto;
}

module.exports = machiatto;