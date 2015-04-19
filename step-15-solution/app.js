angular.module('app', ['ngMessages', 'ngMessageFormat', 'ngRoute', 'ngAnimate',
                       'localStorage', 'rating', 'restaurants', 'fmDeliverTo',
                       'shoppingCart'])


.config(['$routeProvider', function($routeProvider) {
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
}])

.controller('AppController', ['localStorageBinding', function(localStorageBinding) {

  this.user = localStorageBinding('foodMe/user', {
    name: 'Jo Bloggs',
    address: '123, Some Place, Some Where'
  });
}])


.controller('NavigationController', ['$location', function($location) {

  this.routeIs = function(routeName) {
    return $location.path() === routeName;
  };

}])


.filter('rating', ['$sce', function($sce) {
  return function(value, glyph) {
    var output = "";
    while(value>0) {
      output += '<span class="glyphicon glyphicon-' + glyph + '"></span>';
      value -= 1;
    }
    return $sce.trustAsHtml(output);
  };
}]);