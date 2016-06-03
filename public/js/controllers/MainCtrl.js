/**
 * Created by kevinhuron on 25/05/2016.
 */
angular.module('MainCtrl', ['MainService']).controller('MainController', function($scope, LastArticle) {
    LastArticle.get().then(function(articles) {
        /** ID **/
        $scope.id1 = articles.data[0]['idA'];
        $scope.id2 = articles.data[1]['idA'];
        $scope.id3 = articles.data[2]['idA'];
        $scope.id4 = articles.data[3]['idA'];
        /** TITLES **/
        $scope.titleOne = articles.data[0]['titleA'];
        $scope.titleTwo = articles.data[1]['titleA'];
        $scope.titleTree = articles.data[2]['titleA'];
        $scope.titleFour = articles.data[3]['titleA'];
        /** DESC **/
        $scope.descOne = articles.data[0]['longDescA'];
        $scope.descTwo = articles.data[1]['longDescA'];
        $scope.descTree = articles.data[2]['longDescA'];
        $scope.descFour = articles.data[3]['longDescA'];
        /** AUTHOR **/
        $scope.authorOne = articles.data[0]['author'][0]['lastname'] + ' ' + articles.data[0]['author'][0]['firstname'];
        $scope.authorTwo = articles.data[1]['author'][0]['lastname'] + ' ' + articles.data[1]['author'][0]['firstname'];
        $scope.authorTree = articles.data[2]['author'][0]['lastname'] + ' ' + articles.data[2]['author'][0]['firstname'];
        $scope.authorFour = articles.data[3]['author'][0]['lastname'] + ' ' + articles.data[3]['author'][0]['firstname'];
        /** DATE **/
        $scope.dateOne = articles.data[0]['date'];
        $scope.dateTwo = articles.data[1]['date'];
        $scope.dateTree = articles.data[2]['date'];
        $scope.dateFour = articles.data[3]['date'];
        /** IMG **/
        $scope.img1 = 'img/article/'+articles.data[0]['img'];
        $scope.img2 = 'img/article/'+articles.data[1]['img'];
        $scope.img3 = 'img/article/'+articles.data[2]['img'];
        $scope.img4 = 'img/article/'+articles.data[3]['img'];
    });
    $scope.image1 = 'img/img-1.jpg';
    $scope.image2 = 'img/img-2.jpg';
    $scope.image3 = 'img/img-3.jpg';
});