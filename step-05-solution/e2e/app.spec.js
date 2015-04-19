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
