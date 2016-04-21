describe('rating filter', function() {
  beforeEach(module('common/rating/rating-filter'));

  it('should return a string of repeated symbols',
        inject(function($filter) {
    var ratingFilter = $filter('rating');
    var value = ratingFilter(3, '*');
    expect(value).toEqual('***');
  }));
});