describe('AppController controller', function() {
  var controller;

  beforeEach(module('app'));

  beforeEach(inject(function($controller, localStorage, $httpBackend) {
    localStorage['foodMe/user'] = '{ "name": "Test User", "address": "Test Address" }';
    $httpBackend.when('GET', '../shared/data/restaurants.json').respond([
      { id: 'test1', price: 1, rating: 3 },
      { id: 'test2', price: 2, rating: 4 },
      { id: 'test3', price: 3, rating: 5 }
    ]);
    controller = $controller('AppController', {});
  }));

  it('should initialize controller properties', function() {
    expect(controller.deliveryFormVisible).toBe(true);
    expect(controller.user).toEqual(jasmine.any(Object));
    expect(controller.sortProperty).toEqual('name');
    expect(controller.sortDirection).toBe(false);
    expect(controller.filters).toEqual({ price: null, rating: null});
    expect(controller.user).toEqual({ "name": "Test User", "address": "Test Address" });
  });

  it('should attach the restaurant data when it arrives', inject(function($httpBackend) {
    $httpBackend.flush();
    expect(controller.restaurants).toEqual([
      { id: 'test1', price: 1, rating: 3 },
      { id: 'test2', price: 2, rating: 4 },
      { id: 'test3', price: 3, rating: 5 }
    ]);
  }));

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


describe('rating filter', function() {

  beforeEach(module('app'));

  var ratingFilter
  beforeEach(inject(function(_ratingFilter_) {
    ratingFilter = _ratingFilter_;
  }));

  it('should return a trusted HTML string', inject(function() {
    var value = ratingFilter(3, '*');
    expect(value).toEqual('***');
  }));
});