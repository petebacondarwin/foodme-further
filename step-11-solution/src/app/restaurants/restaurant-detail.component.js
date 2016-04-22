angular.module('app/restaurants/restaurant-detail', [])

.component('fmRestaurantDetail', {
  bindings: {
    restaurant: '<'
  },
  templateUrl: 'src/app/restaurants/restaurant-detail.template.html'
});