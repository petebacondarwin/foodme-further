# Step 14 - add injection annotations

## Where are we?

An Angular application running from a local webserver;
with unit tests and e2e tests; reusable directives and componentized routing

## Goals

* Add injection annotations to prevent minification issues

## Topics

* ng-annotate
* gulp
* gulp-ng-annotate

## Tasks

* Install `gulp` and `gulp-ng-annotate`

``bash
$ npm install -g gulp
$ npm install --save-dev gulp gulp-ng-annotate
```

* Create a gulp build file to add the annotation adder

```js
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
      'components/*/*.js',
      '!protractor.conf.js',
      '!gulpFile.js',
      '!karma.cong.js'
      ])
      .pipe(ngAnnotate(annotateOptions))
      .pipe(gulp.dest('.'));
});
```

* Run the `default` gulp task

```bash
$ gulp
```

* Add `ng-strict-di` directive to ensure all components are correctly annotated

```html
<body class="container" ng-app="app" ng-strict-di ng-controller="AppController as app">
```
