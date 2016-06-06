/**
 * Created by kevinhuron on 01/06/2016.
 */
angular.module('ProfileCtrl', ['ProfileService']).controller('ProfileController', function($scope, profile, cfpLoadingBar) {
    profile.get().then(function(data) {
        $scope.users = data;
    })
});