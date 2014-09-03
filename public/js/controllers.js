'use strict';


angular.module('badeseen.controllers', [])
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
        '$scope', 'UserLocationService', 'LakeDataProviderService', 'LatLngDistanceService',
        function($scope, UserLocationService, LakeDataProviderService, LatLngDistanceService) {
            /* Controller for the lake list */
            var lakeList = LakeDataProviderService.getListOfLakesWithDescription();

            /* jshint unused:false */
            var userLocation = UserLocationService.getUserLocation()
                .then(function success(res) {
                    var lakeListWithDistance = lakeList.map(function(lake) {
                        // distance calculated by long/lat in meters
                        var distance = LatLngDistanceService.distanceTo(res, lake.location);

                        return {
                            'name': lake.name,
                            'description': lake.description,
                            'attributes': lake.attributes,
                            'distance': distance / 1000
                        };
                    });

                    lakeListWithDistance.sort(function compare(a, b) {
                        return a.distance - b.distance;
                    });

                    $scope.lakeList = lakeListWithDistance;
                }, function error() {
                    $scope.lakeList = lakeList; // no distance nor locations
                });
        }
    ])
    .controller('MapTabCtrl', ['$scope', '$modal', 'leafletData', 'leafletEvents', 'LakeDataProviderService', 'UserLocationService', 'MAP_CENTER',
        function($scope, $modal, leafletData, leafletEvents, LakeDataProviderService, UserLocationService, MAP_CENTER) {
            /* Controller for the lake map providing an overview */
            angular.extend($scope, {
                center: MAP_CENTER,
                defaults: {
                    tileLayer: 'https://{s}.tiles.mapbox.com/v3/foobar123.j5b19dpp/{z}/{x}/{y}.png',
                    tileLayerOptions: {
                        attribution: '© Mapbox © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                        detectRetina: true,
                        reuseTiles: true,
                    }
                }
            });

            $scope.markers = LakeDataProviderService.getLakeLocationMarkers();

            var userLocationMarkerIcon = {
                'iconUrl': 'public/img/marker-red.png',
                'shadowUrl': 'public/img/marker-shadow.png',
                'iconSize': [25, 41],
                'shadowSize': [41, 41],
                'popupAnchor': [0, -39]
            };

            /* jshint unused:false */
            var userLocation = UserLocationService.getUserLocation()
                .then(function success(res) {
                    $scope.markers.userLocationMarker = {
                        'lat': res.lat,
                        'lng': res.lng,
                        'icon': userLocationMarkerIcon,
                        'message': 'Aktueller Standpunkt'
                    };
                });

            $scope.$on('leafletDirectiveMarker.click', function(event, leafletEvent) {
                if (leafletEvent.markerName !== 'userLocationMarker') {
                    /* jshint unused:false */
                    var modalInstance = $modal.open({
                        'controller': 'ModalInstanceCtrl',
                        'templateUrl': 'public/partials/lakeDescriptionModal.html',
                        'resolve': {
                            'data': function() {
                                return $scope.markers[leafletEvent.markerName].data;
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
    .controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'data',
        function($scope, $modalInstance, data) {
            $scope.data = data;
            $scope.dismiss = function() {
                $modalInstance.dismiss();
            };
        }
    ]);