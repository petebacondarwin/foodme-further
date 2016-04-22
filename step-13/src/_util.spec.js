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
              message: 'Expected ' + className + ' on ' +
                        expectedCount +
                      ' elements but it appeared on ' +
                      actualCount + ' elements'
            };
          }
          return result;
        }
      };
    }
  });
});