/**
 * Created by kevinhuron on 01/06/2016.
 */
angular.module('ProfileCtrl', ['ProfileService']).controller('ProfileController', function($scope, profile, cfpLoadingBar) {
    profile.get().then(function(data) {
        if (data.data.user) {
            $scope.$parent.hidden = false;
            $scope.$parent.tohide = false;
            $scope.$parent.username = data.data.user.local.firstname;
            /** ****** **/
            $scope.lastname = data.data.user.local.lastname;
            $scope.firstname = data.data.user.local.firstname;
            $scope.mail = data.data.user.local.mail;
        }
        if (data.data.article != "") {
            $scope.userArticle = data.data.article;
        } else {
            $scope.noArticle = "Aucun article";
        }
    })
});