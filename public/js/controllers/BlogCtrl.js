/**
 * Created by kevinhuron on 25/05/2016.
 */
angular.module('BlogCtrl', ['BlogService']).controller('BlogController', function($scope, Articles) {
    Articles.get().then(function(articles) {
        var allArticles = articles.data;
        $scope.allArticles = allArticles;
    });
});