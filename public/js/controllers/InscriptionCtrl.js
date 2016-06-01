/**
 * Created by kevinhuron on 01/06/2016.
 */
angular.module('InscriptionCtrl', ['InscriptionService']).controller('InscriptionController', function($scope, inscription) {
    /*Article.get($routeParams.idA).then(function(oneArticle) {
        var article = oneArticle.data;
        $scope.allArticles = article;
    });*/
    $scope.create = function(user) {
        inscription.create(user);
    };
});