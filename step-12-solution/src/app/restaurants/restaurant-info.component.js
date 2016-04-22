angular.module('app/restaurants/restaurant-info', [])

.component('fmRestaurantInfo', {
  templateUrl: 'src/app/restaurants/restaurant-info.template.html',
  bindings: { restaurant: '<' }
});