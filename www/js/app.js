var app =  angular.module('tipster', ['ionic', 'ngCordova'])

app.run(function($ionicPlatform, $rootScope) {
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

app.directive('chooseLeague', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/choose-league.html'
    }
})

app.filter('TitleFilter', function() {
    console.log("start")
    return function(items) {
        var result = {};
        angular.forEach(items, function(value, key) {
            if (value == true) {
                result[key] = value;
            }
        });
        return result;
    };
});

app.filter('LeagueFilter', function() {

    return function (items, selectedLeagues) {
        var result = []
        angular.forEach(items, function (i) {
            if (selectedLeagues.indexOf(i.League) != -1) {
                result.push(i)
            }
        });
        return result;

    }
});

app.filter('myOrderBy', function() {
    return function(items, field) {
        console.log(items);
        var filtered = [];
        angular.forEach(items, function(item) {
            filtered.push(item);
        });

        console.log("my filtered = " + filtered)
        filtered.sort(function (a, b) {
            return (a[field] > b[field] ? 1 : -1);
        });
        console.log(JSON.stringify(filtered))
        return filtered;
    };
});
