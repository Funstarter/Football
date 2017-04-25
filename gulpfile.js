const gulp = require('gulp');
const sass = require('gulp-sass');

/* Config */
paths = {
  sassSrcFile: 'src/scss/styles.scss',
  sassSrcFolder: 'src/scss/**/*.scss',
  sassDestFolder: 'public'
}


/* CSS build */
gulp.task('css', function () {
  gulp.src(paths.sassSrcFile)
  .pipe(sass())
  .pipe(gulp.dest(paths.sassDestFolder));
});


/* Watcher */
gulp.task('watch', function () {
  gulp.watch(paths.sassSrcFolder, ['css']);
})