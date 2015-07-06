# Step 9 - Move restaurant logic into component

## Where are we?

An Angular application running from a local webserver;
with unit tests and e2e tests; and routing

## Goals

* Move restaurants route config and logic into its own module

## Topics

* $routeProvider

## Tasks

* Create a `restaurants` module in `components/restaurants/index.js`

```js
angular.module('restaurants', [])

```

* Load this new `index.js` file in index.html

```html
  <script src="components/restaurants/index.js"></script>
```

* Add the `restaurants` module as dependency of the `app` module

```js
angular.module('app', ['ngMessages', 'ngMessageFormat', 'ngRoute',
                       'localStorage', 'rating', 'restaurants'])

```

* Add a new `RestaurantsController` to the `restaurants` module

```js
.controller('RestaurantsController', function($http, $rootScope) {

  var that = this;
  // var url = 'https://foodme.firebaseio.com/.json'; // CORS enabled server
  var url = '../shared/data/restaurants.json'; // Local webserver

  $http.get(url).then(function(response) {
    that.restaurants = response.data;
  });


  this.sortProperty = 'name';
  this.sortDirection = false;

  this.sortBy = function(property) {
    if ( this.sortProperty === property ) {
      this.sortDirection = !this.sortDirection;
    } else {
      this.sortProperty = property;
      this.sortDirection = false;
    }
  };

  this.getSortClass = function(property) {
    if ( this.sortProperty === property ) {
      return 'glyphicon glyphicon-chevron-' + (this.sortDirection ? 'down' : 'up');
    }
  };

  this.filters = {
    price: null,
    rating: null
  };

  var filterRestaurants = function() {
    that.filteredRestaurants = [];
    angular.forEach(that.restaurants, function(restaurant) {
      if ( ( !that.filters.rating || restaurant.rating >= that.filters.rating ) &&
           ( !that.filters.price || restaurant.price <= that.filters.price ) ) {
        that.filteredRestaurants.push(restaurant);
      }
    });
  };

  $rootScope.$watchGroup([
      function() { return that.filters.price; },
      function() { return that.filters.rating; },
      function() { return that.restaurants; }
    ], filterRestaurants);
});
```

* Remove this logic from the `AppController`

* Move the `restaurants` route config into the `restaurants` module and load the new controller

```js
angular.module('restaurants', [])

.config(function($routeProvider) {
  $routeProvider
    .when('/restaurants', {
      templateUrl: 'components/restaurants',
      controller: 'RestaurantsController as component'
    });
})
```

* Update the restaurants view to use the new `RestaurantsController`

(Replace all instances of `app.` with `component.`)

```html
  <form role="form" class="well" name="component.filterForm">
  ...
    <fm-rating id="priceFilter" rating="component.filters.price" glyph="gbp"></fm-rating>
  ...
    <th><a href ng-click="component.sortBy('name')">Name <span ng-class="component.getSortClass('name')">
  ...
```

* Update the Protractor HomePage PageObject to reference this new controller

```js
  getRestaurantList: function(column) {
    var repeater = by.repeater('restaurant in component.filteredRestaurants');
    if (column) {
      repeater = repeater.column(column);
    }
    return element.all(repeater);
  }
```

* Check that the protractor tests still pass

```bash
$ protractor protractor.conf.js
```

* Move the restaurant specific unit tests from the `AppController` into the `RestaurantsController`

```js
describe('restaurants', function() {

  beforeEach(module('restaurants'));

  describe('RestaurantsController', function() {

    var controller;

    beforeEach(inject(function($controller, $httpBackend) {
      $httpBackend.when('GET', '../shared/data/restaurants.json').respond([
        { id: 'test1', price: 1, rating: 3 },
        { id: 'test2', price: 2, rating: 4 },
        { id: 'test3', price: 3, rating: 5 }
      ]);
      controller = $controller('RestaurantsController', {});
    }));

    it('should initialize controller properties', function() {
      expect(controller.sortProperty).toEqual('name');
      expect(controller.sortDirection).toBe(false);
      expect(controller.filters).toEqual({ price: null, rating: null});
    });

    it('should attach the restaurant data when it arrives', inject(function($httpBackend) {
      $httpBackend.flush();
      expect(controller.restaurants).toEqual([
        { id: 'test1', price: 1, rating: 3 },
        { id: 'test2', price: 2, rating: 4 },
        { id: 'test3', price: 3, rating: 5 }
      ]);
    }));


    describe('filteredRestaurants', function() {

      beforeEach(inject(function($httpBackend) {
        $httpBackend.flush();
      }));

      it('should contain the full list after the restaurants have loaded', function() {
        expect(controller.filteredRestaurants).toEqual([
          { id: 'test1', price: 1, rating: 3 },
          { id: 'test2', price: 2, rating: 4 },
          { id: 'test3', price: 3, rating: 5 }
        ]);
      });

      it('should update the list when the filters change', inject(function($rootScope) {
        controller.filters.price = 2;
        $rootScope.$digest();
        expect(controller.filteredRestaurants).toEqual([
          { id: 'test1', price: 1, rating: 3 },
          { id: 'test2', price: 2, rating: 4 }
        ]);

        controller.filters.rating = 4;
        $rootScope.$digest();
        expect(controller.filteredRestaurants).toEqual([
          { id: 'test2', price: 2, rating: 4 }
        ]);
      }));
    });
  });
})
```

* Update the karma config to load these new files

```js
    files: [
      '../shared/js/angular.js',
      '../shared/js/angular-messages.js',
      '../shared/js/angular-message-format.js',
      '../shared/js/angular-route.js',
      '../shared/js/angular-mocks.js',
      '*.js',
      'components/*/*.js'
    ],
```


## Extras

* Try moving the config for the static views into their own modules