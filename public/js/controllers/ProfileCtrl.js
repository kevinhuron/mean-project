/**
 * Created by kevinhuron on 01/06/2016.
 */
angular.module('ProfileCtrl', ['ProfileService']).controller('ProfileController', function($scope, $route, profile, cfpLoadingBar) {
    profile.get().then(function(data) {
        cfpLoadingBar.start();
        /** ****** **/
        console.log(data);
        if (data.data.user.local) {
            $scope.$parent.hidden = false;
            $scope.$parent.tohide = false;
            $scope.$parent.username = data.data.user.local.firstname;

            $scope.user.firstname = data.data.user.local.lastname;
            $scope.user.lastname = data.data.user.local.firstname;
            $scope.user.mail = data.data.user.local.mail;
            if (data.data.user.local.accessLvl == "admin") {
                $scope.$parent.hiddenAdmin = false;
            }
            if (data.data.article != "") {
                $scope.userArticle = data.data.article;
            } else {
                $scope.noArticle = "Aucun article";
            }
        } else if (data.data.user.facebook) {
            $scope.$parent.hidden = false;
            $scope.$parent.tohide = false;
            $scope.$parent.username = data.data.user.facebook.name;
            if (data.data.article != "") {
                $scope.userArticle = data.data.article;
            } else {
                $scope.noArticle = "Aucun article";
            }
        }
        /** ****** **/
        cfpLoadingBar.complete();
    });
    $scope.user = {};
    var userData;
    $scope.update = function () {
        cfpLoadingBar.start();
        /** ****** **/
        $scope.firstnameRequired = '';
        $scope.lastnameRequired = '';
        $scope.mailRequired = '';
        $scope.passwordRequired = '';
        $scope.confirmPasswordRequired = '';
        $scope.updateFailed = '';
        $scope.updateSuccess ='';
        /** ****** **/
        userData = {"firstname":$scope.user.firstname, "lastname":$scope.user.lastname, "mail":$scope.user.mail, "password":$scope.user.confirmpassword};
        profile.update(userData);
        $route.reload();
        /** ****** **/
        cfpLoadingBar.complete();
    }
});