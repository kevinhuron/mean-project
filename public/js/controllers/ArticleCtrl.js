/**
 * Created by kevinhuron on 01/06/2016.
 */
angular.module('ArticleCtrl', ['ArticleService']).controller('ArticleController', function($scope, $routeParams, Article, cfpLoadingBar) {
    Article.get($routeParams.idA).then(function(oneArticle) {
        cfpLoadingBar.start();
        /** ****** **/
        if (oneArticle.data.user) {
            $scope.$parent.hidden = false;
            $scope.$parent.tohide = false;
            $scope.$parent.username = oneArticle.data.user.local.firstname;
        }
        var article = oneArticle.data.article;
        $scope.allArticles = article;
        /** ****** **/
        cfpLoadingBar.complete();
    });

    $scope.insertArticle = function() {
        cfpLoadingBar.start();
        /** ****** **/
        $scope.titleARequired = '';
        $scope.longDescARequired = '';
        $scope.contentARequired = '';
        $scope.imgRequired ='';
        if (!$scope.article.titleA || !$scope.article.longDescA || !$scope.article.contentA /* || !$scope.article.img*/) {
            if (!$scope.article.titleA) {
                $scope.titleARequired = 'Le titre est obligatoire';
            }
            if (!$scope.article.longDescA) {
                $scope.longDescARequired = 'Une description de votre article est requis';
            }
            if (!$scope.article.contentA) {
                $scope.contentARequired = 'Veuillez écrire le contenu de votre article';
            }
            /*if (!$scope.article.img) {
                $scope.imgRequired = 'IMAGE';
            }*/
        }



        /** ****** **/
        cfpLoadingBar.complete();
    }
});