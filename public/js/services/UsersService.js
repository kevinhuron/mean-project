/**
 * Created by kevinhuron on 01/06/2016.
 */
angular.module('UsersService', []).factory('user', ['$http', function($http) {
    return {
        get : function(id) {
            //console.log('idA: ' + id);
            return $http.get('/api/blog/article/' + id);
        },

        create : function(userData) {
            return $http.post('/api/inscription/', userData);
        },

        delete : function(id) {
            return $http.delete('/api/nerds/' + id);
        }
    }
}]);