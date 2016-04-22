angular.module('app/restaurants/restaurant-view', [
  'app/restaurants/restaurant-info',
  'app/restaurants/menu'
])

.component('fmRestaurantView', {
  templateUrl: 'src/app/restaurants/restaurant-view.template.html',
  controller: FmRestaurantView
});

function FmRestaurantView(restaurantService, $state) {
  this.restaurantService = restaurantService;
  this.$state = $state;
}

FmRestaurantView.prototype.$onInit = function() {
  var _this = this;
  var restaurantId = this.$state.params.id;
  this.restaurantService.loadOne(restaurantId).then(function(restaurant) {
    _this.restaurant = restaurant;
  });
};
