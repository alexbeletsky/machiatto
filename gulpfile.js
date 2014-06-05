var exec = require('child_process').exec;
var gulp = require('gulp');

gulp.task('fix', function () {
	gulp.src('./bin/machiatto')
		.pipe(gulp.dest('./fixed/bin'));
	gulp.src('./source/*/**')
		.pipe(gulp.dest('./fixed/source'));
	gulp.src('./package.json')
		.pipe(gulp.dest('./fixed/'));
});

gulp.task('test', function (cb) {
	exec('./fixed/bin/machiatto', function (err, stdout, stderr) {
		console.log(stdout);
		cb(err);
	});
});

gulp.task('watch', function () {
	gulp.watch(['./bin/*', './source/**/*', './test/**/*'], ['test']);
});

gulp.task('default', ['test'], function () {
});
