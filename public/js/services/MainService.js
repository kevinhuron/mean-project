/**
 * Created by kevinhuron on 03/06/2016.
 */
angular.module('MainService', []).factory('LastArticle', ['$http', function($http) {
    return {
        get : function() {
            return $http.get('/api/home/article/');
        },

        create : function(articleData) {
            return $http.post('/api/nerds', articleData);
        },

        // call to DELETE a nerd
        delete : function(id) {
            return $http.delete('/api/nerds/' + id);
        }
    }
}]);