/**
 * Created by kevinhuron on 01/06/2016.
 */
/**
 * Created by kevinhuron on 25/05/2016.
 */
angular.module('ArticleCtrl', ['ArticleService']).controller('ArticleController', function($scope, Article) {
    Article.get().then(function(oneArticle) {
        var article = oneArticle.data;
        $scope.allArticles = article;
    });
});