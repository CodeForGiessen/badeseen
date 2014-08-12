'use strict';


angular.module('myApp.services', [])
    .factory('UserLocationService', ['$q',
        function($q) {
            /**
             * Return location of Gießen city
             * @return {Object} Location given by latitude and longitude wrapped
             * by an object
             */
            function getFallbackLocation() {
                return {
                    'lat': 50.583732,
                    'lng': 8.678344
                };
            }

            /**
             * Get user location by querying navigator.geolocation
             *
             * @discussion Given the asynchronic nature of geolocation
             * this function returns a promise object to use like 
             * `getUserLocation().then(doSmth(result));` with result holding
             * the obtained location. If the user location
             * couldn’t be obtained a fallback location will be returned.
             *
             * @see `MapCtrl` controller or angular
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
                            defer.resolve(getFallbackLocation());
                        });
                }

                return defer.promise;
            }

            // return service api
            return {
                getFallbackLocation: getFallbackLocation,
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
    .factory('SeaDataProviderService', function() {
        /**
         * Return list of seas
         *
         * @discussion Each sea object has a unique name and a brief description
         * to display.
         *
         * @return {Array of Objects} Array of sea objects
         */
        function getListOfSeasWithDescription() {
            return [{
                'name': 'Dutenhofener See',
                'description': '<em>John Maynard!</em><br>„Wer ist John Maynard?“<br>„John Maynard war unser Steuermann,<br>aushielt er, bis er das Ufer gewann,<br>er hat uns gerettet, er trägt die Kron’,<br>er starb für uns, unsre Liebe sein Lohn.<br>John Maynard.“',
                'location': {
                    'lat': 50.566840,
                    'lng': 8.610034
                },
                'attributes': [
                    '<span class="fa-stack fa-lg" title="nicht mit dem Auto erreichbar"><i class="fa fa-car fa-stack-1x"></i><i class="fa fa-ban fa-stack-2x text-danger"></i></span>',
                    '<span class="fa-stack fa-lg" title="nicht für Kinder geeignet"><i class="fa fa-child fa-stack-1x"></i><i class="fa fa-ban fa-stack-2x text-danger"></i></span>'
                ]
            }, {
                'name': 'Silbersee',
                'description': 'Wo ist Alfons gleich, der Fuhrherr?<br>Kommt das je ans Sonnenlicht?<br>Wer es immer wissen könnte<br>Mackie Messer weiss es nicht.',
                'location': {
                    'lat': 50.617841,
                    'lng': 8.673892
                },
                'attributes': [
                    '<span class="fa fa-eur fa-2x fa-fw" title="kostet Eintritt"></span>',
                    '<span class="fa fa-life-ring fa-2x fa-fw" title="überwacht"></span>',
                    '<span class="fa fa-child fa-2x fa-fw" title="für Kinder geeignet"></span>'
                ]
            }];
        }

        /**
         * Get location objects to populate map markers
         * @return {Object} Latitude and longitude of seas (approx.)
         */
        function getSeaLocationMarkers() {
            var ret = {};
            var seas = getListOfSeasWithDescription();
            var i;

            for (i = 0; i < seas.length; i++) {
                var sea = seas[i];

                ret[sea.name.replace(/ /g, '') + 'Marker'] = {
                    'lat': sea.location.lat,
                    'lng': sea.location.lng
                };
            }

            return ret;
        }

        // return service api
        return {
            getListOfSeasWithDescription: getListOfSeasWithDescription,
            getSeaLocationMarkers: getSeaLocationMarkers
        };
    });
