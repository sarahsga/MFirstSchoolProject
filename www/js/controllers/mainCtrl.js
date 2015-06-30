
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

        $http.get('http://cgtipster.com/api/InsertDataUsingSP.php').
            success(function(data, status, headers, config) {
                $ionicLoading.hide();
                alert("success")
                alert(JSON.stringify(data))
                alert(JSON.stringify(status))
                alert(JSON.stringify(headers))
                alert(JSON.stringify(config))
            }).
            error(function(data, status, headers, config) {
                $ionicLoading.hide();
                alert("error")
                alert(JSON.stringify(data))
                alert(JSON.stringify(status))
                alert(JSON.stringify(headers))
                alert(JSON.stringify(config))
            });
    }
});
