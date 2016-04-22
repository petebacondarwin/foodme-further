angular.module('app', [
  'ui.router',
  'ngMessages',
  'ngMessageFormat',
  'app/restaurants/restaurants-view'
])

.config(function($locationProvider) {
  $locationProvider.html5Mode(true);
})

.config(function($stateProvider) {
  $stateProvider
    .state('restaurants', {
      url: '/',
      template: '<fm-restaurants-view></fm-restaurants-view>'
    })
});