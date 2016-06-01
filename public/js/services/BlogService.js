/**
 * Created by kevinhuron on 25/05/2016.
 */
// public/js/services/NerdService.js
angular.module('BlogService', []).factory('Blog', ['$http', function($http) {
    return {
        // call to get all nerds
        get : function() {
            return $http.get('/api/blog');
        },

        // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new nerd
        create : function(articleData) {
            return $http.post('/api/nerds', articleData);
        },

        // call to DELETE a nerd
        delete : function(id) {
            return $http.delete('/api/nerds/' + id);
        }
    }
}]);