describe('fmRestaurants controller', function() {
  var controller;

  beforeEach(module('app/restaurants/restaurants-view'));
  beforeEach(inject(function($componentController, localStorage) {
    localStorage['foodMe/user'] =
        '{ "name": "Test User", "address": "Test Address" }';
    controller = $componentController('fmRestaurantsView', {});
  }));

  it('should initialize controller properties', function() {
    expect(controller.deliveryFormVisible).toBe(true);
    expect(controller.user).toEqual(jasmine.any(Object));
    expect(controller.user).toEqual({ "name": "Test User", "address": "Test Address" });
  });

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
});