var myApp = angular.module('myApp', ['ui.bootstrap']);


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
				defer.reject();
			});
		}

		return defer.promise;
	}

	// return service api
	return {
		getUserLocation: getUserLocation
	}
});

myApp.controller('SeaListCtrl', function($scope, $timeout, $modal, $log) {
	$scope.seaList = getListOfSeasWithDescription();
});
