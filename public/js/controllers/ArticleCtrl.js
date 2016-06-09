/**
 * Created by kevinhuron on 01/06/2016.
 */
angular.module('ArticleCtrl', ['ArticleService']).controller('ArticleController', function($scope,$routeParams,$route,Article,cfpLoadingBar) {
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
        $scope.commentaire.idA = article.idA;
        /** ****** **/
        cfpLoadingBar.complete();
    });

    $scope.commentaire = {};
    $scope.insertCom = function () {
        $scope.contentRequired = '';
        /** ****** **/
        if (!$scope.commentaire.content) {
            $scope.contentRequired = 'Veuillez saisir un commentaire';
        } else {
            console.log($scope.commentaire.idA);
            var comData = {"content":$scope.commentaire.content, "idA":$scope.commentaire.idA};
            Article.insertCommentaire(comData).then(function (response) {
                if (response.data == "OK") {
                    $route.reload();
                }
            });
        }
    }
});


angular.module('NewArticleCtrl', ['ArticleService']).controller('NewArticleController', function($scope,Article) {
    $scope.article = {};
    Article.getLastId().then(function(lastid){
        $scope.article.lastIdArticle = lastid.data.articles[0].idA;
    });
});