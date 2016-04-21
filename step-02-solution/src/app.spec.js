describe('AppController controller', function() {
  var controller;

  beforeEach(module('app'));
  beforeEach(inject(function($controller) {
    controller = $controller('AppController', {});
  }));

  it('should initialize controller properties', function() {
    expect(controller.deliveryFormVisible).toBe(true);
    expect(controller.user).toEqual(jasmine.any(Object));
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