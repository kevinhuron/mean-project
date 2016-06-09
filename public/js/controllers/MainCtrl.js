/**
 * Created by kevinhuron on 25/05/2016.
 */
angular.module('MainCtrl', ['MainService']).controller('MainController', function($scope, LastArticle, cfpLoadingBar) {
    LastArticle.get().then(function(home) {
        if (home.data.user) {
            if (home.data.user.local) {
                $scope.$parent.hidden = false;
                $scope.$parent.tohide = false;
                $scope.$parent.username = home.data.user.local.firstname;

            } else if (home.data.user.facebook) {
                $scope.$parent.hidden = false;
                $scope.$parent.tohide = false;
                $scope.$parent.username = home.data.user.facebook.name;
            }
            if (home.data.article != "") {
                $scope.userArticle = home.data.article;
            } else {
                $scope.noArticle = "Aucun article";
            }
        }
        cfpLoadingBar.start();
        /** ID **/
        $scope.id1 = home.data.articles[0]['idA'];
        $scope.id2 = home.data.articles[1]['idA'];
        $scope.id3 = home.data.articles[2]['idA'];
        $scope.id4 = home.data.articles[3]['idA'];
        /** TITLES **/
        $scope.titleOne = home.data.articles[0]['titleA'];
        $scope.titleTwo = home.data.articles[1]['titleA'];
        $scope.titleTree = home.data.articles[2]['titleA'];
        $scope.titleFour = home.data.articles[3]['titleA'];
        /** DESC **/
        $scope.descOne = home.data.articles[0]['longDescA'];
        $scope.descTwo = home.data.articles[1]['longDescA'];
        $scope.descTree = home.data.articles[2]['longDescA'];
        $scope.descFour = home.data.articles[3]['longDescA'];
        /** AUTHOR **/
        $scope.authorOne = home.data.articles[0]['author']['lastname'] + ' ' + home.data.articles[0]['author']['firstname'];
        $scope.authorTwo = home.data.articles[1]['author']['lastname'] + ' ' + home.data.articles[1]['author']['firstname'];
        $scope.authorTree = home.data.articles[2]['author']['lastname'] + ' ' + home.data.articles[2]['author']['firstname'];
        $scope.authorFour = home.data.articles[3]['author']['lastname'] + ' ' + home.data.articles[3]['author']['firstname'];
        /** DATE **/
        $scope.dateOne = home.data.articles[0]['date'];
        $scope.dateTwo = home.data.articles[1]['date'];
        $scope.dateTree = home.data.articles[2]['date'];
        $scope.dateFour = home.data.articles[3]['date'];
        /** IMG **/
        $scope.img1 = home.data.articles[0]['img'];
        $scope.img2 = home.data.articles[1]['img'];
        $scope.img3 = home.data.articles[2]['img'];
        $scope.img4 = home.data.articles[3]['img'];
        cfpLoadingBar.complete();
    });
    $scope.image1 = 'img/img-1.jpg';
    $scope.image2 = 'img/img-2.jpg';
    $scope.image3 = 'img/img-3.jpg';
});