var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    less = require('gulp-less'),
    clean = require('gulp-clean'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),//
    concat = require('gulp-concat'),
    debug = require('gulp-debug'),
    changed= require('gulp-changed');

var option = {
    base: 'src'
};
var dist = 'dist';

gulp.task('clean', function() {
    gulp.src('dist/*',{read:false})
        .pipe(clean());
});



gulp.task('test', function () {
    gulp.src(['src/**/*.html'],option)
        .pipe(changed("dist",{extension:'.html'}))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }));
    gulp.src(['src/**/!(lessModules)/*.less'],option)
        .pipe(changed('dist',{extension:'.css'}))
        .pipe(less())
        .pipe(minifycss())
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({
            stream: true
        }));
    gulp.src(['src/style/**/*.!(less)'],option)
        .pipe(changed(dist))
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({
            stream: true
        }));
    gulp.src('src/**/*.js',option)
        .pipe(changed(dist,{extension:'.js'}))
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({
            stream: true
        }));
    gulp.src('src/images/**/*',option)
        .pipe(changed(dist))
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({
            stream: true
        }));
});



gulp.task('webserver', function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        ui: false,
        port: 8000
    });
    gulp.watch("src/**/*", ['test',function(){browserSync.reload({
        stream: true
    })}]);
});

gulp.task('default',['test','webserver']);