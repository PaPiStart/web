var gulp = require('gulp'),
    less = require('gulp-less'),
    minifycss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    browserSync = require('browser-sync'),
    changed = require('gulp-changed'),
    concat = require('gulp-concat');

var option = {
    base: 'src'
};
var dist = 'dist';

gulp.task('clean', function() {
    gulp.src('dist/*', { read: false })
        .pipe(clean());
});
gulp.task('source', function() {
    gulp.src(['src/*.html', 'src/views/**/*.html'], option)
        .pipe(changed("dist", { extension: '.html' }))
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({
            stream: true
        }));
    gulp.src(['src/views/**/*.less', 'src/style.less'], option)
        .pipe(changed(dist, { extension: '.css' }))
        .pipe(less())
        // .pipe(autoprefixer())
        .pipe(minifycss())
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({
            stream: true
        }));
    gulp.src(['src/style/main.less'], option)
        .pipe(changed(dist, { extension: '.css' }))
        .pipe(less())
        // .pipe(autoprefixer())
        .pipe(minifycss())
        .pipe(concat("default.css"))
        .pipe(gulp.dest(dist + "/style"))
        .pipe(browserSync.reload({
            stream: true
        }));
    gulp.src(['src/style/*.css'], option)
        .pipe(changed(dist, { extension: '.css' }))
        // .pipe(less())
        // .pipe(autoprefixer())
        // .pipe(minifycss())
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({
            stream: true
        }));
    gulp.src('src/style/mw-iconfont/*')
        .pipe(gulp.dest(dist + "/style/mw-iconfont"));
    gulp.src('src/**/*.js', option)
        .pipe(changed(dist, { extension: '.js' }))
        .pipe(uglify())
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({
            stream: true
        }));
    gulp.src('src/images/**/*', option)
        .pipe(changed(dist))
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({
            stream: true
        }));
    gulp.src(["src/lib/**/*.js", "src/main.js"], option)
        .pipe(changed(dist, { extension: '.js' }))
        .pipe(uglify())
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task('webserver', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        ui: false,
        port: 8000
    });
    gulp.watch("src/**/*", ['source', function() {
        browserSync.reload({
            stream: true
        })
    }]);
});
gulp.task('default', ['source', 'webserver']);
