
app.controller('HomeCtrl',function($scope, $ionicSideMenuDelegate)
{
    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
});
