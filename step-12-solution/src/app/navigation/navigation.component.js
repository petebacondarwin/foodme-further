angular.module('app/navigation/navigation', [])

.component('fmNavigation', {
  templateUrl: 'src/app/navigation/navigation.template.html',
  controller: FmNavigation
});

function FmNavigation($location) {
  this.$location = $location;
}

FmNavigation.prototype.routeIs = function(routeName) {
  return this.$location.path() === routeName;
};