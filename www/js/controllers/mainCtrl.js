
app.controller('MainCtrl',function($scope, $ionicSideMenuDelegate)
{
    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
});
