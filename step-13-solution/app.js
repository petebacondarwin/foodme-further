angular.module('app', ['ngMessages', 'ngMessageFormat', 'ngRoute', 'ngAnimate',
                       'localStorage', 'rating', 'restaurants', 'fmDeliverTo'])


.config(function($routeProvider) {
  $routeProvider
    .when('/about-us', {
      templateUrl: 'components/about-us'
    })
    .when('/help', {
      templateUrl: 'components/help'
    })
    .when('/how-it-works', {
      templateUrl: 'components/how-it-works'
    })
    .otherwise('/restaurants');
})

.controller('AppController', function(localStorageBinding) {

  this.user = localStorageBinding('foodMe/user', {
    name: 'Jo Bloggs',
    address: '123, Some Place, Some Where'
  });
})


.controller('NavigationController', function($location) {

  this.routeIs = function(routeName) {
    return $location.path() === routeName;
  };

})


.filter('rating', function() {
  return function(value, symbol) {
    var output = "";
    while(value>0) {
      output += symbol;
      value -= 1;
    }
    return output;
  };
});