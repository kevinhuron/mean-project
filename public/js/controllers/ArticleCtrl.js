/**
 * Created by kevinhuron on 01/06/2016.
 */
angular.module('ArticleCtrl', ['ArticleService']).controller('ArticleController', function($scope,$routeParams,$http,$filter,Article,cfpLoadingBar) {
    Article.get().then(function(lastid){
        $scope.article.lastIdArticle = lastid.data.articles[0].idA;
    });
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

    $scope.article = {};
    $scope.insertArticle = function() {
        cfpLoadingBar.start();
        /** ****** **/
        var date = new Date();
        date = $filter('date')(date, "dd/MM/yyyy");
        $scope.titleARequired = '';
        $scope.longDescARequired = '';
        $scope.contentARequired = '';
        $scope.imgRequired ='';
        if (!$scope.article.titleA || !$scope.article.longDescA || !$scope.article.contentA) {
            if (!$scope.article.titleA) {
                $scope.titleARequired = 'Le titre est obligatoire';
            }
            if (!$scope.article.longDescA) {
                $scope.longDescARequired = 'Une description de votre article est requis';
            }
            if (!$scope.article.contentA) {
                $scope.contentARequired = 'Veuillez écrire le contenu de votre article';
            }
        } else {
            var articleData;
            if (typeof $scope.article.img !== 'undefined' && $scope.article.img)
                articleData = {"title":$scope.article.titleA,"longDesc":$scope.article.longDescA,"content":$scope.article.contentA,"date":date};
            else
                articleData = {
                    "title":$scope.article.titleA,"longDesc":$scope.article.longDescA,
                    "content":$scope.article.contentA,"date":date,'author':{"firstname" : "HURON",
                    "lastname" : "Kévin",
                    "mail" : "kevin@mail.com"}};
            Article.create(articleData);
        }



        /** ****** **/
        cfpLoadingBar.complete();
    }
});