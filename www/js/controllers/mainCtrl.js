
app.controller('MainCtrl',function($scope, $ionicSideMenuDelegate)
{
    $scope.tabs_daily = true;
    $scope.four_star = true;
    $scope.five_star = false;

    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
});
