# Step 12 - add detailed menu view

## Where are we?

An Angular application running from a local webserver;
with unit tests and e2e tests; and componentized routing

## Goals

* Add a new view for a single restaurant showing its menu

## Topics

* $routeParams
* route resolves

## Tasks

* Add a new restaurant menu route, with a route parameter `:id`

```js
.when('/restaurants/:id', {
  templateUrl: 'components/restaurants/menu.html',
  controller: 'MenuController as component',
  resolve: {
    restaurants: 'restaurantListPromise'
  }
});
```

* Create a new view for this route at `components/restaurants/menu.html`

```html
<div class="col-md-12">
  <div class="row fm-restaurant">
    <div class="col-md-2">
      <img ng-src="../shared/img/restaurants/{{component.restaurant.id}}.jpg" class="img-rounded">
    </div>

    <div class="col-md-10">
      <h3>{{component.restaurant.name}}</h3>

      <div class="row">
        <div class="col-md-2">
          <div>{{component.restaurant.address}}</div>
          <div ng-bind-html="component.restaurant.rating | rating : 'star'"></div>
          <div ng-bind-html="component.restaurant.price | rating : 'gbp'"></div>
        </div>
        <div class="col-md-4">
          <div>{{component.restaurant.description}}</div>
        </div>
      </div>
    </div>
  </div>


  <div class="row">
    <div class="col-md-8">
      <div class="fm-panel fm-menu-list">
        <div class="fm-heading">Menu</div>

        <div class="fm-content">
          <ul>
            <li ng-repeat="menuItem in component.restaurant.menuItems">
              <a href>
                <span>{{menuItem.name}}</span>
                <span>{{menuItem.price | currency}}</span>
                <i class="glyphicon glyphicon-plus"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="col-md-4">
      <div class="fm-panel fm-cart">
        <div class="fm-heading">Your order</div>
        <div class="fm-content">
          <div class="fm-restaurant">{{ component.restaurant.name }}</div>
        </div>
      </div>
    </div>
  </div>
</div>
```

* Create a new controller for this route, which uses the resolved restaurant data

```js
.controller('MenuController', function(restaurants, $routeParams, $location) {
  var restaurantId = $routeParams.id;
  for(var i=0; i<restaurants.length; i++) {
    if (restaurants[i].id == restaurantId) {
      this.restaurant = restaurants[i];
      break;
    }
  }
  if (!this.restaurant) {
    console.log('missing restaurant', restaurantId);
    $location.path('/');
  }
});
```

* Update the restaurant list view to link each restaurant to its menu

```html
<td class="description">
  <div class="media">
    <a class="pull-left" href="#/restaurants/{{restaurant.id}}">
      <img class="img-rounded" ng-src="../shared/img/restaurants/{{restaurant.id}}.jpg">
    </a>
    <div class="media-body">
      <h4 class="media-heading">
        <a href="#/restaurants/{{restaurant.id}}">{{restaurant.name}}</a>
      </h4>
      <p>{{restaurant.description}}</p>
    </div>
  </div>
</td>
```

## Extras

* Write unit tests for the `MenuController`
* Write new e2e test that demonstrate navigating to a menu
