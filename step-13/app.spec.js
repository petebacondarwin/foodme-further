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


describe('NavigationController', function() {
  var controller;

  beforeEach(module('app'));
  beforeEach(inject(function($controller) {
    controller = $controller('NavigationController', {});
  }));

  describe('routeIs', function() {
    it('should return true if the current route matches the parameter', inject(function($location) {
      $location.path('/test-route');
      expect(controller.routeIs('/other-route')).toBe(false);
      expect(controller.routeIs('/test-route')).toBe(true);
    }));
  })
});


describe('rating filter', function() {

  beforeEach(module('app'));

  var ratingFilter
  beforeEach(inject(function(_ratingFilter_) {
    ratingFilter = _ratingFilter_;
  }));

  it('should return a trusted HTML string', inject(function($sce) {
    var trustedValue = ratingFilter(3, 'star');
    var realValue = $sce.getTrustedHtml(trustedValue);
    expect(realValue).toEqual(
      '<span class="glyphicon glyphicon-star"></span>' +
      '<span class="glyphicon glyphicon-star"></span>' +
      '<span class="glyphicon glyphicon-star"></span>'
    );
  }));
});