/**
 * Created by kevinhuron on 01/06/2016.
 */
angular.module('ArticleCtrl', ['ArticleService']).controller('ArticleController', function($scope,$routeParams,$location,$route,Article,cfpLoadingBar) {
    var ifuser = false;
    Article.get($routeParams.idA).then(function(oneArticle) {
        cfpLoadingBar.start();
        /** ****** **/
        console.log(oneArticle);

        if (oneArticle.data.user) {
            ifuser = true;
        }
        if (oneArticle.data.article != "") {
            $scope.userArticle = oneArticle.data.article;
        } else {
            $scope.noArticle = "Aucun article";
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
        } else if (ifuser == false) {
            $location.path('/login');
        } else {
            console.log($scope.commentaire.idA);
            var comData = {"content":$scope.commentaire.content, "idA":$scope.commentaire.idA};
            Article.insertCommentaire(comData).then(function (response) {
                if (response.data == "OK") {
                    cfpLoadingBar.start();
                    $route.reload();
                    cfpLoadingBar.complete();
                }
            });
        }
    }
});


angular.module('NewArticleCtrl', ['ArticleService']).controller('NewArticleController', function($scope,$location,Article) {
    $scope.article = {};
    Article.getLastId().then(function(lastid){
        $scope.article.lastIdArticle = lastid.data.articles[0].idA;
        if (lastid.data.user) {
            if (lastid.data.user.local) {
                $scope.$parent.hidden = false;
                $scope.$parent.tohide = false;
                $scope.$parent.username = lastid.data.user.local.firstname;

            } else if (lastid.data.user.facebook) {
                $scope.$parent.hidden = false;
                $scope.$parent.tohide = false;
                $scope.$parent.username = lastid.data.user.facebook.name;
            }
        } else {
            $location.path('/login');
        }
    });
});

angular.module('EditArticleCtrl', ['ArticleService']).controller('EditArticleController', function($scope,$routeParams,$location,Article) {
    $scope.editarticle = {};
    Article.get($routeParams.idA).then(function(res) {
        console.log(res.data.article);
        $scope.editarticle.id = res.data.article.idA;
        $scope.editarticle.title = res.data.article.titleA;
        $scope.editarticle.longDesc = res.data.article.longDescA;
        $scope.editarticle.content = res.data.article.contentA;
        $scope.editarticle.img = res.data.article.img;
    });
});