'use strict';


angular.module('badeseen.services', [])
    .factory('UserLocationService', ['$q', 'FALLBACK_MARKER',
        function($q, FALLBACK_MARKER) {
            /**
             * Get user location by querying navigator.geolocation
             *
             * @discussion Given the asynchronic nature of geolocation
             * this function returns a promise object to use like
             * `getUserLocation().then(doSmth(result));` with result holding
             * the obtained location. If the user location
             * couldn’t be obtained a fallback location will be returned.
             *
             * @see `MapTabCtrl` controller or angular
             * @see https://docs.angularjs.org/api/ng/service/$q
             *
             * @return {Object} Angular.js promise object
             */
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
                            defer.reject(FALLBACK_MARKER);
                        });
                }

                return defer.promise;
            }

            // return service api
            return {
                getUserLocation: getUserLocation
            };
        }
    ])
    .factory('LatLngDistanceService', function() {
        /**
         * Return distance in meters between 2 points
         *
         * @discussion the points should at least have the 2
         * attributes `lat` giving the latitude and `lng` giving the
         * longitude of the point.
         *
         * @param  {[type]} point1 first point
         * @param  {[type]} point2 second point
         * @return {[type]}        distance in meters
         */
        function distanceTo(point1, point2) {
            return geolib.getDistance(point1, point2);
        }

        // return service api
        return {
            distanceTo: distanceTo
        };
    })
    // .factory('LakeDataProviderService',[function() {

    //     /**
    //      * Get location objects to populate map markers
    //      * @return {Object} Latitude and longitude of lakes (approx.)
    //      */
    //     function getLakeLocationMarkers(array) {
    //         var ret = {};

    //         for (var i = 0; i < lakes.length; i++) {
    //             var lake = lakes[i];

    //             ret[lake.name.replace(/[ _\W]/g, '') + 'Marker'] = {
    //                 'lat': lake.location.lat,
    //                 'lng': lake.location.lng,
    //                 'data': {
    //                     'name': lake.name,
    //                     'description': lake.description,
    //                     'attributes': lake.attributes
    //                 }
    //             };
    //         }

    //         return ret;
    //     }

    //     // return service api
    //     return {
    //         getListOfLakesWithDescription: getListOfLakesWithDescription,
    //         getLakeLocationMarkers: getLakeLocationMarkers
    //     };
    // }])
    .factory('FetchLakeDataService',['$http',
        function($http) {
            return {
                fetch: function() {
                    return $http.get('public/data/badeseen.json');
                }
            };
    }]);

