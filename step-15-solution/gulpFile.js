var gulp = require('gulp');
var ngAnnotate = require('gulp-ng-annotate');

var annotateOptions = {
    remove: true,
    add: true,
    single_quotes: true
};

gulp.task('default', function () {
    return gulp.src([
      '*.js',
      '**/*.js',
      '!protractor.conf.js',
      '!gulpFile.js',
      '!karma.conf.js'
      ])
      .pipe(ngAnnotate(annotateOptions))
      .pipe(gulp.dest('.'));
});