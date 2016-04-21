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
});