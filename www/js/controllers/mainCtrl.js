
app.controller('MainCtrl',function($scope, $cordovaToast, $ionicPlatform, $cordovaDialogs, $cordovaNetwork, $filter, $ionicSideMenuDelegate, $ionicLoading, $http, $cordovaSocialSharing, $ionicPopup)
{
    var popUp = null;
    var wifiAlert = {
        'message':'No Internet Connection',
        'title':'Network Error',
        'button': 'OK'
    }
    $scope.popType = ''
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

    $scope.filteredResult = [];


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

    $scope.accuracyorder = []

    $scope.initialize = function() { // will run every time the app is initialized
        getBadges();
        getAccuracy();

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

    $scope.accuracy = {
        '5StarHome' : {
            name: '5 Star Home Wins',
            percent: '0'
        },
        '4StarHome' : {
            name: '4 Star Home Wins',
            percent: '0'
        },
        '5StarAway' : {
            name: '5 Star Away Wins',
            percent: '0'
        },
        '4StarAway' : {
            name: '4 Star Away Wins',
            percent: '0'
        },
        '5StarHigh' : {
            name: '5 Star High Scoring',
            percent: '0'
        },
        '4StarHigh' : {
            name: '4 Star High Scoring',
            percent: '0'
        },
        '5StarLow' : {
            name: '5 Star Low Scoring',
            percent: '0'
        },
        '4StarLow' : {
            name: '4 Star Low Scoring',
            percent: '0'
        },
        '5StarBTTS' : {
            name: '5 Star BTTS',
            percent: '0'
        },
        '4StarBTTS' : {
            name: '4 Star BTTS',
            percent: '0'
        }
    }


    var getBadges = function() {

        if ( $cordovaNetwork.getNetwork() == Connection.NONE) {
            $cordovaDialogs.alert(wifiAlert.message, wifiAlert.title, wifiAlert.button)
            $scope.badges = [];
        } else {
            $ionicLoading.show({
                template: 'Loading...'
            });

            $.ajax({
                type: 'GET',
                url: urlType.Badges.url,
                dataType: 'jsonp',
                success: function (data) {
                    console.log(urlType.Badges.url + " === " + JSON.stringify(data))
                    if (data.success == 1) {
                        console.log("success==1");
                        $scope.badges = data.stock[0];
                        console.log($scope.badges);
                        $scope.badges.FootballTips = parseInt($scope.badges.TodayTotal) + parseInt($scope.badges.WeekTotal);
                        getLeagues();
                    }
                    $ionicLoading.hide();
                    //$cordovaToast.showLongBottom("Badge success")

                },
                fail: function (err) {
                    $scope.badges = "";
                    console.log(err.message);
                    $ionicLoading.hide();
                    //$cordovaToast.showLongBottom("Badge fail")
                }
            });

        }
    }

    var getAccuracy = function() {

        if ($cordovaNetwork.getNetwork() == Connection.NONE) {
            $cordovaDialogs.alert(wifiAlert.message, wifiAlert.title, wifiAlert.button)
            $scope.badges = [];
        } else {
            $ionicLoading.show({
                template: 'Loading...'
            });

            $.ajax({
                type: 'GET',
                url: urlType.Accuracy.url,
                dataType: 'jsonp',
                success: function (data) {
                    if (data.success == 1) {

                        for (var property in data.stock[0]) {
                            if (data.stock[0].hasOwnProperty(property)) {
                                $scope.accuracy[property].percent = data.stock[0][property]
                            }
                            $scope.accuracyorder.push($scope.accuracy[property].name)
                        }


                        console.log('$scope.accuracy = ' + JSON.stringify($scope.accuracy));
                        console.log('$scope.accuracyOrder = ' + JSON.stringify($scope.accuracyorder));

                    }
                },
                fail: function (err) {

                }
            });
        }
    }

    $scope.getJson = function() {
        $scope.urlArray = [];
        $scope.badgeArray = [];
        $scope.stock = [];
        var counter = 0;
        var countNumb = 1;
        if ( $scope.urlArgs['first'] == 'Football Tips') {
            $scope.urlArray.push(urlType[$scope.urlArgs['first']][$scope.urlArgs.time]['4 Star'][$scope.urlArgs.winType]['url']);
            $scope.urlArray.push(urlType[$scope.urlArgs['first']][$scope.urlArgs.time]['5 Star'][$scope.urlArgs.winType]['url']);

            $scope.badgeArray.push(urlType[$scope.urlArgs['first']][$scope.urlArgs.time]['4 Star'][$scope.urlArgs.winType]['badge']);
            $scope.badgeArray.push(urlType[$scope.urlArgs['first']][$scope.urlArgs.time]['5 Star'][$scope.urlArgs.winType]['badge']);
            countNumb = 2;
            $scope.filteredResult = [];
        } else {
            $scope.urlArray.push(urlType[$scope.urlArgs['first']]['url']);
        }
        $scope.urlArgs.star = '4 Star';

        if ( $cordovaNetwork.getNetwork() == Connection.NONE) {
            $cordovaDialogs.alert(wifiAlert.message, wifiAlert.title, wifiAlert.button)

            $scope.filteredResult = []
        } else {
            $ionicLoading.show({
                template: 'Loading...'
            });

            $scope.urlArray.forEach( function(url) {
                $.ajax({
                    type: 'GET',
                    url: url,
                    dataType: 'jsonp',
                    success: function (data) {
                        var index = $scope.urlArray.indexOf(url);
                        counter++;
                        $scope.content[index] = data;
                        if (data.success == 1) {
                            $scope.stock[index] = data.stock;
                            console.log(url + " === " + JSON.stringify($scope.stock[index]));
                            if ($scope.urlArgs.first == 'Football Tips') {
                                $scope.filteredResult[index] = $filter('LeagueFilter')(data.stock, $scope.selectedLeagues)
                                console.log("filtered length = " + $scope.filteredResult[index].length + " ==== " + JSON.stringify($scope.filteredResult[index]))
                            }
                        } else {
                            $scope.stock[index] = ""
                            $scope.filteredResult[index] = [];
                        }
                        if (counter == countNumb) {
                            if ($scope.urlArgs.first == 'NFL Tips') {
                                console.log('NFL...' + url + ' .... ' + JSON.stringify($scope.stock[0]))
                            }
                            $ionicLoading.hide();
                            //$cordovaToast.showLongBottom("json success")
                        }
                    },
                    fail: function (err) {
                        counter++;
                        $scope.stock = "";
                        console.log(err.message);
                        if (counter == countNumb) {
                            $ionicLoading.hide();
                            //$cordovaToast.showLongBottom("json fail")
                        }
                    }
                });
            });
        }

    }

    $scope.getMessage = function() {
        var message = "";
        if ( $scope.urlArgs['first'] == 'Football Tips') {
            message = $scope.urlArgs.winType + " Tips\n\n";
            $scope.stock.forEach(function(stock) { // repeated for 4/5 star ... stock[0] for 4star, and stock[1] for 5star
                if (stock != "") {
                    stock.forEach( function(record) { //repeat for each obj/result/team
                        message = message + record.HomeTeam + " - " + record.AwayTeam + " ," + record.Date + "\n\n"
                    } )
                }
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
            console.log("stock scope is not empty.. message.. " + JSON.stringify($scope.stock))

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

        if ( $cordovaNetwork.getNetwork() == Connection.NONE) {
            $cordovaDialogs.alert(wifiAlert.message, wifiAlert.title, wifiAlert.button)

            $scope.leagues = []
            $scope.selectedLeagues = []
            $scope.changeMenu();
        } else {
            $ionicLoading.show({
                template: 'Loading...'
            });

            $http.get(urlType.Leagues.url).
                success(function(data, status, headers, config) {
                    if (data.success == 1) {
                        $scope.leagues = data.stock;
                        $scope.setLeaguesSame(false);

                        $scope.leagues.forEach(function (leagueObj) {
                            $scope.allLeaguesArray.push(leagueObj.League)
                        })
                        $scope.selectedLeagues = $scope.allLeaguesArray;
                        console.log("selected leagues = " + $scope.selectedLeagues)
                        $scope.getJson();
                        //$cordovaToast.showLongBottom("league success")
                    }
                }).
                error(function (data, status, headers, config) {
                    $scope.leagues = [];
                    console.log(JSON.stringify(data));
                    $ionicLoading.hide();
                    //$cordovaToast.showLongBottom("league fail")
                })
        }
    }


    //$.ajax({
        //    url: urlType.Leagues.url,
        //    dataType: 'jsonp',
        //    cache : false,
        //    success: function (data) {
        //        if (data.success == 1) {
        //            $scope.leagues = data.stock;
        //            $scope.setLeaguesSame(false);
        //
        //            $scope.leagues.forEach( function(leagueObj) {
        //                $scope.allLeaguesArray.push(leagueObj.League)
        //            } )
        //            $scope.selectedLeagues = $scope.allLeaguesArray;
        //            console.log("selected leagues = " + $scope.selectedLeagues)
        //        }
        //
        //        $ionicLoading.hide();
        //    },
        //    fail: function (err) {
        //        $scope.leagues = [];
        //        console.log(err.message);
        //        $ionicLoading.hide();
        //    }
        //});

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
        $scope.getJson();
    }

    $scope.goBackFromSettings = function() {
        $scope.changeMenu('Football Tips');
    }

    $scope.openPopup = function(popType) {
        $scope.popType = popType;

        popUp = $ionicPopup.show({
            templateUrl: "templates/" + popType + ".html",
            scope: $scope
        });
    }

    $scope.closePopup = function(itemType) {
        if ( $scope.popType == 'popStar') {
            $scope.urlArgs.star = itemType;
        } else if ( $scope.popType == 'popWin') {
            $scope.urlArgs.winType = itemType;
        }
        popUp.close();
    }

    $ionicPlatform.ready(function() {
        $scope.initialize();
    });
});
