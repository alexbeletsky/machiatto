var context = require('./context');

function ret(v) { return function () { return v; }; }

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

	// skip functions
	['xwhen', 'xand', 'xshould'].forEach(function (f) {
		_machiatto[f] = ret(_machiatto);
	});

	return _machiatto;
}

module.exports = machiatto;