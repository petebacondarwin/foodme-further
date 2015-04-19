describe('restaurants', function() {

  beforeEach(module('restaurants'));


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

    it('should initialize controller properties', function() {
      expect(controller.sortProperty).toEqual('name');
      expect(controller.sortDirection).toBe(false);
      expect(controller.filters).toEqual({ price: null, rating: null});
    });

    describe('filteredRestaurants', function() {

      it('should initially contain the full list of restaurants', inject(function($rootScope) {
        $rootScope.$digest();
        expect(controller.filteredRestaurants).toEqual([
          { id: 'test1', price: 1, rating: 3 },
          { id: 'test2', price: 2, rating: 4 },
          { id: 'test3', price: 3, rating: 5 }
        ]);
      }));

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