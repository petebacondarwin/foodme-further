describe('fmDeliverTo module', function() {

  beforeEach(module('fmDeliverTo'));

  describe('FmDeliverToController', function() {

    beforeEach(inject(function($controller) {
      controller = $controller('FmDeliverToController', {});
    }));

    it('should initialize controller properties', function() {
      expect(controller.deliveryFormVisible).toBe(true);
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

  describe('fmDeliverTo directive', function() {
    var scope, element;

    beforeEach(module('fmDeliverTo.template.html'));

    beforeEach(inject(function($compile, $rootScope) {
      $rootScope.testUser = {
        name: 'Test Name',
        address: 'Test Address'
      };
      scope = $rootScope;
      element = $compile('<fm-deliver-to deliver-to="testUser"></fm-deliver-to>')($rootScope);
      $rootScope.$digest();
    }));


    it('should bind the user info to the form inputs', function() {
      var userNameInput = element[0].querySelector('input[ng-model="directive.user.name"]');
      expect(userNameInput.value).toEqual('Test Name');

      var userAddressInput = element[0].querySelector('input[ng-model="directive.user.address"]');
      expect(userAddressInput.value).toEqual('Test Address');
    });


    it('should bind the user info display boxes', function() {
      var displayBox = element[0].querySelector('.delivery-info-box');
      expect(displayBox.textContent).toContain('Test Name');
      expect(displayBox.textContent).toContain('Test Address');
    });


    it('should update the model given by the `deliver-to` expression when the inputs are changed', function() {
      var userNameInput = angular.element(element[0].querySelector('input[ng-model="directive.user.name"]'));
      userNameInput.val('Other Name');
      userNameInput.triggerHandler('change');
      expect(scope.testUser.name).toEqual('Other Name');

      var userAddressInput = angular.element(element[0].querySelector('input[ng-model="directive.user.address"]'));
      userAddressInput.val('Other Name');
      userAddressInput.triggerHandler('change');
      expect(scope.testUser.address).toEqual('Other Name');
    });

  });
});