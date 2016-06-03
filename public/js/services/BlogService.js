/**
 * Created by kevinhuron on 25/05/2016.
 */
// public/js/services/NerdService.js
angular.module('BlogService', []).factory('Articles', ['$http', function($http) {
    return {
        get : function() {
            return $http.get('/api/blog');
        },

        create : function(articleData) {
            return $http.post('/api/nerds', articleData);
        },

        delete : function(id) {
            return $http.delete('/api/nerds/' + id);
        }
    }
}]);