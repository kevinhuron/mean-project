/**
 * Created by kevinhuron on 01/06/2016.
 */
angular.module('ArticleCtrl', ['ArticleService']).controller('ArticleController', function($scope, $routeParams, Article, cfpLoadingBar) {
    Article.get($routeParams.idA).then(function(oneArticle) {
        cfpLoadingBar.start();
        if (oneArticle.data.user) {
            $scope.$parent.hidden = false;
            $scope.$parent.tohide = false;
            $scope.$parent.username = oneArticle.data.user.local.firstname;
        }
        var article = oneArticle.data.article;
        $scope.allArticles = article;
        cfpLoadingBar.complete();
    });
});