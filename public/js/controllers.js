/*jslint node: true */
'use strict';


angular.module('myApp.controllers', [])
    .controller('SeaListCtrl', [
        '$scope', 'UserLocationService', 'SeaDataProviderService', 'LatLngDistanceService',
        function($scope, UserLocationService, SeaDataProviderService, LatLngDistanceService) {
            /* Controller for the sea list */
            var seaList = SeaDataProviderService.getListOfSeasWithDescription();

            /* jshint unused:false */
            var userLocation = UserLocationService.getUserLocation()
                .then(function success(res) {
                    var seaListWithDistance = seaList.map(function(sea) {
                        // distance calculated by long/lat in meters
                        var distance = LatLngDistanceService.distanceTo(res.lat, res.lng, sea.location.lat, sea.location.lng);

                        return {
                            'name': sea.name,
                            'description': sea.description,
                            'attributes': sea.attributes,
                            'distance': distance / 1000
                        };
                    });

                    $scope.seaList = seaListWithDistance;
                }, function error() {
                    $scope.seaList = seaList; // no distance nor locations
                });
        }
    ])
    .controller('MapCtrl', ['$scope', 'leafletData', 'SeaDataProviderService',
        function($scope, leafletData, SeaDataProviderService) {
            /* Controller for the sea map providing an overview */
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
            $scope.markers = SeaDataProviderService.getSeaLocationMarkers();
        }
    ]);
