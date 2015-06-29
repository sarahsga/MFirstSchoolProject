
app.controller('TabCtrl',function($scope, $ionicSideMenuDelegate)
{

    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
});
