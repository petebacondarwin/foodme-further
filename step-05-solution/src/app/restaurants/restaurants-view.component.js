angular.module('app/restaurants/restaurants-view', [
  'app/customer/user-form',
  'app/customer/delivery-info',
  'app/customer/user-service',
  'app/restaurants/restaurant-list'
])

.component('fmRestaurantsView', {
  templateUrl: 'src/app/restaurants/restaurants-view.template.html',
  controller: FmRestaurants
});

function FmRestaurants(userService) {
  console.log('here');

  this.deliveryFormVisible = true;

  this.user = userService.get();

  this.showDeliveryForm = function() {
    this.deliveryFormVisible = true;
  };

  this.hideDeliveryForm = function() {
    this.deliveryFormVisible = false;
  };

  this.saveUser = function(user) {
    userService.save(user);
    this.user = user;
    this.hideDeliveryForm();
  };
}