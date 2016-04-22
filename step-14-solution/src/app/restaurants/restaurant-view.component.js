angular.module('app/restaurants/restaurant-view', [
  'app/restaurants/restaurant-info',
  'app/restaurants/menu',
  'app/order/current-order',
  'app/order/order-widget'
])

.component('fmRestaurantView', {
  templateUrl: 'src/app/restaurants/restaurant-view.template.html',
  controller: FmRestaurantView
});

function FmRestaurantView(restaurantService, currentOrder, $state) {
  this.restaurantService = restaurantService;
  this.order = currentOrder;
  this.$state = $state;
}

FmRestaurantView.prototype.$onInit = function() {
  var _this = this;
  var restaurantId = this.$state.params.id;
  this.restaurantService.loadOne(restaurantId).then(function(restaurant) {
    _this.restaurant = restaurant;
  });
};

FmRestaurantView.prototype.addToOrder = function(item) {
  this.order.addToOrder(this.restaurant, item);
};