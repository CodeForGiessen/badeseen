var myApp = angular.module('myApp', ['ui.bootstrap']);



myApp.controller('SeaListCtrl', function($scope, $timeout, $modal, $log) {
	$scope.seaList = getListOfSeasWithDescription();
});
