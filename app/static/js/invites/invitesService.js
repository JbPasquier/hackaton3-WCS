angular.module('hswf')
    .service('HomeService', ['$http', function($http) {
        return {
            getAll: function() {
                return $http.get('/hswf/salons');
            },
            getOne: function(id) {
                return $http.get('/hswf/salons/' + id);
            },
            create: function(data) {
                return $http.post('/hswf/salons', data);
            },
            update: function(id, data) {
                return $http.put('/hswf/salons/' + id, data);
            },
            delete: function(id) {
                return $http.delete('/hswf/salons/' + id);
            }
        }
    }]);
