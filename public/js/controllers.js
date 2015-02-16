'use strict';


angular.module('badeseen.controllers', ['leaflet-directive', 'highcharts-ng'])
    .controller('TabCtrl', ['$scope', 'leafletData',
        function($scope, leafletData) {
            // when switching to the map tab invalidateMapSize() is called and
            // the map size has to be invalidated to guarantee proper displaying
            $scope.invalidateMapSize = function() {
                leafletData.getMap().then(function(map) {
                    map.invalidateSize();
                });
            };
        }
    ])
    .controller('LakeListTabCtrl', [
    '$scope', 'UserLocationService', 'LatLngDistanceService', 'FetchLakeDataService',
    function($scope, UserLocationService, LatLngDistanceService, FetchLakeDataService) {
        /* Controller for the lake list */
     
        // var lakeList = {};

        $scope.order = 'name';


       

        /* jshint unused:false */
        FetchLakeDataService.fetch().success(function(data) {

            var userLocation = UserLocationService.getUserLocation().then(function success(userPos) {

                var lakeListWithDistance = data.map(function(lake, index) {

                    // distance calculated by long/lat in meters
                    var lakePos = {
                        'latitude': lake.latitude,
                        'longitude': lake.longitude
                    };

                    var distance = LatLngDistanceService.distanceTo(userPos, lakePos);

                    return {
                        'name': lake.name,
                        'description': lake.description,
                        'attributes': lake.attributes,
                        'distance': distance / 1000
                    };

                });

                $scope.order = 'distance';
                $scope.lakeList = lakeListWithDistance;

            }, function error() {
                $scope.order = 'name';
                $scope.lakeList = data; // no distance nor locations
            });
        });
    }])
    .controller('MapTabCtrl', ['$scope', '$modal', 'leafletData', 'leafletEvents', 'UserLocationService', 'FetchLakeDataService', 'MAP_CENTER','$window','temperature' ,
        function($scope, $modal, leafletData, leafletEvents, UserLocationService, FetchLakeDataService, MAP_CENTER,$window,temperature) {
            var w = angular.element($window);
            var that = this;

            this.hasGeolocation = false;
            this.userLat = 0;
            this.userLng = 0;

            /* It is dirty to set the height of the map by this way */
            var setMapHeight = function(){
                var map = angular.element('.angular-leaflet-map');
                var height = w.height() - 91 - 52;
                map.height(height);
            };

            w.bind('resize', setMapHeight);
            setMapHeight();


            /* Controller for the lake map providing an overview */
            angular.extend($scope, {
                center: MAP_CENTER,
                markers: [],
                defaults: {
                    tileLayer: 'https://{s}.tiles.mapbox.com/v3/foobar123.j5b19dpp/{z}/{x}/{y}.png',
                    tileLayerOptions: {
                        attribution: '© Mapbox © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                        detectRetina: true,
                        reuseTiles: true,
                    }
                },
                legend: {
                    position: 'bottomright',
                    colors: [ '#ff0000', '#ff7700', '#00ff00' ],
                    labels: [ '< 18 C°', '18 C°-21 C°', '> 21 C°' ]
                },
            });

            FetchLakeDataService.fetch().success(function(data) {
                var _markers = {};

                data.forEach(function(item, index) {

                    var oldLat = item.latitude;
                    var oldLng = item.longitude;

                    delete item.longitude;
                    delete item.latitude;

                    item.lat = parseFloat(oldLat);
                    item.lng = parseFloat(oldLng);
                    item.icon = getMarkerIcon(temperature.getCurrentLakeTemperature(item));

                    _markers[index.toString()] = item;
                });

                angular.extend($scope, {
                    markers: _markers
                });
            });

            var getMarkerIcon = function(temp) {
                var marker = {
                    'shadowUrl': 'public/img/marker-shadow.png',
                    'iconSize': [42, 42],
                    'shadowSize': [42, 42],
                    'popupAnchor': [0, -39],
                    'shadowAnchor': [5, 42],
                };

                marker.iconUrl = temperature.getMarkerIconPng(temp);
                return marker;
            };

            var userLocationMarkerIcon = {
                'iconUrl': 'public/img/home.png',
                'shadowUrl': 'public/img/marker-shadow.png',
                'iconSize': [42, 42],
                // 'shadowSize': [42, 42],
                'popupAnchor': [0, -39]
            };

            UserLocationService.getUserLocation().then(function success(res) {

                var _userLocationMarker = {
                    'lat': res.lat,
                    'lng': res.lng,
                    'icon': userLocationMarkerIcon,
                    'message': 'Aktueller Standpunkt',
                    'markerName': 'home'
                };

                $scope.markers.userLocationMarker = _userLocationMarker;
                that.hasGeolocation = true;
                that.userLat = res.lat;
                that.userLng = res.lng;

            }, function() {
                console.log('error');
            });

            $scope.$on('leafletDirectiveMarker.click', function(event, leafletEvent) {
                if (leafletEvent.markerName !== 'userLocationMarker') {
                    /* jshint unused:false */
                    var modalInstance = $modal.open({
                        'controller': 'ModalInstanceCtrl',
                        'templateUrl': 'public/partials/lakeDescriptionModal.html',
                        'resolve': {
                            'data': function() {
                                return $scope.markers[leafletEvent.markerName];
                            },
                            'userGeoLoc': function() {
                                return {
                                    'hasGeolocation': that.hasGeolocation,
                                    'userLat': that.userLat,
                                    'userLng': that.userLng
                                };
                            }
                        }
                    });
                }
            });

        }
    ])
    .controller('MainCtrl', ['$scope', '$window', '$modal', 'APP_TITLE', 'FOOT_NOTICE', 'CONTRIBUTORS', 'LAB_INFO',
        function($scope, $window, $modal, APP_TITLE, FOOT_NOTICE, CONTRIBUTORS, LAB_INFO) {
            var footCols = 0;
            $window.document.title = APP_TITLE; // set page title

            $scope.title = APP_TITLE; // sets h1

            // build footer and increment column count for bootstrap grid cols
            if (FOOT_NOTICE) {
                $scope.footNotice = FOOT_NOTICE;
                footCols++;
            }

            if (CONTRIBUTORS) {
                $scope.contributors = CONTRIBUTORS;
                footCols++;
            }

            // logo and link with title
            if (LAB_INFO) {
                $scope.labInfo = LAB_INFO;
                footCols++;
            }

            if (footCols > 0) {
                $scope.footerColumns = (12 / footCols); // FIXME: what about 5, 7 and so on?
            } else {
                $scope.footerCloumns = 1;
            }

            // show help modal
            $scope.showHelpModal = function() {
                console.log('show modal');
                /* jshint unused:false */
                var modalInstance = $modal.open({
                    'controller': 'ModalInstanceCtrl',
                    'templateUrl': 'public/partials/faq.html',
                    'resolve': {
                        'data': function() {
                            return null;
                        },
                        'userGeoLoc': function() {
                            return {
                               'hasGeolocation': false
                            };
                        }
                    }
                });
            };
        }
    ])
    .controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'data', 'userGeoLoc','$timeout', 'temperature',
        function($scope, $modalInstance, data, userGeoLoc,$timeout,temperature) {
            $scope.data = data;
            if(data){
                $scope.currentWaterTemperature = temperature.getCurrentLakeTemperature(data);
                $scope.currentWaterTemperatureClass = temperature.getColorClass($scope.currentWaterTemperature);

                var dayOfTheWeek = ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'];

                $scope.lastSevenDays = [];

                var sortedWeek = [];
                var today = new Date().getDay();
                for(var i = 6; i>=0;i--){
                    sortedWeek.push(dayOfTheWeek[(i + today)%7]);
                    $scope.lastSevenDays.push((i % 2 === 0)? $scope.currentWaterTemperature + i:$scope.currentWaterTemperature - i);
                }

                $scope.weekTempChartConfig = {
                    'options': {
                        'chart': {
                            'type': 'areaspline'
                        },
                        'plotOptions': {
                            'series': {
                                'stacking': ''
                            }
                        }

                    },
                    'yAxis': {
                        title: {
                            text: 'C°'
                        }
                    },
                    'xAxis': {
                        categories: sortedWeek
                    },
                    'series': [
                    {
                        'data': $scope.lastSevenDays,
                        'id': 'series-0',
                        'type': 'spline'
                    }
                    ],
                    'title': {
                        'text': 'Temperatur der letzten 7 Tage'
                    },
                    'credits': {
                        'enabled': true
                    },
                    'loading': false,
                    func: function(chart){
                        $timeout(function(){
                            chart.reflow();
                        },1);
                    }
                };

                if(userGeoLoc.hasGeolocation) {
                    $scope.hasGeolocation = userGeoLoc.hasGeolocation;
                    $scope.userLat = userGeoLoc.userLat;
                    $scope.userLng = userGeoLoc.userLng;
                } 
            }

            $scope.dismiss = function() {
                $modalInstance.dismiss();
            };
    }
    ]);