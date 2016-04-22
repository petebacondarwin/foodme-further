describe('fmRating directive', function() {

  var $scope, element;

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

  beforeEach(module('rating'));

  beforeEach(inject(function($compile, $rootScope) {
    $scope = $rootScope;
    element = $compile('<fm-rating glyph="star" rating="model.value"></fm-rating>')($scope);
    $scope.$apply('model = { value: 0 }');
  }));


  it('should contain five star glyphs', function() {
    expect(element.find('li').length).toEqual(5);
    expect(element.find('span')).toHaveClass('glyphicon-star', 5);
  });

  it('should update the view when the rating changes', function() {
    $scope.$apply('model.value = 3');
    expect(element.find('li')).toHaveClass('selected', 3);
  });


  it('should update the rating when clicked', function() {
    element.find('li').eq(2).triggerHandler('click');
    expect($scope.model.value).toEqual(3);
    expect(element.find('li')).toHaveClass('selected', 3);
  });
});