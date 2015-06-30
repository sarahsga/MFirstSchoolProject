var app =  angular.module('tipster', ['ionic', 'ngCordova'])

app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('main', {
            url: '/main',
            templateUrl: 'templates/main.html',
            controller: 'MainCtrl'
        })

    $urlRouterProvider.otherwise('/main');
});

app.directive('mySideMenuContent', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/my-side-menu-content.html'
    }
})

app.directive('myTabsContent', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/my-tabs-content.html'
    }
})