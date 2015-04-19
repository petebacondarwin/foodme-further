function HomePage() {};
HomePage.prototype = {
  get: function() {
    browser.get('index.html');
  },

  setUserName: function(name) {
    var e = element(by.model('directive.user.name'));
    e.clear();
    e.sendKeys(name);
  },

  getDisplayedUserName: function() {
    return element(by.binding('directive.user.name'));
  },

  hideDeliveryForm: function() {
    element(by.css('a[ng-click="directive.hideDeliveryForm()"]')).click();
  },

  showDeliveryForm: function() {
    element(by.css('a[ng-click="directive.showDeliveryForm()"]')).click();
  },

  getRestaurantList: function(column) {
    var repeater = by.repeater('restaurant in component.filteredRestaurants');
    if (column) {
      repeater = repeater.column(column);
    }
    return element.all(repeater);
  }
};

module.exports = HomePage;