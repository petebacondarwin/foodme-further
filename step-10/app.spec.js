describe('AppController controller', function() {
  var controller;

  beforeEach(module('app'));

  beforeEach(inject(function($controller, localStorage) {
    localStorage['foodMe/user'] = '{ "name": "Test User", "address": "Test Address" }';
    controller = $controller('AppController', {});
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


describe('rating filter', function() {

  beforeEach(module('app'));

  var ratingFilter
  beforeEach(inject(function(_ratingFilter_) {
    ratingFilter = _ratingFilter_;
  }));

  it('should return a string of repeated symbols', function() {
    var value = ratingFilter(3, '*');
    expect(value).toEqual('***');
  });
});