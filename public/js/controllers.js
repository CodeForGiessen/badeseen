/*jslint node: true */
'use strict';


angular.module('myApp.controllers', [])
    .controller('LakeListCtrl', [
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

                    $scope.lakeList = lakeListWithDistance;
                }, function error() {
                    $scope.lakeList = lakeList; // no distance nor locations
                });
        }
    ])
    .controller('MapCtrl', ['$scope', '$modal', 'leafletData', 'leafletEvents', 'LakeDataProviderService',
        function($scope, $modal, leafletData, leafletEvents, LakeDataProviderService) {
            /* Controller for the lake map providing an overview */
            angular.extend($scope, {
                giessen: {
                    lat: 50.583732,
                    lng: 8.678344,
                    zoom: 11
                },
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

            $scope.$on('leafletDirectiveMarker.click', function(event, leafletEvent) {
                /* jshint unused:false */
                var modalInstance = $modal.open({
                    controller: 'ModalInstanceCtrl',
                    templateUrl: 'public/partials/lakeDescriptionModal.html',
                    resolve: {
                        data: function() {
                            return $scope.markers[leafletEvent.markerName].data;
                        }
                    }
                });
            });
        }
    ])
    .controller('MainCtrl', ['$scope', '$window', 'appTitle', 'footNotice', 'contributors', 'labInfo',
        function($scope, $window, appTitle, footNotice, contributors, labInfo) {
            var footCols = 0;
            $window.document.title = appTitle; // set page title

            $scope.title = appTitle; // sets h1

            // build footer and increment column count for bootstrap grid cols
            $scope.footNotice = footNotice;
            footCols++;

            $scope.contributors = contributors;
            footCols++;

            // logo and link with title
            $scope.labInfo = labInfo;
            footCols++;

            if (footCols > 0) {
                $scope.footerColumns = (12 / footCols); // FIXME: what about 5, 7 and so on?
            } else {
                $scope.footerCloumns = 1;
            }
        }
    ])
    .controller('ModalInstanceCtrl', ['$scope', 'data',
        function($scope, data) {
            $scope.data = data;
        }
    ]);
