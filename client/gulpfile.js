/*global require*/
"use strict"
// gulp --type release

var gulp = require("gulp"),
	less = require('gulp-less'),
	uglify = require('gulp-uglify'),
	minifyCSS = require('gulp-minify-css'),
	concat = require("gulp-concat"),
	karma = require('gulp-karma'),
	path = require('path'),
	debug = require('gulp-filelog'),
	isMin = true;

function getLibs() {
	var min = isMin ? ".min" : "",
		excludeMin = isMin ? "" : "!libs/bower_components/**/*.min.*";

	return [
		'libs/bower_components/**/*' + min + '.js',

		'!libs/bower_components/bootstrap-material-design/scripts/**',
		'!libs/bower_components/bootstrap-material-design/Gruntfile.js',
		'!libs/bower_components/jquery/**',
		excludeMin
	];
}

var excludeMinified = isMin ? null : "!libs/bower_components/**/*.min.*",
	min = isMin ? ".min" : "";

var paths = {
	scripts: [
		'src/*/**.js',
		'src/**.js'
	],
	cssLibs: [
		"libs/**/*" + min + ".css",
		'!libs/bower_components/bootstrap-material-design/less/**'
	],
	less: [
		'css/*.less'
	]
};
if (excludeMinified) {
	paths.cssLibs.push(excludeMinified);
}


gulp.task("scripts", function () {
	var src = gulp.src(paths.scripts);
	if (isMin) {
		src = src.pipe(uglify());
	}
	src
		.pipe(concat("app.js"))
		.pipe(gulp.dest("build"));
});

gulp.task("js-libs", function () {
	gulp.src(getLibs())
		.pipe(debug("js-libs"))
		.pipe(concat("app.libs.js"))
		.pipe(gulp.dest("build"));
});

gulp.task("css-libs", function () {
	gulp.src(paths.cssLibs)
		.pipe(debug("csslibs---------------"))
		.pipe(concat("app.libs.css"))
		.pipe(gulp.dest("build"));
});

gulp.task("less", function () {
	var src = gulp.src(paths.less)
		.pipe(less({
			paths: [ path.join(__dirname, 'less', 'includes') ]
		}));

	if (isMin) {
		src = src.pipe(minifyCSS());
	}
	src
		.pipe(concat("app.css"))
		.pipe(gulp.dest('../build'));
});

gulp.task('watch', function () {
	gulp.watch(paths.scripts, ['scripts']);
	gulp.watch(paths.less, ['less']);
	gulp.watch(paths.cssLibs, ['css-libs']);
});

gulp.task('setup-min', function () {
	isMin = true;
});


gulp.task('run', ['scripts', 'less', 'js-libs', "css-libs"]);
gulp.task('min', ['setup-min', 'run']);
gulp.task('default', ['run', 'watch']);


