var fork = require('child_process').fork;
var async = require('async');

var options = [ ['--reporter', 'Dot'], ['--reporter', 'Spec']];
var specRunner = function (option) {
	return function (callback) {
		var args = option.concat('./test/specs');
		var proc = fork('./bin/machiatto', args);

		proc.on('exit', function (code, signal) {
			callback(null, code, signal);
		});
	};
};

async.series(options.map(specRunner), function (err) {
	if (err) {
		console.log(err);
		process.exit(1);
	}

	process.exit(0);
});
