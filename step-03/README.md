# Step 3 - rating filter unit tests

## Where are we?

A running Angular application running from a local webserver;
displaying a filterable, sortable list of restaurants and delivery info form;
with unit tests for AppController.

## Goals

* Create unit tests for `rating` filter

## Topics

* Testing filters
* $filter
* _underscore_ injection sugar

## Tasks

* (Option a) Use and $filter to test the ratingFilter

```js
describe('rating filter', function() {

  beforeEach(module('app'));

  it('should return a string of repeated symbols', inject(function($filter) {
    var ratingFilter = $filter('rating');
    var value = ratingFilter(3, '*');
    expect(value).toEqual('***');
  }));
});
```

* (Option b) Inject the rating filter (as `ratingFilter`) directly into the test

```js
it('should return a trusted HTML string', inject(function(ratingFilter) {
  var value = ratingFilter(3, '*');
  expect(value).toEqual('***');
}));
```

* (Option c) Use underscores to assign the ratingFilter outside of the current function context

```js
var ratingFilter
beforeEach(inject(function(_ratingFilter_) {
  ratingFilter = _ratingFilter_;
}));

it('should return a trusted HTML string', function() {
  var value = ratingFilter(3, '*');
  expect(value).toEqual('***');
});
```

## Extras

* Try writing tests for the `localStorageBinding` service