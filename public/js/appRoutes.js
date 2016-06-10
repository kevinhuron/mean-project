/**
 * Created by kevinhuron on 25/05/2016.
 */
angular.module('appRoutes', ['angular-loading-bar']).config(['$routeProvider', '$locationProvider', 'cfpLoadingBarProvider',
    function($routeProvider, $locationProvider, cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeBar = true;
        cfpLoadingBarProvider.includeSpinner = false;
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
        })

        .when('/inscription', {
            templateUrl: 'views/inscription.html',
            controller: 'UsersController'
        })

        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'UsersController'
        })

        .when('/profile', {
            templateUrl: 'views/profile.html',
            controller: 'ProfileController'
        })

        .when('/newArticle', {
            templateUrl: 'views/newArticle.html',
            controller: 'NewArticleController'
        })

        .when('/article/edit/:idA', {
            templateUrl: 'views/editArticle.html',
            controller: 'EditArticleController'
        })

        .when('/admin/users', {
            templateUrl: 'views/adminUsers.html',
            controller: 'AdminUsersController'
        })

        .when('/admin/users/:mailUser', {
            templateUrl: 'views/adminUsers.html',
            controller: 'AdminUsersController'
        })

        .when('/404', {
            templateUrl: 'views/404.html'
            //controller: 'UsersController'
        })

        .otherwise({redirectTo: '/404'});

        $locationProvider.html5Mode(true);
}]);