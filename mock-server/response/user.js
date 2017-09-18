var Mock = require('mockjs');

var app = function(){};

app.prototype = {
  test () {
    return Mock.mock({
      'data': {
        'list|0-10': [{
            'id|+1': 1,
            'name|0-10': /[a-z][A-Z][0-9]/,
            'children': {
              'name|0-10': /[a-z][A-Z][0-9]/,
              'age|0-100': 5
            }
        }]
      }
    })
  }
}

module.exports = new app();
