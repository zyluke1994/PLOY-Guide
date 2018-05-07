var gulp = require('gulp'),
    minify = require('gulp-minify'),
    cleanCSS = require('gulp-clean-css'),
    babel = require('gulp-babel');

gulp.task('default', [ 'minify-js', 'minify-css' ]);

gulp.task('minify-js', function() {
    gulp.src('src/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(minify({
            ext:{
                src:'-debug.js',
                min:'.js'
            }
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('minify-css', function () {
    return gulp.src('src/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist'));
});