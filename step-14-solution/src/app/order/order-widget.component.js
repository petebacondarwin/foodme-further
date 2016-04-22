angular.module('app/order/order-widget', [
  'app/order/current-order',
  'app/restaurants/restaurant-service'
])

.component('fmOrderWidget', {
  templateUrl: 'src/app/order/order-widget.template.html',
  controller: FmOrderWidget
});

function FmOrderWidget(currentOrder) {
  this.order = currentOrder;
}