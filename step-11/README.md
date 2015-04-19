# Step 11 - add detailed menu view

## Where are we?

An Angular application running from a local webserver;
with unit tests and e2e tests; and componentized routing

## Goals

* Refactor restaurant data management into a service

## Topics

* route resolves

## Tasks

* Create a `restaurantListPromise` service in the `restaurants` module

```js
.factory('restaurantListPromise', function($http) {

  // var url = 'https://foodme.firebaseio.com/.json'; // CORS enabled server
  var url = '../shared/data/restaurants.json'; // Local webserver

  return $http.get(url).then(function(response) {
    return response.data;
  });

})
```

* Add a resolve to the `/restaurants` route to inject the list of restaurants into the controller

```js
.config(function($routeProvider) {
  $routeProvider
    .when('/restaurants', {
      templateUrl: 'components/restaurants',
      controller: 'RestaurantsController as component',
      resolve: {
        restaurants: 'restaurantListPromise'
      }
    });
})
```

* Update the `RestaurantsController` to use this injected value

```js
.controller('RestaurantsController', function(restaurants, $rootScope) {

  var that = this;

  ...

  var filterRestaurants = function() {
    that.filteredRestaurants = [];
    angular.forEach(restaurants, function(restaurant) {
      if ( ( !that.filters.rating || restaurant.rating >= that.filters.rating ) &&
           ( !that.filters.price || restaurant.price <= that.filters.price ) ) {
        that.filteredRestaurants.push(restaurant);
      }
    });
  };

  $rootScope.$watchGroup([
      function() { return that.filters.price; },
      function() { return that.filters.rating; }
    ], filterRestaurants);
});
```

* Move the unit tests from the `RestaurantController` into `restaurantListPromise`

```js
describe('restaurantListPromise', function() {

  beforeEach(inject(function($httpBackend) {
    $httpBackend.when('GET', '../shared/data/restaurants.json').respond([
      { id: 'test1', price: 1, rating: 3 },
      { id: 'test2', price: 2, rating: 4 },
      { id: 'test3', price: 3, rating: 5 }
    ]);
  }));

  it('should return a promise to restaurant data', inject(function($httpBackend, restaurantListPromise) {
    var restaurants;

    restaurantListPromise.then(function(data) {
      restaurants = data;
    });

    $httpBackend.flush();

    expect(restaurants).toEqual([
      { id: 'test1', price: 1, rating: 3 },
      { id: 'test2', price: 2, rating: 4 },
      { id: 'test3', price: 3, rating: 5 }
    ]);
  }));
});
```

* Inject mock restaurant data directly into the `RestaurantsController` under test

```js
describe('RestaurantsController', function() {

  var controller, restaurants;

  beforeEach(inject(function($controller) {
    restaurants = [
      { id: 'test1', price: 1, rating: 3 },
      { id: 'test2', price: 2, rating: 4 },
      { id: 'test3', price: 3, rating: 5 }
    ];
    controller = $controller('RestaurantsController', { restaurants });
  }));

  ...

  describe('filteredRestaurants', function() {

    it('should initially contain the full list of restaurants', inject(function($rootScope) {
      $rootScope.$digest();
      expect(controller.filteredRestaurants).toEqual([
        { id: 'test1', price: 1, rating: 3 },
        { id: 'test2', price: 2, rating: 4 },
        { id: 'test3', price: 3, rating: 5 }
      ]);
    }));

    ...
  });
});
```

* Check that the unit tests still pass

```bash
$ karma start --single-run
```

* Check that the e2e tests still pass

```bash
$ protractor protractor.conf.js
```

## Extras

