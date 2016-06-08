/**
 * Created by kevinhuron on 25/05/2016.
 */
angular.module('BlogCtrl', ['BlogService']).controller('BlogController', function($scope, Articles, cfpLoadingBar) {
    Articles.get().then(function(articles) {
        cfpLoadingBar.start();
        if (articles.data.user) {
            $scope.$parent.hidden = false;
            $scope.$parent.tohide = false;
            $scope.$parent.username = articles.data.user.local.firstname;
        }
        var allArticles = articles.data.articles;
        $scope.allArticles = allArticles;
        cfpLoadingBar.complete();
    });
});