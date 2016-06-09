/**
 * Created by kevinhuron on 09/06/2016.
 */
angular.module('AdminService', []).factory('Admin', ['$http', function($http) {
    return {
        get : function() {
            return $http.get('/api/admin/users/');
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