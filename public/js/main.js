var myApp = angular.module('myApp', ['ui.bootstrap', 'leaflet-directive']);

myApp.factory('UserLocationService', function($q) {
    function getUserLocation() {
        var defer = $q.defer();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function success(pos) {
                    defer.resolve({
                        'lat': pos.coords.latitude,
                        'lng': pos.coords.longitude
                    });
                }, function error() {
                    // client forbids (or is not able to) location usage
                    // so a fallback is used
                    defer.resolve(getFallbackLocation());
                });
        }

        return defer.promise;
    }

    // return service api
    return {
        getUserLocation: getUserLocation
    };
});

/**
 * Filter to use html tags
 *
 * @discussion Do not use with user input as it could be unsafe.
 */
myApp.filter('trustHtml', function($sce) {
	return function(data) {
		return $sce.trustAsHtml(data);
	};
});

/**
 * Controller for the sea list
 */
myApp.controller('SeaListCtrl', function($scope, $modal, UserLocationService) {
    var seaList = getListOfSeasWithDescription();

    var userLocation = UserLocationService.getUserLocation()
        .then(function success(res) {
            var seaListWithDistance = seaList.map(function(sea) {
                // distance calculated by long/lat in meters
                var distance = geolib.getDistance(res, sea.location);

                return {
                    'name': sea.name,
                    'description': sea.description,
                    'distance': distance / 1000
                };
            });

            $scope.seaList = seaListWithDistance;
        }, function error() {
            $scope.seaList = seaList; // no distance nor locations
        });
});

/**
 * Controller for the sea map providing a overview
 */
myApp.controller('MapCtrl', function($scope, leafletData) {
    angular.extend($scope, {
        giessen: {
            lat: 50.583732,
            lng: 8.678344,
            zoom: 11
        },
        defaults: {
            tileLayer: "https://{s}.tiles.mapbox.com/v3/foobar123.j5b19dpp/{z}/{x}/{y}.png",
            tileLayerOptions: {
                attribution: '© Mapbox © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                detectRetina: true,
                reuseTiles: true,
            }
        }
    });
});
