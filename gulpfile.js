var gulp = require('gulp'),
    del = require('del'),
    combiner = require('stream-combiner2'),
    runSequence = require('run-sequence'),
    includeSources = require("gulp-include-source"),
    sourcemaps = require('gulp-sourcemaps'),
    fileInclude = require("gulp-file-include"),
    cssmin = require("gulp-cssmin"),
    sass = require('gulp-sass'),
    jquery = require('gulp-jquery'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

var config = {
    paths: {
        html: {
            src:  "src/**/*.html",
            dest: "build"
        },
        javascript: {
            src:  ["src/js/**/*.js"],
            dest: "build/js"
        },
        css: {
            src: ["src/css/**/*.css"],
            dest: "build/css"
        },
        images: {
            src: ["src/images/**/*.jpg", "src/images/**/*.jpeg", "src/images/**/*.png"],
            dest: "build/images"
        },
        less: {
            src: ["src/less/**/*.less", "!src/less/includes/**"],
            dest: "build/css"
        },
        bower: {
            src: "bower_components",
            dest: "build/lib"
        },
        verbatim: {
            src: ["src/manifest.json", "src/favicon.png"],
            dest: "build"
        }
    }
};

gulp.task('clean', function() {
    return del('./build');
});


gulp.task('html', function() {
    runSequence('page-home','page-portfolio');
});

gulp.task('page-home', function() {
    return gulp.src( './sauce/template/index.html' )
    .pipe( fileInclude({
        prefix: '@@',
        basepath: '@file',
        context: {
            name: 'activeNav'
        }
    }))
    .pipe( includeSources({cwd: 'build/'}) )
    .pipe(gulp.dest('./build/'));
});

gulp.task('page-portfolio', function() {
    return gulp.src( './sauce/template/portfolio.html' )
    .pipe( fileInclude({
        prefix: '@@',
        basepath: '@file',
        context: {
            name: 'activeNav'
        }
    }))
    .pipe( includeSources({cwd: 'build/'}) )
    .pipe(gulp.dest('./build/'));
});

gulp.task('images', function() {
    // Quick 5s delay to let Gimp/editor finish writing the image
    setTimeout(function() {
        gulp.src(['sauce/images/*.jpg', './sauce/images/*.png'])
            .pipe(imagemin({ progressive: true }))
            .pipe(gulp.dest('./build/images'));
    }, 5000);
});

gulp.task('sass', function () {
    gulp.src('./sauce/css/**/*.scss')
    .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.', {includeContent: false, debug: true}))
    .pipe(gulp.dest('./build/css/'));
});

gulp.task('sassNoMap', function () {
    gulp.src('./sauce/css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/css/'));
});

gulp.task('scripts', ['jquery'], function() {
    var combined = combiner.obj([
        gulp.src("./sauce/js/gm.js"),
        //uglify(),
        //rename({ extname: '.min.js' }),
        gulp.dest("./build/js"),

        // TODO: Look into why sourcemap is not generated
        sourcemaps.init( {loadmaps: false} ),
            gulp.dest("./build/js"),
        sourcemaps.write('.', {includeContent: false, debug: true})
    ]);
    combined.on('error', console.error.bind(console));

    return combined;
});

gulp.task('jquery', function () {
    return jquery.src({
        release: 2, //jQuery v1 or v2
        flags: ['-deprecated', '-event/alias', '-ajax/script', '-ajax/jsonp', '-exports/global']
    })
    // creates ./build/js/vendor/jquery.custom.js
    .pipe(gulp.dest('./build/js/vendor/'));
});

gulp.task('watch', function () {
    gulp.watch(['sauce/images/**/*.jpg', 'sauce/images/**/*.png'], ['images']);
    gulp.watch(['sauce/css/**/*.scss'], ['sass']);
    gulp.watch(['sauce/template/*.html', 'sauce/template/partials/*.phtml'], ['html']);
});

// Main task to run during development -- starts a server and watches for changes
gulp.task('liveCoding', ['sass', 'images', 'scripts', 'html', 'watch'], function() {
    browserSync({
        server: {
            baseDir: './build'
        }
    });
    // Refreshes the dev URL
    gulp.watch(['build/css/**/*.css', 'build/js/**/*.js', 'build/images/**/*.jpg', 'build/images/**/*.png', 'build/**/*.html'], reload);
});

gulp.task('release', ['clean'], function() {

    // Note that run-sequence may be deprecated once gulp 4.0 is released with magic
    //      support for defining task dependencies in series or in parallel.
    runSequence('sassNoMap', 'images', 'scripts', 'html');
});
