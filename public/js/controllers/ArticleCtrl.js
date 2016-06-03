/**
 * Created by kevinhuron on 01/06/2016.
 */
angular.module('ArticleCtrl', ['ArticleService']).controller('ArticleController', function($scope, $routeParams, Article, cfpLoadingBar) {
    Article.get($routeParams.idA).then(function(oneArticle) {
        cfpLoadingBar.start()
        var article = oneArticle.data;
        $scope.allArticles = article;
        cfpLoadingBar.complete();
    });
});