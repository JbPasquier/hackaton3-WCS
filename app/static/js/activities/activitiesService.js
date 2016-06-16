angular.module('hswf')
    .service('activitiesService', ['$http', function($http) {
        return {
            getAll: function() {
                return $http.get('/hswf/activitis');
            },
            getOne: function(id) {
                return $http.get('/hswf/activitis/' + id);
            },
            create: function(data) {
                return $http.post('/hswf/activitis', data);
            },
            update: function(id, data) {
                return $http.put('/hswf/activitis/' + id, data);
            },
            delete: function(id) {
                return $http.delete('/hswf/activitis/' + id);
            }
        }
    }]);
