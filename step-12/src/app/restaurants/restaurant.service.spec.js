describe('restaurantService', function() {
  beforeEach(module('app/restaurants/restaurant-service'));
  beforeEach(inject(function($httpBackend) {
    $httpBackend.when('GET', 'assets/data/restaurants.json').respond([
      { id: 'test1', price: 1, rating: 3 },
      { id: 'test2', price: 2, rating: 4 },
      { id: 'test3', price: 3, rating: 5 }
    ]);
  }));

  describe('load', function() {
    it('should request the restaurant data from the server', inject(function($httpBackend, restaurantService) {
      var loadSpy = jasmine.createSpy('load handler');
      restaurantService.load().then(loadSpy);
      $httpBackend.flush();
      expect(loadSpy).toHaveBeenCalledWith([
        { id: 'test1', price: 1, rating: 3 },
        { id: 'test2', price: 2, rating: 4 },
        { id: 'test3', price: 3, rating: 5 }
      ]);
    }));
  });

  describe('loadOne', function() {
    it('should filter the requested restaurant data from the server', inject(function($httpBackend, restaurantService) {
      var loadSpy = jasmine.createSpy('load handler');
      restaurantService.loadOne('test2').then(loadSpy);
      $httpBackend.flush();
      expect(loadSpy).toHaveBeenCalledWith({ id: 'test2', price: 2, rating: 4 });
    }));
  });
});