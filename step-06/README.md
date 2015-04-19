# Step 6 - e2e testing

## Where are we?

An Angular application running from a local webserver;
with unit tests and initial e2e tests

## Goals

* Use a PageObject to make e2e tests clearer

## Topics

* Protractor PageObjects

## Tasks

* Create a PageObject for the app

```js
function HomePage() {};
HomePage.prototype = {
  get: function() {
    browser.get('index.html');
  },

  setUserName: function(name) {
    var e = element(by.model('app.user.name'));
    e.clear();
    e.sendKeys(name);
  },

  getDisplayedUserName: function() {
    return element(by.binding('app.user.name'));
  },

  hideDeliveryForm: function() {
    element(by.css('a[ng-click="app.hideDeliveryForm()"]')).click();
  },

  showDeliveryForm: function() {
    element(by.css('a[ng-click="app.showDeliveryForm()"]')).click();
  },

  getRestaurantList: function(column) {
    var repeater = by.repeater('restaurant in app.filteredRestaurants');
    if (column) {
      repeater = repeater.column(column);
    }
    return element.all(repeater);
  }
};

module.exports = HomePage;
```

* Import and use the `HomePage` object in the app.spec.js e2e file

```js
var HomePage = require('./home.page');

describe('app', function() {
  var homePage;

  beforeEach(function() {
    homePage = new HomePage();
    homePage.get();
  });

  it('should update the delivery info box when the deliveryForm is changed', function() {
    homePage.setUserName('test user');
    homePage.hideDeliveryForm();
    expect(homePage.getDisplayedUserName().getText()).toContain('test user');
  });


  it('should display a list of restaurants', function() {
    var restaurantList = homePage.getRestaurantList('restaurant.name');
    expect(restaurantList.count()).toEqual(39);
    expect(restaurantList.get(0).getText()).toEqual('Angular Pizza');
  });
});
```


## Extras

* Try adding checks that test the validation of the deliveryInfoForm
* Try adding checks that test the filtering of the restaurant list