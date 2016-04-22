# Step 10 - add animated navigation indicators

## Where are we?

An Angular application running from a local webserver;
with unit tests and e2e tests; and componentized routing

## Goals

* Add CSS classes to show which is the currently selected route
* Use ngAnimate to animate these class changes with CSS transitions

## Topics

* ngClass
* ngAnimate
* CSS transitions

## Tasks

* Create a `NavigationController` in app.js, which provides `routeIs()` helper

```js
.controller('NavigationController', function($location) {

  this.routeIs = function(routeName) {
    return $location.path() === routeName;
  };

});
```

* Add unit tests for this controller to app.spec.js

```js
describe('NavigationController', function() {
  var controller;

  beforeEach(module('app'));
  beforeEach(inject(function($controller) {
    controller = $controller('NavigationController', {});
  }));

  describe('routeIs', function() {
    it('should return true if the current route matches the parameter', inject(function($location) {
      $location.path('/test-route');
      expect(controller.routeIs('/other-route')).toBe(false);
      expect(controller.routeIs('/test-route')).toBe(true);
    }));
  })
});
```

* Check that the unit tests still pass

```bash
$ karma start --single-run
```


* Add this controller to the navigation bar using `ng-controller`

```html
  <!-- Navigation Bar -->
  <div class="navbar navbar-default" ng-controller="NavigationController as nav">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand" href="#/">FoodMe</a>
      </div>
      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <li ng-class="{active: nav.routeIs('/restaurants')}"><a href="#/">Home</a></li>
          <li ng-class="{active: nav.routeIs('/how-it-works')}"><a href="#/how-it-works">How it works</a></li>
          <li ng-class="{active: nav.routeIs('/about-us')}"><a href="#/about-us">Who we are</a></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li ng-class="{active: nav.routeIs('/help')}"><a href="#/help">Help</a></li>
        </ul>
      </div>
    </div>
  </div>
```

* Load `angular-animate.js` in index.html

```html
  <script src="../node_modules/angular-animate/angular-animate.js"></script>
```

* Add `ngAnimate` as a dependency of the `app` module

```js
angular.module('app', ['ngMessages', 'ngMessageFormat', 'ngRoute', 'ngAnimate',
                       'localStorage', 'rating', 'restaurants'])
```

* Note that the shared/css/app.css file has relevant CSS transition styles

```css
.navbar-nav > li, .navbar-nav > li > a {
  transition: 0.5s ease-out all;
}

.navbar-nav > li.active-add-active a {
  background-color: white !important;
}
```

* Add `angular-animate.js` to the Karma config

```js
files: [
  '../node_modules/angular/angular.js',
  '../node_modules/angular-messages/angular-messages.js',
  '../node_modules/angular-message-format/angular-message-format.js',
  '../node_modules/angular-route/angular-route.js',
  '../node_modules/angular-animate/angular-animate.js',
  '../node_modules/angular-mocks/angular-mocks.js',
  '*.js',
  'components/*/*.js'
],
```

* Check that the unit tests still pass

```bash
$ karma start --single-run
```


## Extras

* Define your own transitions for the navigation
* Define CSS classes to animate the restaurant list changing as it is filtered