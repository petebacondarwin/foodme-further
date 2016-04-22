angular.module('app/order/current-order', [
  'common/local-storage/local-storage',
  'common/alert'
])

.service('currentOrder', CurrentOrder);

function CurrentOrder(localStorage, alert) {
  this.localStorage = localStorage;
  this._key = 'foodme/order';
  this._loadOrder();
}

CurrentOrder.prototype.addToOrder = function(restaurant, item) {
  if (!this.restaurant) {
    this.restaurant = {
      id: restaurant.id,
      name: restaurant.name
    };
  }

  if (this.restaurant.id !== restaurant.id) {
    alert('You cannot mix items from different restaurants - clear the shopping cart first.');
    return;
  }

  var i;
  for(i = 0; i < this.items.length; i++) {
    var orderItem = this.items[i];
    if (item && item.name === orderItem.name) {
      orderItem.amount += 1;
      break;
    }
  }

  if (i === this.items.length) {
    this.items.push({
      name: item.name,
      price: item.price,
      amount: 1
    });
  }

  this._saveOrder();
};

CurrentOrder.prototype.removeFromOrder = function(item) {
  var index = this.items.indexOf(item);
  if ( index !== -1 ) {
    this.items.splice(index, 1);
  }
  if (this.items.length === 0) {
    this.restaurant = null;
  }
  this._saveOrder();
};



CurrentOrder.prototype._loadOrder = function() {
  var order = JSON.parse(this.localStorage[this._key] || '{}');
  this.restaurant = order.restaurant;
  this.items = order.items;
  this._computeTotal();
};

CurrentOrder.prototype._saveOrder = function() {
  this._computeTotal();
  this.localStorage[this._key] = JSON.stringify({
    restaurant: this.restaurant,
    items: this.items
  });
};

CurrentOrder.prototype._computeTotal = function() {
  var sum = 0;
  angular.forEach(this.items, function(item) {
    sum += Number(item.price * item.amount);
  });
  this.total = sum;
};