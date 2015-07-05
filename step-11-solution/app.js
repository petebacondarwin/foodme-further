angular.module('app', ['ngRoute', 'ngAnimate'])


.config(function($routeProvider) {
  $routeProvider
    .when('/restaurants', {
      templateUrl: 'components/restaurants'
    })
    .when('/about-us', {
      templateUrl: 'components/about-us'
    })
    .otherwise('/restaurants');
})

.controller('NavigationController', function($location, $route) {

  this.routeIs = function(routeName) {
    return $location.path() === routeName;
  };

})
