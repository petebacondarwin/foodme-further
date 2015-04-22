# Step 4 - fmRating directive unit tests

## Where are we?

A running Angular application running from a local webserver;
displaying a filterable, sortable list of restaurants and delivery info form;
with unit tests for AppController and rating filter.

## Goals

* Create unit tests for `fmRating` directive

## Topics

* Testing directives
* $compile
* $rootElement
* custom Jasmine matchers

## Tasks

* Create an instance of the `fmRating` directive to unit test using `$compile`

Create rating.spec.js:

```js
describe('fmRating directive', function() {

  var $scope, element;

  beforeEach(module('rating'));

  beforeEach(inject(function($compile, $rootScope) {
    $scope = $rootScope;
    element = $compile('<fm-rating glyph="star" rating="model.value"></fm-rating>')($scope);
    $scope.$apply('model = { value: 0 }');
  }));
});
```

* Create a `toHaveClass` Jasmine matcher

```js
  beforeEach(function() {
    jasmine.addMatchers({
      toHaveClass: function () {
        return {
          compare: function(element, className, expectedCount) {
            var actualCount = 0;
            var result = { pass: true };

            for(var i = 0, ii = element.length; i < ii; i++) {
              if (element.eq(i).hasClass(className)) {
                actualCount ++;
              }
            }

            if ( actualCount !== expectedCount ) {
              result = {
                pass: false,
                message: 'Expected ' + className + ' on ' + expectedCount + ' elements but it appeared on ' + actualCount + ' elements'
              };
            }

            return result;
          }
        };
      }
    });
  });
```

* Use the custom matcher to test the number of icons displayed

```js
  it('should contain five star glyphs', function() {
    expect(element.find('li').length).toEqual(5);
    expect(element.find('span')).toHaveClass('glyphicon-star', 5);
  })
```

* Change the rating programmatically to test that the HTML changes

```js
  it('should update the view when the rating changes', function() {
    $scope.$apply('model.value = 3');
    expect(element.find('li')).toHaveClass('selected', 3);
  });
```

* Simulate clicking the directive to test changing the rating

```js
  it('should update the rating when clicked', function() {
    element.find('li').eq(2).triggerHandler('click');
    expect($scope.model.value).toEqual(3);
    expect(element.find('li')).toHaveClass('selected', 3);
  });
```