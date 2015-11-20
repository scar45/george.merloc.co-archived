var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    concat = require("gulp-concat"),
    del = require('del'),
    fileInclude = require("gulp-file-include"),
    imagemin = require('gulp-imagemin'),
    includeSources = require("gulp-include-source"),
    minifyHTML = require("gulp-minify-html"),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify');

var config = {
    paths: {
        html: {
            src:  "sauce/template/**/*.html",
            partialsrc:  "sauce/template/partials/**/*.phtml",
            dest: "build"
        },
        javascript: {
            src:  "sauce/js/**/*.js",
            dest: "build/js",
            vendorSrc: ["bower_components/jquery/dist/jquery.min.js","bower_components/pushy/js/pushy.min.js"],
            vendorDest: "build/js/vendor/"
        },
        images: {
            src: ["sauce/images/**/*.jpg", "sauce/images/**/*.jpeg", "sauce/images/**/*.png"],
            dest: "build/images"
        },
        css: {
            src: ["build/css/**/*.css"],
            dest: "build/css"
        },
        sass: {
            src: ["sauce/sass/**/*.scss", "sauce/sass/includes/**/*.scss"],
            dest: "build/css"
        },
        untouched: {
            src: "sauce/favicon.png",
            dest: "build",
            fontSrc: "sauce/fonts/**/*",
            fontDest: "build/fonts"
        }
    }
};

gulp.task('clean', function() {
    return del('./build');
});

gulp.task("untouched", function(){
    gulp.src(config.paths.untouched.src)
        .pipe(gulp.dest(config.paths.untouched.dest));
    gulp.src(config.paths.untouched.fontSrc)
        .pipe(gulp.dest(config.paths.untouched.fontDest));
    gulp.src(config.paths.javascript.vendorSrc)
        .pipe(gulp.dest(config.paths.javascript.vendorDest));
});

// Production release should have CSS processed/minified
//
//gulp.task('html', ['css', 'scripts', 'images'], function() {
gulp.task('html', ['sass', 'scripts', 'images'], function() {
    return gulp.src(config.paths.html.src)
        .pipe( fileInclude({
            prefix: '@@',
            basepath: '@file',
            context: {
                name: 'activeNav'
            }
        }))
        .pipe(includeSources({cwd: 'build/'}))
        .pipe(minifyHTML())
        .pipe(gulp.dest(config.paths.html.dest));
});

gulp.task('css', ['sass'], function () {
    return gulp.src(config.paths.css.src)
        .pipe(concat("gm.min.css"))
        .pipe(minifyCss())
        .pipe(gulp.dest(config.paths.css.dest))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', function () {
    return gulp.src(config.paths.sass.src)
        .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.paths.sass.dest))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', function() {
    return gulp.src(config.paths.javascript.src)
        .pipe(sourcemaps.init())
            .pipe(concat("gm.min.js"))
            .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.paths.javascript.dest));
});

gulp.task('images', function() {
    // Quick 5s delay to let Gimp/editor finish writing the image
    setTimeout(function() {
        return gulp.src(config.paths.images.src)
            .pipe(imagemin({
                progressive: true
            }))
            .pipe(gulp.dest(config.paths.images.dest));
    }, 5000);
});

gulp.task('liveCoding', function() {
    // Quick 3s delay to allow all tasks to complete
    setTimeout(function() {
        browserSync({
            server: {
                baseDir: './build'
            },
            reloadDelay: 1000
        });
    }, 3000);

});

gulp.task('build', ['untouched', 'html']);

gulp.task('default', ['build', 'liveCoding'], function(){
    gulp.watch([config.paths.html.src, config.paths.html.partialsrc], ['html', browserSync.reload]);
    gulp.watch(config.paths.sass.src, ['sass', browserSync.reload]);
    gulp.watch(config.paths.javascript.src, ['scripts', browserSync.reload]);
    gulp.watch(config.paths.images.src, ['images', browserSync.reload]);
    gulp.watch(config.paths.untouched.src, ['untouched', browserSync.reload]);
});
