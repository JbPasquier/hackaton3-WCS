'use strict';

angular.module('flaskang')
  .factory('Test', ['$resource', function ($resource) {
    return $resource('flaskang/tests/:id', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });
  }]);
