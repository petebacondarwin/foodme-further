angular.module('app', [
  'ui.router',
  'ngAnimate',
  'ngMessages',
  'ngMessageFormat',
  'app/navigation/navigation',
  'app/restaurants/restaurants',
  'app/info/help',
  'app/info/who-we-are',
  'app/info/how-it-works'
])

.config(function($locationProvider) {
  $locationProvider.html5Mode(true);
})

.config(function($stateProvider) {
  $stateProvider
    .state('restaurants', {
      url: '/',
      template: '<fm-restaurants></fm-restaurants>'
    })
    .state('how-it-works', {
      url: '/how-it-works',
      template: '<fm-how-it-works></fm-how-it-works>'
    })
    .state('who-we-are', {
      url: '/who-we-are',
      template: '<fm-who-we-are></fm-who-we-are>'
    })
    .state('help', {
      url: '/help',
      template: '<fm-help></fm-help>'
    })
});