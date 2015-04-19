describe('AppController controller', function() {
  var controller;

  beforeEach(module('app'));

  beforeEach(inject(function($controller) {
    controller = $controller('AppController', {});
  }));

  it('should initialize controller properties', function() {
    expect(controller.deliveryFormVisible).toBe(true);
    expect(controller.user).toEqual(jasmine.any(Object));
    expect(controller.sortProperty).toEqual('name');
    expect(controller.sortDirection).toBe(false);
  });
});
