/**
 * Created by kevinhuron on 01/06/2016.
 */
angular.module('UsersCtrl', ['UsersService']).controller('UsersController', function($scope, $timeout, $location,  user, cfpLoadingBar) {


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
                var message = registr.data.message;
                var type = registr.data.type;
                if (type == "mailUse") {
                    $scope.registrationFailed = message;
                    $scope.user = null;
                } else {
                    $scope.registrationSuccess = 'Inscription réussi ! Bonjour ' + registr.config.data.lastname + '. Vous êtes désormais connecté. Redirection...';
                    $scope.usr = null;
                    cfpLoadingBar.set(0.5);
                    cfpLoadingBar.start();
                    $timeout(function() {
                        $location.path('/profile');
                    }, 1500);
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
        } else {
            logData = {"mail":$scope.usr.mail, "passwd":$scope.usr.passwd};
            user.log(logData).then(function(log) {
                var message = log.data.message;
                var type = log.data.type;
                if (type == "notf") {
                    $scope.loginFailed = message;
                    $scope.usr = null;
                } else if (type == "invP") {
                    $scope.loginFailed = message;
                    $scope.usr = null;
                } else {
                    $scope.loginSuccess = 'Connexion réussi ! Redirection ...';
                    $scope.usr = null;
                    cfpLoadingBar.set(0.5);
                    cfpLoadingBar.start();
                    $timeout(function() {
                        $location.path('/profile');
                    }, 1500);
                }
            });
        }
        cfpLoadingBar.complete();
    };
    /** END LOGIN **/
});