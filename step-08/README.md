# Step 8 - add routing

## Where are we?

An Angular application running from a local webserver;
with unit tests and e2e tests;
and routing

## Goals

* Add additional static views
* Add navigation links to these views

## Topics

## Tasks

* Create a new `components/help/index.html` template for the help view

```html
<div class="col-md-12">
  <div class="fm-panel">
    <div class="fm-heading">Help</div>
    <div class="fm-content">
      <h4>Until how late do you deliver?</h4>
      <p>We deliver as late as 9pm from all restaurants.</p>

      <h4>What payment methods do you accept?</h4>
      <p>We gladly accept all major credit cards.</p>

      <h4>I got an extra chocolate muffin with my order, what is this about?</h4>
      <p>That's just a small thank-you gift from FoodMe. Enjoy it!</p>
    </div>
  </div>
</div>
```

* Create a new `components/about-us/index.html` template for the about-us view

```html
<div class="col-md-12">
  <div class="fm-panel">
    <div class="fm-heading">Who we are</div>
    <div class="fm-content">
      <p>We are purple unicorns jockeys and knitters of woolen socks!</p>
    </div>
  </div>
</div>
```

* Create a new `components/how-it-works/index.html` template for the how-it-works view

```html
<div class="col-md-12">
  <div class="fm-panel">
    <div class="fm-heading">How it works</div>
    <div class="fm-content">
      <p>It's simple:</p>
      <ol>
        <li>Enter delivery address</li>
        <li>Pick a great restaurant</li>
        <li>Select yummy food</li>
        <li>Enter delivery time</li>
        <li>Enter payment details</li>
        <li>And the food will be on the way!</li>
      </ol>
    </div>
  </div>
</div>
```

* Configure the application to display these views

```js
.config(function($routeProvider) {
  $routeProvider
    .when('/restaurants', {
      templateUrl: 'components/restaurants'
    })
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
})
```

* Add links to these views in the navigation panel

```html
<!-- Navigation Bar -->
<div class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#/">FoodMe</a>
    </div>
    <div class="collapse navbar-collapse">
      <ul class="nav navbar-nav">
        <li><a href="#/">Home</a></li>
        <li><a href="#/how-it-works">How it works</a></li>
        <li><a href="#/about-us">Who we are</a></li>
      </ul>

      <ul class="nav navbar-nav navbar-right">
        <li><a href="#/help">Help</a></li>
      </ul>
    </div>
  </div>
</div>
```

* Check that the karma and protractor tests still pass

```bash
$ karma start --single-run
$ protractor protractor.conf.js
```

## Extras

* Try adding more static views of your own