angular.module('restaurants', ['ngRoute'])

.config(function($routeProvider) {
  $routeProvider
    .when('/restaurants', {
      templateUrl: 'components/restaurants',
      controller: 'RestaurantsController as component'
    });
})

.controller('RestaurantsController', function($http, $rootScope) {

  var that = this;
  // var url = 'https://foodme.firebaseio.com/.json'; // CORS enabled server
  var url = '../shared/data/restaurants.json'; // Local webserver

  $http.get(url).then(function(response) {
    that.restaurants = response.data;
  });


  this.sortProperty = 'name';
  this.sortDirection = false;

  this.sortBy = function(property) {
    if ( this.sortProperty === property ) {
      this.sortDirection = !this.sortDirection;
    } else {
      this.sortProperty = property;
      this.sortDirection = false;
    }
  };

  this.getSortClass = function(property) {
    if ( this.sortProperty === property ) {
      return 'glyphicon glyphicon-chevron-' + (this.sortDirection ? 'down' : 'up');
    }
  };

  this.filters = {
    price: null,
    rating: null
  };

  var filterRestaurants = function() {
    that.filteredRestaurants = [];
    angular.forEach(that.restaurants, function(restaurant) {
      if ( ( !that.filters.rating || restaurant.rating >= that.filters.rating ) &&
           ( !that.filters.price || restaurant.price <= that.filters.price ) ) {
        that.filteredRestaurants.push(restaurant);
      }
    });
  };

  $rootScope.$watchGroup([
      function() { return that.filters.price; },
      function() { return that.filters.rating; },
      function() { return that.restaurants; }
    ], filterRestaurants);
});