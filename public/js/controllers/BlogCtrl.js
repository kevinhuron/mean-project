/**
 * Created by kevinhuron on 25/05/2016.
 */
angular.module('BlogCtrl', ['BlogService']).controller('BlogController', function($scope, Articles, cfpLoadingBar) {
    Articles.get().then(function(articles) {
        cfpLoadingBar.start();
        var allArticles = articles.data;
        $scope.allArticles = allArticles;
        cfpLoadingBar.complete();
    });
});