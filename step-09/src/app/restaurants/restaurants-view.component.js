angular.module('app/restaurants/restaurants-view', [
  'app/customer/user-form',
  'app/customer/delivery-info',
  'app/customer/user-service',
  'app/restaurants/restaurant-list'
])

.component('fmRestaurants', {
  templateUrl: 'src/app/restaurants/restaurants.template.html',
  controller: FmRestaurants
});

function FmRestaurants(userService) {

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