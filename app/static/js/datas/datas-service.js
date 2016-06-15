'use strict';

angular.module('hswf')
  .factory('Datas', ['$resource', function ($resource) {
    return $resource('hswf/datas/:id', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });
  }]);
