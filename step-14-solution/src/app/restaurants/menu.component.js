angular.module('app/restaurants/menu', [])

.component('fmMenu', {
  bindings: {
    'restaurant': '<',
    'onChooseItem': '&'
  },
  templateUrl: 'src/app/restaurants/menu.template.html'
});