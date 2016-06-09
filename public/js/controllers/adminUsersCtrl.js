/**
 * Created by kevinhuron on 09/06/2016.
 */
angular.module('AdminUsersCtrl', ['AdminService']).controller('AdminUsersController', function($scope, Admin, cfpLoadingBar) {
    Admin.get().then(function(users){
        cfpLoadingBar.start();
        console.log(users);
        var Allusers = users.data.users;
        console.log(Allusers);
        $scope.Allusers = Allusers;
        //$scope.user.mail = Allusers.local.mail;
        cfpLoadingBar.complete();
    });

    $scope.mailUser = {};
    $scope.showUser = function() {
        console.log($scope.mailUser);
    }
});