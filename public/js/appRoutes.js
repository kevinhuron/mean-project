/**
 * Created by kevinhuron on 25/05/2016.
 */
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
    // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // blog page that will use the NerdController
        .when('/blog', {
            templateUrl: 'views/blog.html',
            controller: 'BlogController'
        })

        .when('/blog/article/:idA', {
            templateUrl: 'views/article.html',
            controller: 'ArticleController'
        });
    $locationProvider.html5Mode(true);
}]);