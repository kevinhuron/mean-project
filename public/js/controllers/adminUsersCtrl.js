/**
 * Created by kevinhuron on 09/06/2016.
 */
angular.module('AdminUsersCtrl', ['AdminService']).controller('AdminUsersController', function($scope,$route, Admin,$routeParams, cfpLoadingBar) {
    Admin.get().then(function(users){
        cfpLoadingBar.start();
        var Allusers = users.data.users;
        $scope.Allusers = Allusers;
        cfpLoadingBar.complete();
    });

    $scope.EditUser = {};
    console.log($routeParams.mailUser);
    if ($routeParams.mailUser) {
        Admin.getInfoByMail($routeParams.mailUser).then(function(data){
            $scope.EditUser.firstname = data.data.theuser.local.lastname;
            $scope.EditUser.lastname = data.data.theuser.local.firstname;
            $scope.EditUser.mail = data.data.theuser.local.mail;
            if (data.data.theuser.local.accessLvl == "admin") {
                $scope.EditUser.role = 'admin';
            } else {
                $scope.EditUser.role = 'abonne';
            }

        });
    } else {

    }
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
        userData = {"firstname":$scope.EditUser.firstname, "lastname":$scope.EditUser.lastname, "mail":$scope.EditUser.mail, "password":$scope.EditUser.confirmpassword, "accessLvl":$scope.EditUser.role};
        Admin.update(userData);
        $route.reload();
        /** ****** **/
        cfpLoadingBar.complete();
    }
});