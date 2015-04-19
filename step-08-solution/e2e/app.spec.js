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
