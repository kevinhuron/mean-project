/**
 * Created by kevinhuron on 25/05/2016.
 */
angular.module('BlogCtrl', ['BlogService']).controller('BlogController', function($scope, Articles) {
    //var Nerd2 = Nerd.promise;
    Articles.get().then(function(param){
        $scope.tagline = param.data;
        //console.log(param.data);
    });
    // $scope.tagline = 'Nothing beats a pocket protector!';
});