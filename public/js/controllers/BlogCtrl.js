/**
 * Created by kevinhuron on 25/05/2016.
 */
angular.module('BlogCtrl', ['BlogService']).controller('BlogController', function($scope, Articles, cfpLoadingBar) {
    Articles.get().then(function(articles) {
        cfpLoadingBar.start();
        console.log(articles);
        if (articles.data.user) {
            if (articles.data.user.local) {
                $scope.$parent.hidden = false;
                $scope.$parent.tohide = false;
                $scope.$parent.username = articles.data.user.local.firstname;

            } else if (articles.data.user.facebook) {
                $scope.$parent.hidden = false;
                $scope.$parent.tohide = false;
                $scope.$parent.username = articles.data.user.facebook.name;
            }
            /*if (articles.data.article != "") {
                $scope.userArticle = articles.data.article;
            } else {
                $scope.noArticle = "Aucun article";
            }*/
        }
        $scope.loading = false;
        var allArticles = articles.data.articles;
        $scope.allArticles = allArticles;

        $scope.data = $scope.allArticles.slice(0, 9);
        $scope.getMoreData = function () {
            $scope.data = $scope.allArticles.slice(0, $scope.data.length + 6);
            $scope.loading = true;
        };
        cfpLoadingBar.complete();
    });
});