# Step 5 - Add routing

## Where are we?

An Angular application running from a local webserver;
with unit tests

## Goals

* Implement routing to enable multiple URL driven views
* Move the current HTML into a new view

## Topics

* ngRoute
* $routeProvider

## Tasks

* Load the `../js/angular-route.js` file

```html
  <script src="../shared/js/angular-route.js"></script>
```

* Add the `ngRoute` module as a dependency of our `app` module

```js
angular.module('app', ['ngMessages', 'ngMessageFormat', 'ngRoute', 'localStorage', 'rating'])
```

* Add the `angular-route.js` file to the files to load in the karma config

```js
    files: [
      '../shared/js/angular.js',
      '../shared/js/angular-messages.js',
      '../shared/js/angular-message-format.js',
      '../shared/js/angular-route.js',
      '../shared/js/angular-mocks.js',
      '*.js'
    ],
```

* Create a new `components/restaurants/index.html` template for the current HTML

Copy the restaurant filtering form and the restaurant list HTMl from index.html

```html
<!-- Restaurant List -->
<div class="row">
  <div class="col-md-3">
    <form role="form" class="well" name="app.filterForm">
      <legend>Filter Restaurants</legend>
      ...
    </form>
  </div>
  <div class="col-md-9">
    <div class="alert alert-info" role="alert">
    {{ app.filteredRestaurants.length, plural,
      =0 {No restaurants found!}
      =1 {Only one restaurant found!}
      other {# restaurants found.}
    }}
    </div>
    <table class="table table-striped">
      ...
    </table>
  </div>
</div>
```

* Remove the restaurant specific HTML from index.html and replace with an `ng-view` directive

```html
<ng-view autoscroll></ng-view>
```

* Configure the application to display this component when we navigate to the root of the application

```js
.config(function($routeProvider) {
  $routeProvider
    .when('/restaurants', {
      templateUrl: 'components/restaurants'
    })
    .otherwise('/restaurants');
})
```

* Check that the karma tests still pass

```bash
$ karma start --single-run
```