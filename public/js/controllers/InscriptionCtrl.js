/**
 * Created by kevinhuron on 01/06/2016.
 */
angular.module('InscriptionCtrl', ['InscriptionService']).controller('InscriptionController', function($scope, inscription) {
    /*Article.get($routeParams.idA).then(function(oneArticle) {
        var article = oneArticle.data;
        $scope.allArticles = article;
    });*/
    /*$scope.create = function(user) {
        inscription.create(user);
    };*/
    // process the form
    $scope.user = {};
    var userData;
    $scope.processForm = function() {
        $scope.firstnameRequired = '';
        $scope.lastnameRequired = '';
        $scope.mailRequired = '';
        $scope.passwordRequired = '';
        if (!$scope.user.firstname || !$scope.user.lastname || !$scope.user.mail || !$scope.user.password) {
            if (!$scope.user.firstname) {
                $scope.firstnameRequired = 'Votre Nom est requis';
            }
            if (!$scope.user.lastname) {
                $scope.lastnameRequired = 'Votre prénom est requis';
            }
            if (!$scope.user.mail) {
                $scope.mailRequired = 'Votre mail est requis et vous servira à vous connecter';
            }
            if (!$scope.user.password) {
                $scope.passwordRequired = 'Un mot de passe est requis pour vous connecter';
            }
        } else {
            userData = {"firstname":$scope.user.firstname, "lastname":$scope.user.lastname, "mail":$scope.user.mail, "passwd":$scope.user.password};
            inscription.create(userData);
        }
    };
        /*inscription.create($scope.user)

        .success(function(data) {
            console.log(data);

            if (!data.success) {
                // if not successful, bind errors to error variables
                $scope.errorName = data.errors.name;
                $scope.errorSuperhero = data.errors.superheroAlias;
            } else {
                // if successful, bind success message to message
                $scope.message = data.message;
            }
        });
    };*/
});