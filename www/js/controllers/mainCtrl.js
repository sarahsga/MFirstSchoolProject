
app.controller('MainCtrl',function($scope, $filter, $rootScope, $cordovaToast, $cordovaNetwork, $ionicPlatform, $cordovaDialogs, $cordovaNetwork, $filter, $ionicSideMenuDelegate, $ionicLoading, $http, $cordovaSocialSharing, $ionicPopup)
{

    $scope.notifyTime = {
        'time': new Date(),
        'disable': false,
        'schedule': new Date()
    }

    var notificationEnabled= true
    var defaultAdMobOptions = null;
    var popUp = null;
    var wifiAlert = {
        'message':'No Internet Connection',
        'title':'Network Error',
        'button': 'OK'
    }

    $scope.loading = {
        'tips': false,
        'stats' : false,
        'accuracy' : false,
        'leagues' : false
    }

    ///////////// for admob //////////////////

    var banner = {
        'created': false,
        'removed': false
    }

    ///////////// //////////////////

    var itemsInStoreCount = 0;
    var purchaseCounter = 0;
    $scope.newsFeed = '';
    $scope.showNewsFeed = false;
    $scope.stats = [];
    $scope.noFilterTips = [];
    $scope.internet = true;
    $scope.chooseLeagueStatsBool = false;
    $scope.leagueSearch = {value: ''}
    $scope.statsLeague = ''
    $scope.statsLeagueHeader = '';

    //$scope.online = false;
    $scope.popType = ''
    $scope.badges = "";
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
        winType: 'Home Wins',
        statsType: 'Main Table'
    }

    $scope.accuracyorder = []
    $scope.statsOrder = ['Pld','P','W','D','L','GF','GA','GD']
    //$scope.statsOrder = []

    var purchaseItem;
    $scope.purchase = {
        '5startips': {
            value: false,
            dirtyBit: false
        },
        'Horse Racing Tips': {
            value: false,
            dirtyBit: false
        },
        'NFL Tips': {
            value: false,
            dirtyBit: false
        },
        'Boxing Tips': {
            value: false,
            dirtyBit: false
        },
        'Cricket Tips': {
            value: false,
            dirtyBit: false
        },
        'Tennis Tips': {
            value: false,
            dirtyBit: false
        },
        'entireapp': {
            value: false,
            dirtyBit: false
        }
    }

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
        'Tennis Tips': {
            'url': 'http://www.cgtipster.com/api2/Tennis.php',
            'badge': 'NFLTips'
        },
        'Cricket Tips': {
            'url': 'http://www.cgtipster.com/api2/Cricket.php',
            'badge': 'NFLTips'
        },
        'NFL Tips': {
            'url': 'http://www.cgtipster.com/api2/NFL.php',
            'badge': 'NFLTips'
        },
        'Boxing Tips': {
            'url': 'http://www.cgtipster.com/api2/Boxing.php',
            'badge': 'NFLTips'
        },
        'Accuracy': {
            'url': 'http://www.cgtipster.com/api2/accuracy.php'
        },
        'Leagues': {
            'url': 'http://cgtipster.com/api2/Leagues.php'
        },
        'Badges': {
            'url': 'http://www.cgtipster.com/api2/totaltipsNEW.php'
        },
        'Stats': {
            'Main Table' : {
                'url': 'http://www.cgtipster.com/api2/MainTable.php'
            },
            'Home Table' : {
                'url': 'http://www.cgtipster.com/api2/HomeTable.php'
            },
            'Away Table' : {
                'url': 'http://www.cgtipster.com/api2/AwayTable.php'
            },
            'Last 5': {
                'url': 'http://www.cgtipster.com/api2/Last5.php'
            },
            'Last 5 Home': {
                'url': 'http://www.cgtipster.com/api2/Last5Home.php'
            },
            'Last 5 Away': {
                'url': 'http://www.cgtipster.com/api2/Last5Away.php'
            }
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

    removeAd = function() {
        if (banner.created == true) {
            AdMob.removeBanner();
            banner.created = false;
            banner.removed = true;
        }
    }

    var initialize = function() { // will run every time the app is initialized

        itemsInStoreCount = Object.keys($scope.purchase).length; // to count number of properties of object purchase
        if ($scope.badges == "") {
            //console.log("abt to init")

            getBadges();
            getAccuracy();
            getLeagues();

            if (window.store) {
                store.register({
                    id: "5startips",
                    alias: "5startips",
                    type: store.NON_CONSUMABLE
                });

                store.register({
                    id: "horseracingtips",
                    alias: "Horse Racing Tips",
                    type: store.NON_CONSUMABLE
                });

                store.register({
                    id: "nfltips",
                    alias: "NFL Tips",
                    type: store.NON_CONSUMABLE
                });

                store.register({
                    id: "boxingtips",
                    alias: "Boxing Tips",
                    type: store.NON_CONSUMABLE
                });

                store.register({
                    id: "crickettips",
                    alias: "Cricket Tips",
                    type: store.NON_CONSUMABLE
                });

                store.register({
                    id: "tennistips",
                    alias: "Tennis Tips",
                    type: store.NON_CONSUMABLE
                });

                store.register({
                    id: "entireapp",
                    alias: "entireapp",
                    type: store.NON_CONSUMABLE
                });

                store.ready(function () {
                    console.log("\\o/ STORE READY \\o/");
                });

                store.refresh();

                store.when("5startips").updated(function (p) {
                    console.log("updated prod 5startips = " + JSON.stringify(p));
                    if (p.state == 'owned') {
                        $scope.purchase['5startips'].value = true;
                    }

                    if ( ++purchaseCounter >= itemsInStoreCount - 1 ) {
                        $scope.showNewsFeed = true;

                        removeAd();

                    }
                });

                store.when("Horse Racing Tips").updated(function (p) {
                    console.log("updated Horse Racing Tips = " + JSON.stringify(p))
                    if (p.state == 'owned') {
                        $scope.purchase['Horse Racing Tips'].value = true;
                        if ($scope.purchase.entireapp.value != true && $scope.purchase['Horse Racing Tips'].dirtyBit == true) {
                            $scope.changeMenu('Horse Racing Tips');
                            scope.getJson();
                        }

                        if ( ++purchaseCounter >= itemsInStoreCount - 1 ) {
                            $scope.showNewsFeed = true;
                            removeAd();
                        }
                    }
                });

                store.when("NFL Tips").updated(function (p) {
                    console.log("updated NFL Tips = " + JSON.stringify(p))
                    if (p.state == 'owned') {
                        $scope.purchase['NFL Tips'].value = true;
                        if ($scope.purchase.entireapp.value != true && $scope.purchase['NFL Tips'].dirtyBit == true) {
                            $scope.changeMenu('NFL Tips');
                            scope.getJson();
                        }

                        if ( ++purchaseCounter >= itemsInStoreCount - 1 ) {
                            $scope.showNewsFeed = true;
                            removeAd();
                        }
                    }
                });

                store.when("Boxing Tips").updated(function (p) {
                    console.log("updated Boxing Tips = " + JSON.stringify(p))
                    if (p.state == 'owned') {
                        $scope.purchase['Boxing Tips'].value = true;
                        if ($scope.purchase.entireapp.value != true && $scope.purchase['Boxing Tips'].dirtyBit == true) {
                            $scope.changeMenu('Boxing Tips');
                            scope.getJson();
                        }

                        if ( ++purchaseCounter >= itemsInStoreCount - 1 ) {
                            $scope.showNewsFeed = true;
                            removeAd();
                        }
                    }
                });

                store.when("Cricket Tips").updated(function (p) {
                    console.log("updated Cricket Tips = " + JSON.stringify(p))
                    if (p.state == 'owned') {
                        $scope.purchase['Cricket Tips'].value = true;
                        if ($scope.purchase.entireapp.value != true && $scope.purchase['Cricket Tips'].dirtyBit == true) {
                            $scope.changeMenu('Cricket Tips');
                            scope.getJson();
                        }

                        if ( ++purchaseCounter >= itemsInStoreCount - 1 ) {
                            $scope.showNewsFeed = true;
                            removeAd();
                        }
                    }
                });

                store.when("Tennis Tips").updated(function (p) {
                    console.log("updated Tennis Tips = " + JSON.stringify(p))
                    if (p.state == 'owned') {
                        $scope.purchase['Tennis Tips'].value = true;
                        if ($scope.purchase.entireapp.value != true && $scope.purchase['Tennis Tips'].dirtyBit == true) {
                            $scope.changeMenu('Tennis Tips');
                            scope.getJson();
                        }

                        if ( ++purchaseCounter >= itemsInStoreCount - 1 ) {
                            $scope.showNewsFeed = true;
                            removeAd();
                        }
                    }
                });

                store.when("entireapp").updated(function (p) {
                    console.log("updated entireapp = " + JSON.stringify(p))
                    if (p.state == 'owned') {
                        $scope.purchase.entireapp.value = true;
                        for (var property in $scope.purchase) {
                            if ($scope.purchase.hasOwnProperty(property)) {
                                $scope.purchase[property].value = true;
                            }
                        }

                        if ($scope.purchase['entireapp'].dirtyBit == true) {
                            $scope.changeMenu('Football Tips');
                            scope.getJson();
                        }

                        $scope.showNewsFeed = true;
                        removeAd();
                    }
                });

                ////////////////////////////////////////////////

                $scope.startPurchase = function (item) {
                    if ( item != '5startips' ) {
                        console.log('1')
                        toggleLeft();
                    }
                    console.log("Purchase initiated");
                    //alert("Purchase initiated")
                    if ($scope.purchase[item].value != true) {
                        store.order(item);
                    }
                }

                ////////////////////////////////////////////////

                $scope.checkPurchase = function(item) {
                    if ($scope.purchase[item].value == true) {
                        $scope.changeMenu(item);
                        $scope.getJson();
                    } else {
                        $scope.purchase[item].dirtyBit = true;
                        $scope.startPurchase(item);
                    }
                }

                ///////////////////////////////////////////////

                store.when("5startips").approved(function (product) {
                    // download the feature
                    console.log("SarahA: approved 5startips = " + JSON.stringify(product));
                    product.finish()
                    popUp.close();
                });

                store.when("Horse Racing Tips").approved(function (product) {
                    // download the feature
                    console.log("SarahA: approved Horse Racing Tips = " + JSON.stringify(product));
                    product.finish()
                });

                store.when("NFL Tips").approved(function (product) {
                    // download the feature
                    console.log("SarahA: approved NFL Tips = " + JSON.stringify(product));
                    product.finish()
                });

                store.when("Boxing Tips").approved(function (product) {
                    // download the feature
                    console.log("SarahA: approved Boxing Tips = " + JSON.stringify(product));
                    product.finish()
                });

                store.when("Cricket Tips").approved(function (product) {
                    // download the feature
                    console.log("SarahA: approved Cricket Tips = " + JSON.stringify(product));
                    product.finish()
                });

                store.when("Tennis Tips").approved(function (product) {
                    // download the feature
                    console.log("SarahA: approved Tennis Tips = " + JSON.stringify(product));
                    product.finish()
                });

                store.when("entireapp").approved(function (product) {
                    // download the feature
                    console.log("SarahA: approved entireapp = " + JSON.stringify(product));
                    product.finish()
                });

                //////////////////////////////////////////////

                store.when("5startips").cancelled( function(product) {
                    $scope.purchase['5startips'].dirtyBit = false;
                })

                store.when("5startips").error( function(product) {
                    $scope.purchase['5startips'].dirtyBit = false;
                })

                store.when("Horse Racing Tips").cancelled( function(product) {
                    $scope.purchase['Horse Racing Tips'].dirtyBit = false;
                })

                store.when("Horse Racing Tips").error( function(product) {
                    $scope.purchase['Horse Racing Tips'].dirtyBit = false;
                })

                store.when("NFL Tips").cancelled( function(product) {
                    $scope.purchase['NFL Tips'].dirtyBit = false;
                })

                store.when("NFL Tips").error( function(product) {
                    $scope.purchase['NFL Tips'].dirtyBit = false;
                })

                store.when("Boxing Tips").cancelled( function(product) {
                    $scope.purchase['Boxing Tips'].dirtyBit = false;
                })

                store.when("Boxing Tips").error( function(product) {
                    $scope.purchase['Boxing Tips'].dirtyBit = false;
                })

                store.when("Cricket Tips").cancelled( function(product) {
                    $scope.purchase['Cricket Tips'].dirtyBit = false;
                })

                store.when("Cricket Tips").error( function(product) {
                    $scope.purchase['Cricket Tips'].dirtyBit = false;
                })

                store.when("Tennis Tips").cancelled( function(product) {
                    $scope.purchase['Tennis Tips'].dirtyBit = false;
                })

                store.when("Tennis Tips").error( function(product) {
                    $scope.purchase['Tennis Tips'].dirtyBit = false;
                })

                store.when("entireapp Tips").cancelled( function(product) {
                    $scope.purchase['entireapp Tips'].dirtyBit = false;
                })

                store.when("entireapp Tips").error( function(product) {
                    $scope.purchase['entireapp Tips'].dirtyBit = false;
                })
            }
            else {
                console.log("no store")
            }
        }


    }

    //$scope.$watch( function(scope) {return scope.urlArgs.winType},
    //    function() {$scope.getJson()})

    var getBadges = function() {

        if ( $cordovaNetwork.getNetwork() == Connection.NONE) {
            $cordovaDialogs.alert(wifiAlert.message, wifiAlert.title, wifiAlert.button)
            $scope.badges = "";
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
                        localStorage.setItem("totalTipsToday", data.stock[0]['TodayTotal']);
                        console.log("success==1");
                        $scope.badges = data.stock[0];
                        $scope.newsFeed = data.newsFeed;
                        //console.log($scope.badges);
                        $scope.badges.FootballTips = parseInt($scope.badges.TodayTotal) + parseInt($scope.badges.WeekTotal);
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

        if ($cordovaNetwork.isOnline() == false) {
            $cordovaDialogs.alert(wifiAlert.message, wifiAlert.title, wifiAlert.button)
            $scope.internet = false;
        } else {
        $scope.internet = true;
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


                    //console.log('$scope.accuracy = ' + JSON.stringify($scope.accuracy));
                    //console.log('$scope.accuracyOrder = ' + JSON.stringify($scope.accuracyorder));

                }
                $ionicLoading.hide();
            },
            fail: function (err) {
                $ionicLoading.hide();
            }
        });
    }
    }

    $scope.chooseLeagueStatsFunc = function(item) {
        if ($scope.chooseLeagueStatsBool == true) {
            if (typeof(item) == 'object') {
                if ($scope.stats[0].hasOwnProperty('League')) {
                    $scope.statsLeague = item.League;
                }
            }
        }
        $scope.leagueSearch = '';
            $scope.chooseLeagueStatsBool = !$scope.chooseLeagueStatsBool;
    }

    $scope.getStats = function(statsType) {
        if ($cordovaNetwork.isOnline() == false) {
            $cordovaDialogs.alert(wifiAlert.message, wifiAlert.title, wifiAlert.button)
            $scope.internet = false;
        } else {
        $scope.internet = true;
        $scope.urlArgs.statsType = statsType;

        $ionicLoading.show({
            template: 'Loading...'
        });

        $.ajax({
            type: 'GET',
            url: urlType.Stats[$scope.urlArgs.statsType].url,
            dataType: 'jsonp',
            success: function (data) {
                if (data.success == 1) {
                    $scope.stats = data.stock;
                }
                $ionicLoading.hide();
            },
            fail: function (err) {
                $ionicLoading.hide();
            }
        });
    }
    }


    $scope.changeNotifyTime = function(type) {
        switch(type) {
            case 'plusH':
                if ($scope.notifyTime.time.getHours() == 23) $scope.notifyTime.time.setHours(0);
                else $scope.notifyTime.time.setHours($scope.notifyTime.time.getHours() + 1)

                break;
            case 'minusH':
                if ($scope.notifyTime.time.getHours() == 0) $scope.notifyTime.time.setHours(23);
                else $scope.notifyTime.time.setHours($scope.notifyTime.time.getHours() - 1);
                break;
            case 'plusM':
                if ($scope.notifyTime.time.getMinutes() == 59) {
                    $scope.notifyTime.time.setMinutes(0);
                    $scope.changeNotifyTime('plusH')
                }
                else $scope.notifyTime.time.setMinutes($scope.notifyTime.time.getMinutes() + 1);
                break;
            case 'minusM':
                if ($scope.notifyTime.time.getMinutes() == 0) {
                    $scope.notifyTime.time.setMinutes(59);
                    $scope.changeNotifyTime('minusH')
                }
                else $scope.notifyTime.time.setMinutes($scope.notifyTime.time.getMinutes() - 1);
                break;
        }
        //$scope.$apply();
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

        if ($cordovaNetwork.isOnline() == false) {
            $scope.internet = false;
            $cordovaDialogs.alert(wifiAlert.message, wifiAlert.title, wifiAlert.button)
            $scope.stock[0] = '';
            $scope.filteredResult = []
        } else {
            $scope.internet = true;
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
                            //console.log(url + " === " + JSON.stringify($scope.stock[index]));
                            if ($scope.urlArgs.first == 'Football Tips') {
                                $scope.filteredResult[index] = $filter('LeagueFilter')(data.stock, $scope.selectedLeagues)
                                //console.log("filtered length = " + $scope.filteredResult[index].length + " ==== " + JSON.stringify($scope.filteredResult[index]))
                                $scope.noFilterTips = data.stock
                            }
                        } else {
                            $scope.stock[index] = ""
                            $scope.filteredResult[index] = [];
                        }
                        if (counter == countNumb) {
                            if ($scope.urlArgs.first == 'NFL Tips') {
                                //console.log('NFL...' + url + ' .... ' + JSON.stringify($scope.stock[0]))
                            }
                            $ionicLoading.hide();
                            //$cordovaToast.showLongBottom("json success")
                        }
                        $scope.$apply();
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
        } else if ( $scope.urlArgs['first'] == 'NFL Tips' || $scope.urlArgs['first'] == 'Boxing Tips' || $scope.urlArgs['first'] == 'Cricket Tips') {
            message = $scope.urlArgs['first'] + "\n\n";
            $scope.stock[0].forEach( function(record) {
                message = message + record.Match + " - " + record.Tip + " - " + record.Date + "\n\n";
            })
        }  else if ( $scope.urlArgs['first'] == 'Tennis Tips' ) {
            message = "Tennis Tips\n\n";
            $scope.stock[0].forEach( function(record) {
                message = message + record.Game + " - " + record.Tip + " - " + record.Date + "\n\n";
            })
        }

        return message;
    }


    $scope.shareMessage = function() {
        var message = ""
        if ($scope.stock != "" && $scope.stock != null) {
            //console.log("stock scope is not empty.. message.. " + JSON.stringify($scope.stock))

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

        if ($cordovaNetwork.isOnline() == false) {
            $scope.internet = false;
            $cordovaDialogs.alert(wifiAlert.message, wifiAlert.title, wifiAlert.button)
            $scope.leagues = []
            $scope.selectedLeagues = []
            $scope.changeMenu();
        } else {
            $scope.internet = true;
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
                        //console.log("selected leagues = " + $scope.selectedLeagues)
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
        //removeAd();
        //createSelectedBanner();
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
        else if (chosenMenu == 'Stats') {
            $scope.urlArgs.statsType = 'Main Table'
        }
        console.log('2')
        toggleLeft();
    }

    var toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.goBackFromChooseLeague = function() {
        $scope.leagueSearch.value = ''
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

    $scope.openPopup = function(popType) {
        $scope.popType = popType;

        if (popType == 'timePicker') {
            toggleLeft();
            $scope.notifyTime.time = new Date();
        }

        popUp = $ionicPopup.show({
            templateUrl: "templates/" + popType + ".html",
            scope: $scope
        });


    }

    $scope.closePopup = function(itemType) {
        //$scope.popType = itemType;
        console.log('inside popup.. $scope.popType = ' + $scope.popType)
        if ($scope.popType == 'timePicker') {
        //    console.log('pop time picker')
        //    if (itemType == 'Notify') {
        //        console.log('Notify');
        //        $scope.notifyTime.disable = false;
        //
        //        //$scope.updateSingleNotification = function () {
        //        //    var notifyObj = {
        //        //        id: 1,
        //        //        title: 'Title - UPDATED',
        //        //        text: 'Text - UPDATED',
        //        //        firstAt: $scope.notifyTime.schedule,
        //        //        every: 'day'
        //        //    }
        //        //
        //        //    cordova.plugins.notification.local.getTriggered(function (notifications) {
        //        //        if(notifications.length) {
        //        //            $cordovaLocalNotification.update(notifyObj).then(function (result) {
        //        //                if(result) {
        //        //                    $scope.notifyTime.schedule = $scope.notifyTime.time;
        //        //                }
        //        //            });
        //        //        } else {
        //        //            $cordovaLocalNotification.schedule(notifyObj).then(function (result) {
        //        //                if(result) {
        //        //                    $scope.notifyTime.schedule = $scope.notifyTime.time;
        //        //                }
        //        //            });
        //        //        }
        //        //    });
        //        //
        //        //};
        //
        //
        //    } else if ( itemType == 'Disable') {
        //        console.log('Disable')
        //        $scope.notifyTime.disable = true;
        //
        //        $scope.cancelAllNotifications = function () {
        //            $cordovaLocalNotification.cancelAll().then(function (result) {
        //                alert(JSON.stringify(result));
        //            });
        //        };
        //
        //    }
        //    popUp.close();
        }

        //else if ( $scope.popType == 'popStar') {
        //    if (itemType == '5 Star') {
        //        if ($scope.purchase['5startips'].value == true) {
        //            $scope.urlArgs.star = itemType;
        //            //popUp.close();
        //        } else {
        //            $scope.purchase['5startips'].dirtyBit = true;
        //            $scope.startPurchase('5startips');
        //        }
        //    } else {
        //        $scope.urlArgs.star = itemType;
        //        //popUp.close();
        //    }
        //}
    else if ( $scope.popType == 'popWin') {
            console.log('inside wintype')
            $scope.urlArgs.winType = itemType;
            $scope.getJson();
            popUp.close();
        }
        //else if ( $scope.popType == 'popStatsType') {
        //    $scope.urlArgs.statsType = itemType;
        //    popUp.close();
        //}
    }

        $scope.starSelect = function(itemType) {
            if (itemType == '5 Star') {
                if ($scope.purchase['5startips'].value == true) {
                    $scope.urlArgs.star = itemType;
                    //popUp.close();
                } else {
                    $scope.purchase['5startips'].dirtyBit = true;
                    $scope.startPurchase('5startips');
                }
            } else {
                $scope.urlArgs.star = itemType;
                //popUp.close();
            }
        }

    ///////////////////////////////// Admob code /////////////////////////////////////////


    ///////////////////////////////// Admob code ////////////////////////////////////////

    var admobid = {};
    if( /(android)/i.test(navigator.userAgent) ) {
        admobid = { // for Android
            banner: 'ca-app-pub-5631685820346651/5936544320',
            interstitial: 'ca-app-pub-6869992474017983/1657046752'
        };
    } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
        admobid = { // for iOS
            banner: ' ca-app-pub-5631685820346651/8890010721',
            interstitial: 'ca-app-pub-6869992474017983/7563979554'
        };
    } else {
        admobid = { // for Windows Phone
            banner: 'ca-app-pub-6869992474017983/8878394753',
            interstitial: 'ca-app-pub-6869992474017983/1355127956'
        };
    }

    function createSelectedBanner() {

        if ( $scope.showNewsFeed == false ) {
            //AdMob.removeBanner();
            AdMob.createBanner(
                {
                    adId:admobid.banner,
                    position : AdMob.AD_POSITION.BOTTOM_CENTER,
                    overlap:false,
                    adSize: 'SMART_BANNER',
                    isTesting: false,
                    autoShow: true
                },
                function(success) {
                    banner.created = true;
                    banner.removed = false;
                    //alert('success')
                    //AdMob.showBanner();
                    //AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER)
                }, function(failure) {
                    //alert('fail')
                }
            );

        }

    }

//
//console.log('nothinf')
//    $scope.schedule = function () {
//        console.log('inside schedule')
//        console.log('')
//
//        $cordovaLocalNotification.schedule({
//            id: 1,
//            title: 'Title here',
//            text: 'Text here',
//            data: {
//                customProperty: 'custom value'
//            }
//        }).then(function (result) {
//            console.log('RESULT')
//            console.log(JSON.stringify(result))
//        });
//
//        console.log("after schedule")
//
//
//    };

    //$scope.query = function() {
    //    console.log('querying')
    //    console.log('present = ' + JSON.stringify($cordovaLocalNotification.isPresent(1)))
    //    console.log('cheduled = ' + JSON.stringify($cordovaLocalNotification.isScheduled(1)))
    //    console.log('triggered = ' + JSON.stringify($cordovaLocalNotification.isTriggered(1)))
    //
    //}

    console.log('mmmmmio')
    $scope.rateUs = function() {
        toggleLeft();
        var customLocale = {};
        customLocale.title = "Rate CGTipster";
        customLocale.message = "Would you like to rate this app?";
        customLocale.cancelButtonLabel = "No, Thanks";
        customLocale.laterButtonLabel = "Remind Me Later";
        customLocale.rateButtonLabel = "Rate It Now";

        AppRate.preferences.storeAppURL.android = 'market://details?id=com.bigedev.cgtipster';
        AppRate.preferences.customLocale = customLocale;
        AppRate.promptForRating(true);

    }


    //var toggleNotification = function(setNotify) {
    //    console.log('toggleNotification')
    //    localStorage.setItem('notificationEnabled', setNotify)
    //    if (setNotify == 'true') {
    //        cordova.plugins.backgroundMode.enable();
    //    } else {
    //        cordova.plugins.backgroundMode.disable();
    //    }
    //}

    //var beep = function() {
    //    var snd = new Audio("appbeep.wav")
    //    snd.play();
    //}




    //// Has TO SHOW ///////////////////

    $ionicPlatform.ready(function() {



        if (localStorage.getItem('notifyH') == null) {
            console.log('notifyH == null ... first time launch')
            $scope.notifyTime.schedule.setHours(9);
            $scope.notifyTime.schedule.setMinutes(0);

        } else {
            console.log('notifyH is already set')
            $scope.notifyTime.schedule.setHours(parseInt(localStorage.getItem('notifyH')));
            $scope.notifyTime.schedule.setMinutes(parseInt(localStorage.getItem('notifyM')));
        }

        console.log('schedule variable holds: ' + $scope.notifyTime.schedule.toString())

        if (localStorage.getItem('notifyDisable') == 'true') {
            console.log("disabled is set to true")
            $scope.notifyTime.disable = true;
        }




       //////////////////////???????????????/////////////////?????????////////////////



        var notificationText = '';
        //if (localStorage.get)


            //if(localStorage.getItem('notifyH') == null) {
                //cordova.plugins.notification.local.schedule({
                //    id: 1,
                //    title: "Meeting in 15 minutes!",
                //    text: "Jour fixe Produktionsbesprechung",
                //    at: $scope.notifyTime.schedule,
                //    data: {meetingId: "#123FG8"}
                //})

                //console.log("notifyH is null")

        //cordova.plugins.notification.local.registerPermission(function (granted) {
        //    if (granted) {
        //        cordova.plugins.notification.local.schedule({
        //            id: 1,
        //            text: 'Test Message 1',
        //            icon: 'http://www.optimizeordie.de/wp-content/plugins/social-media-widget/images/default/64/googleplus.png',
        //            sound: null
        //            //data: { test: id }
        //        });
        //        console.log('granted')
        //    }
        //    else {
        //        console.log('not granted')
        //    }
        //});
            //}





        // Android customization
        //cordova.plugins.backgroundMode.setDefaults({
        //    text: 'Total tips today: ' + localStorage.getItem('totalTipsToday'),
        //    resume: true
        //});
        ////// Enable background mode
        //
        //if (!(localStorage.getItem('notificationEnabled'))) { // i.e. first time launch
        //    localStorage.setItem('notificationEnabled', 'true')
        //}
        //
        //toggleNotification(localStorage.getItem('notificationEnabled'))
        //
        //
        ////Called when background mode has been activated
        //cordova.plugins.backgroundMode.onactivate = function () {
        //    console.log('onactivate')
        //    setInterval(function () {
        //
        //        $.ajax({
        //            type: 'GET',
        //            url: urlType.Badges.url,
        //            dataType: 'jsonp',
        //            success: function (data) {
        //                if (data.success == 1) {
        //                    if (data.stock[0].hasOwnProperty('TodayTotal')) {
        //
        //                        localStorage.setItem("totalTipsToday", data.stock[0]['TodayTotal']);
        //                        console.log('Total tips today: ' + localStorage.getItem('totalTipsToday'));
        //
        //                        cordova.plugins.backgroundMode.configure({
        //                            text: 'Total tips today: ' + localStorage.getItem('totalTipsToday'),
        //                            title: 'CG Tipster'
        //                        });
        //
        //                    }
        //
        //                }
        //            },
        //            fail: function (err) {
        //                $scope.badges = "";
        //                console.log(err.message);
        //                $ionicLoading.hide();
        //                //$cordovaToast.showLongBottom("Badge fail")
        //            }
        //        });
        //
        //    }, 20000);
        //}
            //
            //cordova.plugins.backgroundMode.configure({
            //    silent: true
            //})




        ////// HAS TO SHOW //////////////////////////////////
console.log('mainctrl')
            var notificationMsg = localStorage.getItem('totalTipsToday')

            if ($cordovaNetwork.isOnline() == true) {

                initialize();
                createSelectedBanner();

            } else {
                $cordovaDialogs.confirm(wifiAlert.message, wifiAlert.title, [wifiAlert.button])
                    .then(function (buttonIndex) {
                        ionic.Platform.exitApp();
                    });
            }
    });

    ////////////?????????????????????????//////////////////////????//////////
});
