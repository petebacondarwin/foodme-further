angular.module('fmDeliverTo', [])


.controller('FmDeliverToController', function() {

  this.deliveryFormVisible = true;

  this.showDeliveryForm = function() {
    this.deliveryFormVisible = true;
  };

  this.hideDeliveryForm = function() {
    this.deliveryFormVisible = false;
  };
})


.directive('fmDeliverTo', function() {
  return {
    restrict: 'E',
    templateUrl: 'fmDeliverTo.template.html',
    controller: 'FmDeliverToController as directive',
    bindToController: {
      user: '=deliverTo'
    },
    scope: {}
  };
});