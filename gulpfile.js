/**
 * Module dependencies.
 */

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');

var paths = {
  css: {
    input: './public/sass/**/*.scss',
    output: './public/css'
  }
};

/**
 * Gulp tasks.
 */

gulp.task('css', function() {
  return gulp.src(paths.css.input)
    .pipe(sass({
      sourceComments: 'map',
      sourceMap: 'src',
      errLogToConsole: true
    }))
    .pipe(autoprefixer({
      map: true,
      from: paths.css.input,
      to: paths.css.output
    }))
    // TODO: Fix the inline source map.
    //.pipe gulp-minify-css
    //.pipe gulp-rev
    .pipe(gulp.dest(paths.css.output));
});

gulp.task('watch', function() {
  gulp.watch(paths.css.input, ['css']);
});

gulp.task('default', ['css', 'watch']);
