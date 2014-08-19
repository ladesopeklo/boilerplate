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
	isMin = false;

function getLibs() {
	var min = isMin ? ".min" : "";
	return [
		'libs/*' + min + '.js',
		"libs/mithril/mithril.min.js"
	];
}

var paths = {
	scripts: [
		'src/**.js',
	],
	cssLibs: [
		"libs/*.css"
	],
	less: [
		'css/*.less'
	]
};


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
		.pipe(concat("app.libs.js"))
		.pipe(gulp.dest("build"));
});

gulp.task("css-libs", function () {
	gulp.src(paths.cssLibs)
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


