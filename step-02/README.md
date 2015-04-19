# Step 2 - more AppController unit tests

## Where are we?

A running Angular application running from a local webserver;
displaying a filterable, sortable list of restaurants and delivery info form;
with really simple unit tests for AppController.

## Goals

* Create more unit tests for `AppController` methods
* Use mocks to isolate unit test behaviour of `localStorage`
* Use `ngMock.$httpBackend` to test making server requests

## Topics

* Mocking services
* ngMock.$httpBackend
* $rootScope.$digest

## Tasks

* Add tests for AppController methods

```js
  describe('showDeliveryForm', function() {
    it('should set deliveryFormVisible to true', function() {
      controller.deliveryFormVisible = null;
      controller.showDeliveryForm();
      expect(controller.deliveryFormVisible).toBe(true);
    });
  });

  describe('hideDeliveryForm', function() {
    it('should set deliveryFormVisible to false', function() {
      controller.deliveryFormVisible = null;
      controller.hideDeliveryForm();
      expect(controller.deliveryFormVisible).toBe(false);
    });
  });
```

* Mock the `localStorage` object so that we can test the `user` object

```js
  beforeEach(inject(function($controller, localStorage) {
    localStorage['foodMe/user'] = '{ "name": "Test User", "address": "Test Address" }';
    controller = $controller('AppController', {});
  }));
```

* Test that the user object has been initialized correctly

```js
  it('should initialize controller properties', function() {
    ...
    expect(controller.user).toEqual({ "name": "Test User", "address": "Test Address" });
  });
```

* Mock the $http service to return test restaurant data for testing

```js
  beforeEach(inject(function($controller, localStorage, $httpBackend) {
    localStorage['foodMe/user'] = '{ "name": "Test User", "address": "Test Address" }';
    $httpBackend.when('GET', '../shared/data/restaurants.json').respond([
      { id: 'test1' },
      { id: 'test2' },
      { id: 'test3' }
    ]);
    controller = $controller('AppController', {});
  }));
```

* Flush the mock $http service to trigger the response and test the restaurants property on the controller

```js
  it('should attach the restaurant data when it arrives', inject(function($httpBackend) {
    $httpBackend.flush();
    expect(controller.restaurants).toEqual([
      { id: 'test1', price: 1, rating: 3 },
      { id: 'test2', price: 2, rating: 4 },
      { id: 'test3', price: 3, rating: 5 }
    ]);
  }));
```

* Modify the filters and test that the `filteredRestaurants` collection updates

```js
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
```

## Extras

* Test `AppController` `sortBy` and `getSortClass` methods