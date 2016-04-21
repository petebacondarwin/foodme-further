describe('fmRestaurantList controller', function() {
  var controller;
  beforeEach(module('app'));
  beforeEach(inject(function($componentController) {
    controller = $componentController('fmRestaurantList');
  }));

  it('should initialize controller properties', function() {
    expect(controller.sortProperty).toEqual('name');
    expect(controller.sortDirection).toEqual(false);
    expect(controller.filters).toEqual({ price: null, rating: null });
  });

  it('should request the restaurant data when the component is initialized', inject(function($httpBackend) {
    $httpBackend.expect('GET', 'assets/data/restaurants.json').respond([
      { id: 'test1', price: 1, rating: 3 },
      { id: 'test2', price: 2, rating: 4 },
      { id: 'test3', price: 3, rating: 5 }
    ]);
    controller.$onInit();
    $httpBackend.flush();
    expect(controller.restaurants).toEqual([
      { id: 'test1', price: 1, rating: 3 },
      { id: 'test2', price: 2, rating: 4 },
      { id: 'test3', price: 3, rating: 5 }
    ]);
    $httpBackend.verifyNoOutstandingExpectation();
  }));

  describe('sortBy', function() {
    it('should change the sortProperty to the new value', function() {
      controller.sortBy('price');
      expect(controller.sortProperty).toEqual('price');
    });
    it('should toggle the sortDirection if the sortProperty is the same', function() {
      controller.sortBy('name');
      expect(controller.sortProperty).toEqual('name');
      expect(controller.sortDirection).toEqual(true);
      controller.sortBy('name');
      expect(controller.sortProperty).toEqual('name');
      expect(controller.sortDirection).toEqual(false);
    });
    it('should reset the sortDirection if the sortProperty is different', function() {
      controller.sortBy('name');
      expect(controller.sortProperty).toEqual('name');
      expect(controller.sortDirection).toEqual(true);
      controller.sortBy('price');
      expect(controller.sortProperty).toEqual('price');
      expect(controller.sortDirection).toEqual(false);
    });
  });

  describe('getSortClass', function() {
    it('should return undefined if the passed property is not the current sortProperty', function() {
      expect(controller.getSortClass('price')).toBeUndefined();
    });
    it('should return a string of CSS classes if the passed property matches the current sortProperty', function() {
      expect(controller.getSortClass('name')).toEqual('glyphicon glyphicon-chevron-up');
    });
  });

  describe('filteredRestaurants', function() {

    beforeEach(inject(function($httpBackend) {
      $httpBackend.expect('GET', 'assets/data/restaurants.json').respond([
        { id: 'test1', price: 1, rating: 3 },
        { id: 'test2', price: 2, rating: 4 },
        { id: 'test3', price: 3, rating: 5 }
      ]);
      controller.$onInit();
      $httpBackend.flush();
    }));

    it('should be unfiltered initially', function() {
      expect(controller.filteredRestaurants).toEqual([
        { id: 'test1', price: 1, rating: 3 },
        { id: 'test2', price: 2, rating: 4 },
        { id: 'test3', price: 3, rating: 5 }
      ]);
    });

    it('should update when filters change', inject(function($rootScope) {
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

    it('should be unfiltered if the filters are cleared', inject(function($rootScope) {
      controller.filters.price = 2;
      controller.filters.rating = 4;
      $rootScope.$digest();
      expect(controller.filteredRestaurants).toEqual([
        { id: 'test2', price: 2, rating: 4 }
      ]);
      controller.filters.price = null;
      controller.filters.rating = null;
      $rootScope.$digest();
      expect(controller.filteredRestaurants).toEqual([
        { id: 'test1', price: 1, rating: 3 },
        { id: 'test2', price: 2, rating: 4 },
        { id: 'test3', price: 3, rating: 5 }
      ]);
    }));
  });
});