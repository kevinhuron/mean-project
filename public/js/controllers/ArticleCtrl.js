/**
 * Created by kevinhuron on 01/06/2016.
 */
angular.module('ArticleCtrl', ['ArticleService']).controller('ArticleController', function($scope, $routeParams, Article) {
    Article.get($routeParams.idA).then(function(oneArticle) {
        var article = oneArticle.data;
        $scope.allArticles = article;
    });
});