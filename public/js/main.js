var myApp = angular.module('myApp', ['ui.bootstrap', 'leaflet-directive']);

myApp.factory('UserLocationService', function($q) {
	var location;

	function getUserLocation() {
		var defer = $q.defer();

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				function success(pos) {
				defer.resolve({
					'lat' : pos.coords.latitude,
					'lng' : pos.coords.longitude
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
	}
});

myApp.controller('SeaListCtrl', function($scope, $modal, UserLocationService) {
	var seaList = getListOfSeasWithDescription();

	var userLocation = UserLocationService.getUserLocation()
	.then(function success(res) {
		var seaListWithDistance = seaList.map(function(sea) {
			// distance calculated by long/lat in meters
			var distance = geolib.getDistance(res, sea.location);

			return {
				'name': sea.name,
				'description' : sea.description,
				'distance' : distance / 1000
			}
		});

		$scope.seaList = seaListWithDistance;
	}, function error() {
		$scope.seaList = seaList; // no distance nor locations
	});
});

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
