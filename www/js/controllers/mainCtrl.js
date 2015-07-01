
app.controller('MainCtrl',function($scope, $ionicSideMenuDelegate, $ionicLoading, $http, $cordovaSocialSharing)
{
    $scope.tabs_daily = true;
    $scope.badges = null;
    $scope.urlArray = null;
    $scope.badgeArray = null;
    $scope.stock = "";
    $scope.content = {};

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
        getLeagues();
    }

    $scope.$watch( function(scope) {return scope.urlArgs.winType},
        function() {$scope.getJson()})

    var url = [];

    var urlType = {
        'Football Tips' : {
            'Daily': {
                '4 Star' : {
                    'Home Wins': {
                        'url': 'json/today4starhomewin.json',
                        'badge': 'HomeToday4'
                    },
                    'Away Wins': {
                        'url': 'json/today4starawaywin.json',
                        'badge': 'AwayToday4'
                    },
                    'High Scoring': {
                        'url': 'json/today4starhighscoring.json',
                        'badge': 'HighToday4'
                    },
                    'Low Scoring': {
                        'url': 'json/today4starlowscoring.json',
                        'badge': 'LowToday4'
                    },
                    'BTTS': {
                        'url': 'json/today4starbtts.json',
                        'badge': 'BTTSToday4'
                    }
                },
                '5 Star' : {
                    'Home Wins': {
                        'url': 'json/today5starhomewin.json',
                        'badge': 'HomeToday5'
                    },
                    'Away Wins': {
                        'url': 'json/today5starawaywin.json',
                        'badge': 'AwayToday5'
                    },
                    'High Scoring': {
                        'url': 'json/today5starhighscoring.json',
                        'badge': 'HighToday5'
                    },
                    'Low Scoring': {
                        'url': 'json/today5starlowscoring.json',
                        'badge': 'LowToday5'
                    },
                    'BTTS': {
                        'url': 'json/today5starbtts.json',
                        'badge': 'BTTSToday5'
                    }
                }
            },
            'Weekly': {
                '4 Star' : {
                    'Home Wins': {
                        'url': 'json/week4starhomewin.json',
                        'badge': 'HomeWeek4'
                    },
                    'Away Wins': {
                        'url': 'json/week4starawaywin.json',
                        'badge': 'AwayWeek4'
                    },
                    'High Scoring': {
                        'url': 'json/week4starhighscoring.json',
                        'badge': 'HighWeek4'
                    },
                    'Low Scoring': {
                        'url': 'json/week4starlowscoring.json',
                        'badge': 'LowWeek4'
                    },
                    'BTTS': {
                        'url': 'json/week4starbtts.json',
                        'badge': 'BTTSWeek4'
                    }
                },
                '5 Star' : {
                    'Home Wins': {
                        'url': 'json/week5starhomewin.json',
                        'badge': 'HomeWeek5'
                    },
                    'Away Wins': {
                        'url': 'json/week5starawaywin.json',
                        'badge': 'AwayWeek5'
                    },
                    'High Scoring': {
                        'url': 'json/week5starhighscoring.json',
                        'badge': 'HighWeek5'
                    },
                    'Low Scoring': {
                        'url': 'json/week5starlowscoring.json',
                        'badge': 'LowWeek5'
                    },
                    'BTTS': {
                        'url': 'json/week5starbtts.json',
                        'badge': 'BTTSWeek5'
                    }
                }
            }
        },
        'Horse Racing Tips' : {
            'url': 'json/horseracingtips.json',
            'badge': 'HorsesTips'
        },
        'NFL Tips': {
            'url': 'json/NFL.json',
            'badge': 'NFLTips'
        },
        'Accuracy': {
            'url': 'json/accuracy.json'
        },
        'Leagues': {
            'url': 'json/Leagues.json'
        },
        'Badges': {
            'url': 'json/totaltipsNEW.json'
        }
    }



    var getBadges = function() {
        $http.get(urlType.Badges.url).
            success(function(data, status, headers, config) {
                if (data.success == 1) {
                    $scope.badges = data.stock[0];
                    $scope.badges.FootballTips = parseInt($scope.badges.TodayTotal) + parseInt($scope.badges.WeekTotal);
                }
            }).
            error(function(data, status, headers, config) {
                $scope.badges = "";
                console.log("error");console.log(JSON.stringify(data));
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


        $scope.urlArray.forEach( function(url){
            $http.get(url).
                success(function(data, status, headers, config) {
                    $scope.content = data;
                    if (data.success == 1) {
                        $scope.stock[$scope.urlArray.indexOf(url)] = data.stock
                    } else {
                        $scope.stock[$scope.urlArray.indexOf(url)] = "";
                    }

                }).
                error(function(data, status, headers, config) {
                    $scope.stock = "";
                    console.log("error");console.log(JSON.stringify(data));
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
        } else if ( $scope.urlArgs['first'] == 'Horse Racing') {
            message = "Horse Racing Tips\n\n";
            $scope.stock[0].forEach( function(record) {
                message = message + record.ID + ". " + record.Name + ", Tip by " + record.Tipster + " - " + record.Racecard + "\n\n";
            })
        } else if ( $scope.urlArgs['first'] == 'NFL' ) {
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
        $http.get(urlType.Leagues.url).
            success(function(data, status, headers, config) {
                if (data.success == 1) {
                    $scope.leagues = data.stock;
                    $scope.setLeaguesSame(false);

                    $scope.leagues.forEach( function(leagueObj) {
                        $scope.allLeaguesArray.push(leagueObj.League)
                    } )
                    $scope.selectedLeagues = $scope.allLeaguesArray;
                }
            }).
            error(function(data, status, headers, config) {
                $scope.leagues = [];
                console.log("error");console.log(JSON.stringify(data));
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
        $scope.getJson();
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
