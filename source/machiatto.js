var EventEmitter = require('events').EventEmitter;
var Reporter = require('./reporters/dot');

function run(context, should, runner, test) {
	try {
		should(context);
	} catch (err) {
		return fail(err);
	}

	return pass();

	function pass() {
		runner.emit('pass', test);
	}

	function fail(err) {
		runner.emit('fail', test, err);
	}
}

function machiatto(specName) {
	var _ = {
		name: specName,
		whens: [],
		ands: [],
		shoulds: []
	};

	function prepareContext() {
		var context = {};

		_.whens.forEach(function (when) {
			when(context);
		});

		return context;
	}

	var _machiatto = {
		when: function (desc, fn) {
			fn && _.whens.push(fn);
			return this;
		},

		and: function (desc, fn) {
			fn && _.whens.push(fn);
			return this;
		},

		should: function (desc, fn) {
			fn && _.shoulds.push(fn);
			return this;
		},

		run: function () {
			var runner = new EventEmitter();
			var reporter = new Reporter(runner);

			runner.emit('start');

			_.shoulds.forEach(function (should) {
				var context = prepareContext();
				var test = {
					slow: function () {
						return 100;
					},

					fullTitle: function () {
						// TODO: fixme
						return specName;
					}
				};

				run(context, should, runner, test);
				runner.emit('test end');
			});

			runner.emit('end');
		}
	};

	return _machiatto;
}

module.exports = machiatto;