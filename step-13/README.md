# Step 14 - add Shopping Cart functionality

## Where are we?

An Angular application running from a local webserver;
with unit tests and e2e tests; reusable directives and componentized routing

## Goals

* Provide a Shopping Cart facility to store items from the menu

## Topics

* Services

## Tasks

* Create a `shoppingCart` module, which depends upon `localStorage`

```js
angular.module('shoppingCart', ['localStorage'])
```

* Load the `shoppingCart` module in index.html

```html
  <script src="shoppingCart.js"></script>
```

* Add the `shoppingCart` as a dependency of the `app` module

```js
angular.module('app', ['ngMessages', 'ngMessageFormat', 'ngRoute', 'ngAnimate',
                       'localStorage', 'rating', 'restaurants', 'fmDeliverTo',
                       'shoppingCart'])
```

* Create an `alert` service to wrap the browser's `alert` function for easier testing

```js
.value('alert', window.alert)
```

* Create a `shoppingCart` service that stores the cart info in `localStorage`

```js
.factory('shoppingCart', function(localStorageBinding) {
  return localStorageBinding('fmShoppingCart', {
    items: [],
    restaurant: {}
  });
})
```

* Create a `ShoppingCartController` that exposes the `shoppingCart` and helper methods

```js
.controller('ShoppingCartController', function(shoppingCart, alert) {
  this.cart = shoppingCart;

  this.items = function() {
    return this.cart.items;
  };

  this.restaurant = function() {
    return this.cart.restaurant;
  };

  this.add = function(choice, restaurant) {
    if ( !this.cart.restaurant.id ) {
      this.cart.restaurant = restaurant;
    }

    if ( this.cart.restaurant.id !== restaurant.id ) {
      alert('You cannot mix items from different restaurant - clear the shopping cart first.');
      return;
    }

    angular.forEach(this.cart.items, function(item) {
      if (choice && choice.name === item.name) {
        item.amount += 1;
        choice = null;
      }
    });

    if (choice) {
      this.cart.items.push({
        name: choice.name,
        price: choice.price,
        amount: 1
      });
    }
  };

  this.remove = function(cartItem) {
    var index = this.cart.items.indexOf(cartItem);
    if ( index !== -1 ) {
      this.cart.items.splice(index, 1);
    }

    if (this.cart.items.length === 0) {
      this.cart.restaurant = {};
    }
  };

  this.total = function() {
    var sum = 0;
    angular.forEach(this.cart.items, function(item) {
      sum += Number(item.price * item.amount);
    });
    return sum;
  };

  this.reset = function() {
    this.cart.items = [];
    this.cart.restaurant = {};
  };
});
```

* Attach the `ShoppingCartController` to the menu view using `ng-controller`

```html
  <div class="row" ng-controller="ShoppingCartController as shoppingCart">
    <div class="col-md-8">
      <div class="fm-panel fm-menu-list">
        <div class="fm-heading">Menu</div>
        ...
```

* Add a new item to the cart from the menu items when the plus sign is clicked

```html
<li ng-repeat="menuItem in component.restaurant.menuItems">
  <a href>
    <span>{{menuItem.name}}</span>
    <span>{{menuItem.price | currency}}</span>
    <i class="glyphicon glyphicon-plus" ng-click="shoppingCart.add(menuItem, component.restaurant)"></i>
  </a>
</li>
```

* Display the shopping cart items and total in the side panel, with option to remove items by clicking

```html
<div class="fm-content">
  <div class="fm-restaurant">{{ shoppingCart.restaurant().name }}</div>

  <ul class="list-unstyled">
    <li ng-repeat="cartItem in shoppingCart.items()">
      <a ng-click="shoppingCart.remove(cartItem)">
        <i class="glyphicon glyphicon-remove"></i>
      </a>
      {{cartItem.amount}} &times; {{ cartItem.name }}
    </li>
  </ul>

  <div class="pull-right">
    <a href class="btn btn-primary">Checkout</a>
  </div>
  <div class="fm-total">Total: {{shoppingCart.total() | currency}}</div>

</div>
```

## Extras

* Write unit tests for the `ShoppingCartController` (mocking `alert`)
* Write e2e tests for adding items to the cart
