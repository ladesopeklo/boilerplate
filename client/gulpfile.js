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
	isMin = false;

var excludeMin = isMin ? null : "!libs/bower_components/**/*.min.*",
	min = isMin ? ".min" : "",
	paths = {
		scripts: [
			'src/*/**.js',
			'src/**.js'
		],
		jsLibs: [
			'libs/bower_components/zepto/zepto.js',
			'libs/bower_components/**/*' + min + '.js',

//			'!libs/bower_components/bootstrap/js/*',
//			'!libs/bower_components/bootstrap/Grunt*',
//			'!libs/bower_components/bootstrap/grunt/*',
//			'!libs/bower_components/bootstrap/dist/js/npm.js',

			'!libs/bower_components/webcomponentsjs/webcomponents-lite.js',
			'!libs/bower_components/webcomponentsjs/ShadowDOM.js',
			'!libs/bower_components/webcomponentsjs/HTMLImports.js',
			'!libs/bower_components/webcomponentsjs/CustomElements.js',
			'!libs/bower_components/polymer/polymer.js',

			'!libs/bower_components/jquery/**'
		],
		cssLibs: [
			"libs/bower_components/*" + min + ".css",
			'!libs/bower_components/bootstrap-material-design/less/**'
		],
		less: [
			'css/*.less'
		]
	};
if (excludeMin) {
	paths.cssLibs.push(excludeMin);
	paths.jsLibs.push(excludeMin);
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
	gulp.src(paths.jsLibs)
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


