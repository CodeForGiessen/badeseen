'use strict';


angular.module('badeseen.controllers', ['leaflet-directive'])
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

        $scope.order = 'name';

        var lakeList = {};

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
    .controller('MapTabCtrl', ['$scope', '$modal', 'leafletData', 'leafletEvents', 'UserLocationService', 'FetchLakeDataService', 'MAP_CENTER',
        function($scope, $modal, leafletData, leafletEvents, UserLocationService, FetchLakeDataService, MAP_CENTER) {

            this.hasGeolocation = false;
            this.userLat = 0;
            this.userLng = 0;

            var that = this;

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
                }
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
                    item.icon = getMarkerIcon(item.measurements[0].water_itemperature);

                    _markers[index.toString()] = item;
                });

                angular.extend($scope, {
                    markers: _markers
                });
            });

            var getMarkerIcon = function(temperature) {
                var marker = {
                    'shadowUrl': 'public/img/marker-shadow.png',
                    'iconSize': [42, 42],
                    'shadowSize': [42, 42],
                    'popupAnchor': [0, -39]
                };
                if(temperature < 15 ) {
                    marker.iconUrl = 'public/img/marker_red.png';
                } else if(temperature >=15 && temperature < 20) {
                    marker.iconUrl = 'public/img/marker_orange.png';
                } else {
                    marker.iconUrl = 'public/img/marker_green.png';
                }
                return marker;
            };

            var userLocationMarkerIcon = {
                'iconUrl': 'public/img/home.png',
                'shadowUrl': 'public/img/marker-shadow.png',
                'iconSize': [42, 42],
                'shadowSize': [42, 42],
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
                /* jshint unused:false */
                var modalInstance = $modal.open({
                    'controller': 'ModalInstanceCtrl',
                    'templateUrl': 'public/partials/faq.html',
                    'resolve': {
                        'data': function() {
                            return null;
                        }
                    }
                });
            };
        }
    ])
    .controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'data', 'userGeoLoc',
        function($scope, $modalInstance, data, userGeoLoc) {
            $scope.data = data;
            if(userGeoLoc.hasGeolocation) {
                $scope.hasGeolocation = userGeoLoc.hasGeolocation;
                $scope.userLat = userGeoLoc.userLat;
                $scope.userLng = userGeoLoc.userLng;
            }
            $scope.dismiss = function() {
                $modalInstance.dismiss();
            };
        }
    ]);