/**
 * Created by kevinhuron on 01/06/2016.
 */
angular.module('ArticleService', []).factory('Article', ['$http', function($http) {
    return {
        // call to get all nerds
        get : function(id) {
            //console.log('idA: ' + id);
            return $http.get('/api/blog/article/' + id);
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