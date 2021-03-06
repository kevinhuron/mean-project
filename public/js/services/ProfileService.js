/**
 * Created by kevinhuron on 01/06/2016.
 */
angular.module('ProfileService', []).factory('profile', ['$http', function($http) {
    return {
        get : function(mail) {
            return $http.get('/api/profile');
        },

        log : function(logData) {
            return $http.post('/api/login', logData);
        },

        create : function(userData) {
            return $http.post('/api/inscription', userData);
        },

        update : function(userData) {
            return $http.put('/api/updateUser', userData);
        },

        delete : function(id) {
            return $http.delete('/api/article/delete/' + id);
        }
    }
}]);