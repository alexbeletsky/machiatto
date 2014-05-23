var context = require('./context');

function machiatto(specName) {
	var _ = context(specName);

	var _machiatto = {
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

		run: function (runner) {
			_.run(runner);
		}
	};

	return _machiatto;
}

module.exports = machiatto;