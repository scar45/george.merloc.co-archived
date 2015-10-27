'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var fileInclude = require("gulp-file-include");

gulp.task('html', function() {
    console.log("-- gulp is running task 'html'");
    gulp.src( './app/template/index.html' )
    .pipe( fileInclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe( gulp.dest('./app') );
});
gulp.task('sass', function () {
    console.log("-- gulp is running task 'sass'");
    gulp.src('./app/styles/**/*.scss')
    //.pipe(include())
    .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.', {includeContent: false, debug: true}))
    .pipe(gulp.dest('./app/styles'));
});

gulp.task('sass:watch', function () {
    console.log("-- gulp is running task 'sass:watch'");
    gulp.watch('./styles/**/*.scss', ['sass']);
});

// watch files for changes and reload
    console.log("-- gulp is running task 'serve'");
    gulp.task('serve', ['sass:watch','html'], function() {
    browserSync({
        server: {
            baseDir: 'app'
        }
    });
    gulp.watch(['./app/template/*.html','./app/template/partials/*.phtml'], ['html'], reload);
    gulp.watch(['./app/styles/**/*.scss'], ['sass']);
    gulp.watch(['*.html', 'styles/**/*.css', 'scripts/**/*.js'], {cwd: 'app'}, reload);
});