# Step 13 - create custom component directive

## Where are we?

An Angular application running from a local webserver;
with unit tests and e2e tests; and componentized routing

## Goals

* Refactor the delivery info form and display box into a reusable `fmDeliverTo` directive
* Use `fmDeliverTo` in different places in the restaurant list and menu views

## Topics

* Directives
* Isolated Scope
* Testing Directives
* karma-ng-html2js-preprocessor

## Tasks

* Define `fmDeliverTo` module with `fmDeliverTo` directive in `fmDeliverTo.js`

```js
angular.module('fmDeliverTo', [])

.directive('fmDeliverTo', function() {
  return {
    restrict: 'E',
    templateUrl: 'fmDeliverTo.template.html',
    controller: 'FmDeliverToController as directive',
    bindToController: {
      user: '=deliverTo'
    },
    scope: {}
  };
});
```

* Move the fmDeliverTo logic from the `AppController` into a new `FmDeliverToController`

```js
.controller('FmDeliverToController', function() {

  this.deliveryFormVisible = true;

  this.showDeliveryForm = function() {
    this.deliveryFormVisible = true;
  };

  this.hideDeliveryForm = function() {
    this.deliveryFormVisible = false;
  };
})
```

* Move the fmDeliverTo HTML from the `index.html` file to the `fmDeliverTo.template.html` file

```html
<!-- Delivery Info Form -->
<div class="row delivery-info-form" ng-show="directive.deliveryFormVisible">
  <div class="col-md-12">
    <form role="form" class="well" name="directive.deliveryForm">
      <a href="" class="pull-right" ng-click="directive.hideDeliveryForm()">Hide</a>
      <legend>Delivery Details</legend>
      <div class="form-group" ng-class="{'has-error': directive.deliveryForm.userName.$invalid}">
        <label for="customerName" class="control-label">Name</label>
        <input type="text" id="customerName" class="form-control" ng-model="directive.user.name" name="userName" required ng-minlength="5">
      </div>
      <div ng-messages="directive.deliveryForm.userName.$error">
        <div ng-message="required" class="alert alert-warning" role="alert">You must enter a name.</div>
        <div ng-message="minlength" class="alert alert-warning" role="alert">Your name must be at least 5 characters long.</div>
      </div>
      <div class="form-group" ng-class="{'has-error': directive.deliveryForm.userAddress.$invalid}">
        <label for="address" class="control-label">Address</label>
        <input type="text" id="address" class="form-control" ng-model="directive.user.address" name="userAddressInput" required ng-minlength="10">
      </div>
      <div ng-messages="directive.deliveryForm.userAddress.$error">
        <div ng-message="required" class="alert alert-warning" role="alert">You must enter an address.</div>
        <div ng-message="minlength" class="alert alert-warning" role="alert">Your address must be at least 10 characters long.</div>
      </div>
    </form>
  </div>
</div>


<!-- Delivery Info -->
<div class="row delivery-info-box" ng-hide="directive.deliveryFormVisible">
  <div class="col-md-12">
    <div class="well">
      <a href="" class="pull-right" ng-click="directive.showDeliveryForm()">Change</a>
      <strong>Deliver to:</strong><br>
      <span>{{ directive.user.name }}</span><br>
      <span>{{ directive.user.address }}</span>
    </div>
  </div>
</div>
```

* Move the unit test logic from the `AppController` spec to the `FmDeliverToController` spec

```js
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
});
```

* Install the Karma HTML to JavaScript preprocessor to help with testing the directive

```bash
npm install karma-ng-html2js-preprocessor --save-dev
```

* Update the karma config for this HTML to JavaScript preprocessor

```js
preprocessors: {
  '**/*.template.html': ['ng-html2js']
},


ngHtml2JsPreprocessor: {
},
```

* Write unit tests for the fmDeliverTo directive, loading the module containing the template

```js
describe('fmDeliverTo module', function() {

  beforeEach(module('fmDeliverTo'));

  ...

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
```

* Check that the unit tests still pass

```bash
$ karma start --single-run
```

* Use the `fmDeliverTo` directive in the left side bar of the restaurant list view

```html
<!-- Restaurant List -->
<div class="col-md-3">
  <fm-deliver-to deliver-to="app.user"></fm-deliver-to>

  <form role="form" class="well" name="component.filterForm">
    <legend>Filter Restaurants</legend>
...
```

* Use the `fmDeliverTo` directive in the right side bar of the menu view

```html
<div class="col-md-4">
  <fm-deliver-to deliver-to="app.user"></fm-deliver-to>

  <div class="fm-panel fm-cart">
    <div class="fm-heading">Your order</div>
    <div class="fm-content">
      <div class="fm-restaurant">{{ component.restaurant.name }}</div>

    </div>
  </div>
</div>
```

* Update the `HomePage` Protractor page object for the new user bindings

Rename the `app.user.name`, `app.hideDeliveryForm` and `app.showDeliveryForm` expressions
with `directive.user.name`, `directive.hideDeliveryForm` and `directive.showDeliveryForm` expressions
respectively.

* Check that the e2e tests still pass

```bash
$ protractor protractor.conf.js
```


## Extras

* Update the e2e test that demonstrates navigating to a menu, if you wrote one
