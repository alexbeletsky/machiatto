
var gulp = require('gulp');
var exec = require('gulp-exec');
var diff = require('gulp-diff').diff;
var reporter = require('gulp-diff').reporter;
var strip = require('gulp-strip-line');

gulp.task('approve', function () {
	gulp.src('./bin/machiatto')
		.pipe(exec('<%= file.path %>', {pipeStdout: true}))
		.pipe(strip(/\(\d+ ms\)/))
		.pipe(gulp.dest('./.approved'));
});

gulp.task('test', function (cb) {
	gulp.src('./bin/machiatto')
		.pipe(exec('<%= file.path %>', {pipeStdout: true}))
		.pipe(strip(/\(\d+ ms\)/))
		.pipe(diff('./.approved'))
		.pipe(reporter());
});

gulp.task('watch', function () {
	gulp.watch(['./bin/*', './source/**/*', './test/**/*'], ['test']);
});

gulp.task('default', ['test'], function () {
});
