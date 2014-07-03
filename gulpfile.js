/**
 * Module dependencies.
 */

var gulp = require('gulp');

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
      outputStyle: 'compressed',
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

gulp.task('default', ['css']);
