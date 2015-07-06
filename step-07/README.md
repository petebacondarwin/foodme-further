# Step 7 - End to End (e2e) testing with Protractor

## Where are we?

A unit-tested Angular application running from a local webserver

## Goals

* Ensure protractor is installed
* Configure a protractor test config
* Create and run initial e2e tests

## Topics

* Protractor

## Tasks

* Install protractor and webdriver

```bash
$ npm install -g protractor
$ webdriver-manager update
```

* Ensure that the http server is running in the root of the repository

```bash
$ cd foodme-further
$ http-server
```

* Create protractor.conf.js in the step folder

```js
var path = require('path');
var stepPath = path.basename(__dirname);

exports.config = {
  specs: ['e2e/*.spec.js'],
  baseUrl: 'http://localhost:8080/' + stepPath + '/',
  directConnect: true
};
```

* Exclude the `protractor.conf.js` from the karma config

```js
    // list of files to exclude
    exclude: [
      'protractor.conf.js'
    ],
```

* Create `e2e/app.spec.js` protractor spec file

```js
describe('app', function() {

  beforeEach(function() {
    browser.get('index.html');
  });

  it('should update the delivery info box when the deliveryForm is changed', function() {

    var userNameInput = element(by.model('app.user.name'));
    userNameInput.clear();
    userNameInput.sendKeys('test user');

    var hideDeliveryFormLink = element(by.css('a[ng-click="app.hideDeliveryForm()"]'));
    hideDeliveryFormLink.click();

    var userNameDisplay = element(by.binding('app.user.name'));
    expect(userNameDisplay.getText()).toContain('test user');
  });


  it('should display a list of restaurants', function() {
    var restaurantList = element.all(by
        .repeater('restaurant in app.filteredRestaurants')
        .column('restaurant.name'));
    expect(restaurantList.count()).toEqual(39);
    expect(restaurantList.get(0).getText()).toEqual('Angular Pizza');
  });
});
```

* Execute the protractor specs from the step folder

```bash
$ cd step-05
$ protractor protractor.conf.js
```

## Extras

* Try running protractor with a standalone Selenium server:
