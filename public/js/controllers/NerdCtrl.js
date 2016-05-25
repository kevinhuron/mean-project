/**
 * Created by kevinhuron on 25/05/2016.
 */
angular.module('NerdCtrl', ['NerdService']).controller('NerdController', function($scope, Nerd) {
    //var Nerd2 = Nerd.promise;
    Nerd.get().then(function(param){
        $scope.tagline = param.data;
        //console.log(param.data);
    });
    // $scope.tagline = 'Nothing beats a pocket protector!';
});