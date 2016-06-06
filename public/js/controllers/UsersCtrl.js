/**
 * Created by kevinhuron on 01/06/2016.
 */
angular.module('UsersCtrl', ['UsersService']).controller('UsersController', function($scope, user, cfpLoadingBar) {


    /** INSCRIPTION **/
    $scope.user = {};
    $scope.usr = {};
    var userData;
    var logData;
    $scope.processInscription = function() {
        cfpLoadingBar.start();
        $scope.firstnameRequired = '';
        $scope.lastnameRequired = '';
        $scope.mailRequired = '';
        $scope.passwordRequired = '';
        $scope.registrationFailed = '';
        $scope.registrationSuccess ='';
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
            user.create(userData).then(function(registr) {
                if (registr.data == "OK") {
                    $scope.registrationSuccess = 'Inscription réussi ! Bonjour ' + registr.config.data.lastname + '. Vous pouvez désormais vous connecter' ;
                    $scope.user = null;
                } else {
                    $scope.registrationFailed = 'Votre inscription à échoué ! Vérifié vos informations (Il se peut que votre email soit déjà dans notre base)';
                    $scope.user = null;
                }
            });
        }
        cfpLoadingBar.complete();
    };
    /** END INSCRIPTION **/

    /** LOGIN **/
    $scope.loginUsr = function() {
        cfpLoadingBar.start();
        $scope.mailRequired = '';
        $scope.passwordRequired = '';
        $scope.loginFailed = '';
        $scope.loginSuccess ='';
        if (!$scope.usr.mail || !$scope.usr.passwd) {
            if (!$scope.usr.mail) {
                $scope.mailRequired = 'Votre mail est requis pour vous connecter';
            }
            if (!$scope.usr.passwd) {
                $scope.passwordRequired = 'Votre mot de passe est requis pour vous connecter';
            }
        }/* else {
            logData = {"mail":$scope.usr.mail, "passwd":$scope.usr.passwd};
            user.log(logData).then(function(log) {
                var logged = log.data;
                if (logged == "NONOK") {

                    $scope.loginFailed = 'Echec de la connexion, identifiant ou mot de passe incorrect !';
                    $scope.usr = null;
                } else {
                    $scope.loginSuccess = 'Connexion OK';
                    $scope.usr = null;
                }
            });
        }*/
        cfpLoadingBar.complete();
    };
    /** END LOGIN **/
});