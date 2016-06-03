/**
 * Created by kevinhuron on 03/06/2016.
 */
angular.module('MainService', []).factory('LastArticle', ['$http', function($http) {
    return {
        // call to get all nerds
        get : function() {
            //console.log('idA: ' + id);
            return $http.get('/api/home/article/');
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