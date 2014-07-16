"use strict";

var context = require('./context');

function machiatto(suite) {
	var suites = [];
	var _ = context(suite);
	suites.push(_);

	var _machiatto = function() {

		return {
			_name: suite,

			_asserts: function() {
				return suites.reduce(function(asserts, suite) {
					return asserts.concat(suite.asserts());
				}, []);
			},

			when: function(desc, fn) {
				_.establish(desc, fn);
				return this;
			},

			and: function(desc, fn) {
				_.arrange(desc, fn);
				return this;
			},

			should: function(desc, fn) {
				var isCalled = false;
				_.assert(desc, function () {
					if (isCalled) {
						throw new Error('done() callback called multiple times');
					}
					isCalled = true;
					if (fn === 'noop') {
						return;
					}
					return fn.apply(this, arguments);
				});
				return this;
			},

			skip: function() {
				_.skip();
				return this;
			},

			only: function() {
				_.only();
				return this;
			},

			xwhen: function(desc) {
				return this.when(desc, 'noop');
			},

			xand: function(desc) {
				return this.and(desc, 'noop');
			},

			xshould: function(desc) {
				return this.should(desc, 'noop');
			}
		};
	};

	return _machiatto();
}

module.exports = machiatto;
