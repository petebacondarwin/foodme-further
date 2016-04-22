describe('FmNavigation controller', function() {
  var controller;

  beforeEach(module('app/navigation/navigation'));
  beforeEach(inject(function($componentController) {
    controller = $componentController('fmNavigation', {});
  }));

  describe('routeIs', function() {
    it('should return true if the current route matches the parameter', inject(function($location) {
      $location.path('/test-route');
      expect(controller.routeIs('/other-route')).toBe(false);
      expect(controller.routeIs('/test-route')).toBe(true);
    }));
  })
});