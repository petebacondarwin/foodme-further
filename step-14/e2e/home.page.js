function HomePage() {};
HomePage.prototype = {
  get: function() {
    browser.get('/');
  },

  setUserName: function(name) {
    var e = element(by.model('$ctrl.user.name'));
    e.clear();
    e.sendKeys(name);
  },

  getDisplayedUserName: function() {
    return element(by.binding('$ctrl.user.name'));
  },

  hideDeliveryForm: function() {
    element(by.css('a[ng-click="$ctrl.save()"]')).click();
  },

  showDeliveryForm: function() {
    element(by.css('a[ng-click="$ctrl.showDeliveryForm()"]')).click();
  },

  getRestaurantList: function(column) {
    var repeater = by.repeater('restaurant in $ctrl.filteredRestaurants');
    if (column) {
      repeater = repeater.column(column);
    }
    return element.all(repeater);
  }
};

module.exports = HomePage;