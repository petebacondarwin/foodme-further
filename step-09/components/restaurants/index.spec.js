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