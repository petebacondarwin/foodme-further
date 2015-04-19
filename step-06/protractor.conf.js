var path = require('path');
var stepPath = path.basename(__dirname);

exports.config = {
  specs: ['e2e/*.spec.js'],
  baseUrl: 'http://localhost:8080/' + stepPath + '/',
  directConnect: true
};