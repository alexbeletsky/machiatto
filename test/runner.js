var fork = require('child_process').fork;
var async = require('async');

var specs = [
	['--reporter', 'dot'],
	['--reporter', 'spec']
];

var specRunner = function (option) {
	return function (callback) {
		var args = option.concat('./test/specs');
		var proc = fork('./bin/machiatto', args);

		proc.on('exit', function (code, signal) {
			callback(null, code, signal);
		});
	};
};

async.series(specs.map(specRunner), function (err) {
	if (err) {
		console.log(err);
		process.exit(1);
	}

	process.exit(0);
});
