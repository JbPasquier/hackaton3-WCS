angular.module('hswf')
    .service('emailService', ['$http', function($http) {
        return {
            send: function(data) {
                return $http.post('/send_msg', data);
            }
        }
    }]);
