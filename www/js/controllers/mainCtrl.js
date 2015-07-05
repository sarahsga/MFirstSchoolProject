
app.controller('MainCtrl',function($scope, $ionicSideMenuDelegate, $ionicLoading, $http, $cordovaSocialSharing)
    {
    $scope.tabs_daily = true;
    $scope.badges = null;
    $scope.urlArray = null;
    $scope.badgeArray = null;
    $scope.stock = "";
    $scope.content = [];

    $scope.leagues = [];
    $scope.allLeaguesArray = [];
    $scope.leagueValues = {
        'trueValue': 0,
        'falseValue' : 0
    }
    $scope.selectAllLeagues = false;
    $scope.selectedLeagues = [];

    $scope.sideMenuOptions = {
        'Football Tips': true,
        'Horse Racing Tips': false,
        'NFL Tips': false,
        'Accuracy': false,
        'Settings': false,
        'Choose League': false,
        'Rate Us': false
    }

    $scope.urlArgs = {
        first: 'Football Tips',
        time: 'Daily',
        star: '4 Star',
        winType: 'Home Wins'
    }


    $scope.initialize = function() { // will run every time the app is initialized
        getBadges();
        $scope.getJson();
        //getLeagues();
    }

    $scope.$watch( function(scope) {return scope.urlArgs.winType},
        function() {$scope.getJson()})

    var url = [];

    var urlType = {
        'Football Tips' : {
            'Daily': {
                '4 Star' : {
                    'Home Wins': {
                        'url': 'http://www.cgtipster.com/api2/today4starhomewin.php',
                        'badge': 'HomeToday4'
                    },
                    'Away Wins': {
                        'url': 'http://www.cgtipster.com/api2/today4starawaywin.php',
                        'badge': 'AwayToday4'
                    },
                    'High Scoring': {
                        'url': 'http://www.cgtipster.com/api2/today4starhighscoring.php',
                        'badge': 'HighToday4'
                    },
                    'Low Scoring': {
                        'url': 'http://www.cgtipster.com/api2/today4starlowscoring.php',
                        'badge': 'LowToday4'
                    },
                    'BTTS': {
                        'url': 'http://www.cgtipster.com/api2/today4starbtts.php',
                        'badge': 'BTTSToday4'
                    }
                },
                '5 Star' : {
                    'Home Wins': {
                        'url': 'http://www.cgtipster.com/api2/today5starhomewin.php',
                        'badge': 'HomeToday5'
                    },
                    'Away Wins': {
                        'url': 'http://www.cgtipster.com/api2/today5starawaywin.php',
                        'badge': 'AwayToday5'
                    },
                    'High Scoring': {
                        'url': 'http://www.cgtipster.com/api2/today5starhighscoring.php',
                        'badge': 'HighToday5'
                    },
                    'Low Scoring': {
                        'url': 'http://www.cgtipster.com/api2/today5starlowscoring.php',
                        'badge': 'LowToday5'
                    },
                    'BTTS': {
                        'url': 'http://www.cgtipster.com/api2/today5starbtts.php',
                        'badge': 'BTTSToday5'
                    }
                }
            },
            'Weekly': {
                '4 Star' : {
                    'Home Wins': {
                        'url': 'http://www.cgtipster.com/api2/week4starhomewin.php',
                        'badge': 'HomeWeek4'
                    },
                    'Away Wins': {
                        'url': 'http://www.cgtipster.com/api2/week4starawaywin.php',
                        'badge': 'AwayWeek4'
                    },
                    'High Scoring': {
                        'url': 'http://www.cgtipster.com/api2/week4starhighscoring.php',
                        'badge': 'HighWeek4'
                    },
                    'Low Scoring': {
                        'url': 'http://www.cgtipster.com/api2/week4starlowscoring.php',
                        'badge': 'LowWeek4'
                    },
                    'BTTS': {
                        'url': 'http://www.cgtipster.com/api2/week4starbtts.php',
                        'badge': 'BTTSWeek4'
                    }
                },
                '5 Star' : {
                    'Home Wins': {
                        'url': 'http://www.cgtipster.com/api2/week5starhomewin.php',
                        'badge': 'HomeWeek5'
                    },
                    'Away Wins': {
                        'url': 'http://www.cgtipster.com/api2/week5starawaywin.php',
                        'badge': 'AwayWeek5'
                    },
                    'High Scoring': {
                        'url': 'http://www.cgtipster.com/api2/week5starhighscoring.php',
                        'badge': 'HighWeek5'
                    },
                    'Low Scoring': {
                        'url': 'http://www.cgtipster.com/api2/week5starlowscoring.php',
                        'badge': 'LowWeek5'
                    },
                    'BTTS': {
                        'url': 'http://www.cgtipster.com/api2/week5starbtts.php',
                        'badge': 'BTTSWeek5'
                    }
                }
            }
        },
        'Horse Racing Tips' : {
            'url': 'http://www.cgtipster.com/api2/horseracingtips.php',
            'badge': 'HorsesTips'
        },
        'NFL Tips': {
            'url': 'http://www.cgtipster.com/api2/NFL.php',
            'badge': 'NFLTips'
        },
        'Accuracy': {
            'url': 'http://www.cgtipster.com/api2/accuracy.php'
        },
        'Leagues': {
            'url': 'json/Leagues.json'
        },
        'Badges': {
            'url': 'http://www.cgtipster.com/api2/totaltipsNEW.php'
        }
    }



    var getBadges = function() {
        $ionicLoading.show({
            template: 'Loading...'
        });
            $.ajax({
                type: 'GET',
                url: urlType.Badges.url,
                dataType: 'jsonp',
                success: function (data) {
                    console.log("badges success.. data = " + JSON.stringify(data))
                    if (data.success == 1) {
                        console.log("success==1");
                        $scope.badges = data.stock[0];
                        console.log($scope.badges);
                        $scope.badges.FootballTips = parseInt($scope.badges.TodayTotal) + parseInt($scope.badges.WeekTotal);
                    }
                    $ionicLoading.hide();

                },
                fail: function (err) {
                    $scope.badges = "";
                    console.log(err.message);
                    $ionicLoading.hide();
                }
            });
    }

    $scope.getJson = function() {
        $scope.urlArray = [];
        $scope.badgeArray = [];
        $scope.stock = [];
        if ( $scope.urlArgs['first'] == 'Football Tips') {
            $scope.urlArray.push(urlType[$scope.urlArgs['first']][$scope.urlArgs.time]['4 Star'][$scope.urlArgs.winType]['url']);
            $scope.urlArray.push(urlType[$scope.urlArgs['first']][$scope.urlArgs.time]['5 Star'][$scope.urlArgs.winType]['url']);

            $scope.badgeArray.push(urlType[$scope.urlArgs['first']][$scope.urlArgs.time]['4 Star'][$scope.urlArgs.winType]['badge']);
            $scope.badgeArray.push(urlType[$scope.urlArgs['first']][$scope.urlArgs.time]['5 Star'][$scope.urlArgs.winType]['badge']);

        } else {
            $scope.urlArray.push(urlType[$scope.urlArgs['first']]['url']);
        }

        $ionicLoading.show({
            template: 'Loading...'
        });
        $scope.urlArgs.star = '4 Star';
        $scope.urlArray.forEach( function(url) {
            $.ajax({
                type: 'GET',
                url: url,
                dataType: 'jsonp',
                success: function (data) {
                    $scope.content[$scope.urlArray.indexOf(url)] = data;
                    if (data.success == 1) {
                        $scope.stock[$scope.urlArray.indexOf(url)] = data.stock
                    } else {
                        $scope.stock[$scope.urlArray.indexOf(url)] = ""
                    }
                    $ionicLoading.hide();
                },
                fail: function (err) {
                    $scope.stock = "";
                    console.log(err.message);
                    $ionicLoading.hide();
                }
            });
        });

    }

    $scope.getMessage = function() {
        var message = "";
        if ( $scope.urlArgs['first'] == 'Football Tips') {
            message = $scope.urlArgs.winType + " Tips\n\n";
            $scope.stock.forEach(function(stock) { // repeated for 4/5 star ... stock[0] for 4star, and stock[1] for 5star
                stock.forEach( function(record) { //repeat for each obj/result/team
                    message = message + record.HomeTeam + " - " + record.AwayTeam + " ," + record.Date + "\n\n"
                } )
            })
        } else if ( $scope.urlArgs['first'] == 'Horse Racing Tips') {
            message = "Horse Racing Tips\n\n";
            $scope.stock[0].forEach( function(record) {
                message = message + record.ID + ". " + record.Name + ", Tip by " + record.Tipster + " - " + record.Racecard + "\n\n";
            })
        } else if ( $scope.urlArgs['first'] == 'NFL Tips' ) {
            message = "NFL Tips\n\n";
            $scope.stock[0].forEach( function(record) {
                message = message + record.Match + " - " + record.Tip + " - " + record.Date + "\n\n";
            })
        }


        return message;
    }


    $scope.shareMessage = function() {
        var message = ""
        if ($scope.stock != "" && $scope.stock != null) {
            message = $scope.getMessage();
        }

        message = message + "For more tips, visit http://www.cgtipster.com \n\nor for android app\n\nhttp://play.google.com/store/apps/details?id=com.bigedev.cgtipster"
        $cordovaSocialSharing
            .share(message, 'cgTipster Tips') // Share via native share sheet
            .then(function(result) {
            }, function(err) {
                console.log("error" + JSON.stringify(err))
            })
    }

    var getLeagues = function() {
            $ionicLoading.show({
                template: 'Loading...'
            });
        $.ajax({
            url: urlType.Leagues.url,
            dataType: 'jsonp',
            cache : false,
            success: function (data) {
                if (data.success == 1) {
                    $scope.leagues = data.stock;
                    $scope.setLeaguesSame(false);

                    $scope.leagues.forEach( function(leagueObj) {
                        $scope.allLeaguesArray.push(leagueObj.League)
                    } )
                    $scope.selectedLeagues = $scope.allLeaguesArray;
                    console.log("selected leagues = " + $scope.selectedLeagues)
                }

                    $ionicLoading.hide();
            },
            fail: function (err) {
                $scope.leagues = [];
                console.log(err.message);
                $ionicLoading.hide();
            }
        });
    }

    $scope.setLeaguesSame = function(value) {

        $scope.leagues.forEach(function(leagueObj) {
            leagueObj.value = value;
        })
        if ( value == true) {
            $scope.selectAllLeagues = true;
        } else {
            $scope.selectAllLeagues = false;
        }
    }

    $scope.changeMenu = function(chosenMenu) {
        for (var property in $scope.sideMenuOptions) {
            if ($scope.sideMenuOptions.hasOwnProperty(property)) {
                $scope.sideMenuOptions[property] = false;
            }
        }

        $scope.sideMenuOptions[chosenMenu] = true;

        $scope.urlArgs['first'] = chosenMenu;
        if (chosenMenu == 'Football Tips') {
            $scope.urlArgs.time = 'Daily';
            $scope.urlArgs.star = '4 Star';
            $scope.urlArgs.winType = 'Home Wins';
        }
        toggleLeft();
    }

    var toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.goBackFromChooseLeague = function() {

        $scope.leagueValues.trueValue = 0;
        $scope.leagueValues.falseValue = 0;
        $scope.selectedLeagues = [];

        $scope.leagues.forEach( function(leagueObj) {
            if ( leagueObj.value == true ) {
                $scope.leagueValues.trueValue++;
                $scope.selectedLeagues.push(leagueObj.League);
            }
            else {
                $scope.leagueValues.falseValue++;
            }
        } )

        if ($scope.leagueValues.falseValue == $scope.leagues.length) {
            $scope.selectedLeagues = $scope.allLeaguesArray;
        }

        $scope.changeMenu('Football Tips');
    }

    $scope.goBackFromSettings = function() {
        $scope.changeMenu('Football Tips');
    }

    $scope.initialize();
});
