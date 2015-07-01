
app.controller('MainCtrl',function($scope, $ionicSideMenuDelegate, $ionicLoading, $http)
{
    $scope.tabs_daily = true;
    $scope.four_star = true;
    $scope.five_star = false;

    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.getJSON = function() {

        $ionicLoading.show({
            template: 'Loading...'
        });

        $.ajax({
            url: 'http://cgtipster.com/api2/week4starhighscoring.php',
            dataType:'jsonp',
            success:function(data){
                console.log(data)
            },
            fail: function(err)
            {
                console.log(err.message);
            }
        });
    }

});
