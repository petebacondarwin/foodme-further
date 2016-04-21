describe('fmRating directive', function() {

  var $scope, element;

  beforeEach(module('common/rating/rating-component'));
  beforeEach(module('src/common/rating/rating.template.html'));

  beforeEach(inject(function($compile, $rootScope) {
    $scope = $rootScope;
    element = $compile('<fm-rating glyph="star" rating="model.value"></fm-rating>')($scope);
    $scope.$apply('model = { value: 0}');
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