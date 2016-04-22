angular.module('app/restaurants/restaurant-service', [])

.factory('restaurantService', function($http) {
  // var url = 'https://foodme.firebaseio.com/.json'; // CORS enabled server
  var url = 'assets/data/restaurants.json'; // Local webserver

  var promise;

  return {

    load: function() {
      if (!promise) {
        promise = $http.get(url).then(function(response) {
          return response.data;
        });
      }
      return promise;
    },

    loadOne: function(id) {
      return this.load().then(function(restaurants) {
        for(var i=0; i<restaurants.length; i++) {
          if (restaurants[i].id == id) {
            return restaurants[i];
          }
        }
      });
    }
  };
});