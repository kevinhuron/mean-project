/**
 * Created by kevinhuron on 01/06/2016.
 */
angular.module('ArticleService', []).factory('Article', ['$http', function($http) {
    return {
        get : function(id) {
            return $http.get('/api/blog/article/' + id);
        },
        getLastId : function() {
            return $http.get('/api/newArticle');
        },
        insertCommentaire : function(comData) {
            return $http.put('/api/newCom/', comData);
        },

        create : function(articleData) {
            return $http.post('/api/newArticle', articleData);
        },
        delete : function(id) {
            return $http.delete('/api/nerds/' + id);
        }
    }
}]);