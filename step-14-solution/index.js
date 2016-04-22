angular.module('restaurants', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/restaurants', {
      templateUrl: 'components/restaurants',
      controller: 'RestaurantsController as component',
      resolve: {
        restaurants: 'restaurantListPromise'
      }
    })
    .when('/restaurants/:id', {
      templateUrl: 'components/restaurants/menu.html',
      controller: 'MenuController as component',
      resolve: {
        restaurants: 'restaurantListPromise'
      }
    });
}])

.factory('restaurantListPromise', ['$http', function($http) {

  // var url = 'https://foodme.firebaseio.com/.json'; // CORS enabled server
  var url = '../shared/data/restaurants.json'; // Local webserver

  return $http.get(url).then(function(response) {
    return response.data;
  });

}])

.controller('RestaurantsController', ['restaurants', '$rootScope', function(restaurants, $rootScope) {

  var that = this;

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
    angular.forEach(restaurants, function(restaurant) {
      if ( ( !that.filters.rating || restaurant.rating >= that.filters.rating ) &&
           ( !that.filters.price || restaurant.price <= that.filters.price ) ) {
        that.filteredRestaurants.push(restaurant);
      }
    });
  };

  $rootScope.$watchGroup([
      function() { return that.filters.price; },
      function() { return that.filters.rating; }
    ], filterRestaurants);
}])


.controller('MenuController', ['restaurants', '$routeParams', '$location', function(restaurants, $routeParams, $location) {
  var restaurantId = $routeParams.id;
  for(var i=0; i<restaurants.length; i++) {
    if (restaurants[i].id == restaurantId) {
      this.restaurant = restaurants[i];
      break;
    }
  }
  if (!this.restaurant) {
    console.log('missing restaurant', restaurantId);
    $location.path('/');
  }
}]);