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
    .factory('LakeDataProviderService', function() {
        /**
         * Return list of lakes
         *
         * @discussion Each lake object has a unique name and a brief description
         * to display.
         *
         * @return {Array of Objects} Array of lake objects
         */
        function getListOfLakesWithDescription() {
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
                'name': 'Silbersee (Launsheim)',
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
            }, {
                'name': 'Waldschwimbad Lich',
                'description': 'Alle Herzen sind froh, alle Herzen sind frei<br>- da klingt’s aus dem Schiffsraum her wie Schrei,<br>"Feuer!" war es, was da klang,<br>ein Qualm aus Kajüt und Luke drang,<br>ein Qualm, dann Flammen lichterloh,<br>und noch zwanzig Minuten bis Buffalo.',
                'location': {
                    'lat': 50.533900,
                    'lng': 8.809018
                },
                'attributes': []
            }, {
                'name': 'Der unterste Teich (Lich)',
                'description': 'Das Schiff geborsten. Das Feuer verschwelt.<br>Gerettet alle. Nur einer fehlt!',
                'location': {
                    'lat': 50.530531,
                    'lng': 8.813159
                },
                'attributes': []
            }, {
                'name': 'Wißmarer See',
                'description': 'Und der Haifisch, der hat Zähne<br>Und die trägt er im Gesicht<br>Und Macheath, der hat ein Messer<br>Doch das Messer sieht man nicht.',
                'location': {
                    'lat': 50.641781,
                    'lng': 8.691311
                },
                'attributes': []
            }, {
                'name': 'Heuchelheimer Surfsee',
                'description': 'An der Themse grünem Wasser<br>Fallen plötzlich Leute um<br>Es ist weder Pest noch Cholera<br>Doch es heisst: Mackie geht um.',
                'location': {
                    'lat': 50.568407,
                    'lng': 8.619719
                },
                'attributes': []
            }, {
                'name': 'Heuchelheimer Südsee',
                'description': '',
                'location': {
                    'lat': 50.565681,
                    'lng': 8.625298
                },
                'attributes': []
            }, {
                'name': 'Seepark Niederweimar',
                'description': '"Noch da, John Maynard?"<br>Und Antwort schallt’s mit ersterbender Stimme:<br>"Ja, Herr, ich halt’s!"<br>Und in die Brandung, was Klippe, was Stein,<br>jagt er die "Schwalbe" mitten hinein.<br>Soll Rettung kommen, so kommt sie nur so.<br>Rettung: der Strand von Buffalo!',
                'location': {
                    'lat': 50.760924,
                    'lng': 8.742219
                },
                'attributes': []
            }, {
                'name': 'Mengelshäuser Teiche',
                'description': 'Alle Glocken gehn;<br>ihre Töne schwell’n himmelan<br>aus Kirchen und Kapell’n,<br>ein Klingen und Läuten,<br>sonst schweigt die Stadt,<br>ein Dienst nur, den sie heute hat:<br>Zehntausend folgen oder mehr,<br>und kein Aug’ im Zuge,<br>das tränenleer.',
                'location': {
                    'lat': 50.526720,
                    'lng': 8.778608
                },
                'attributes': []
            }];
        }

        /**
         * Get location objects to populate map markers
         * @return {Object} Latitude and longitude of lakes (approx.)
         */
        function getLakeLocationMarkers() {
            var ret = {};
            var lakes = getListOfLakesWithDescription();

            for (var i = 0; i < lakes.length; i++) {
                var lake = lakes[i];

                ret[lake.name.replace(/[ _\W]/g, '') + 'Marker'] = {
                    'lat': lake.location.lat,
                    'lng': lake.location.lng,
                    'data': {
                        'name': lake.name,
                        'description': lake.description,
                        'attributes': lake.attributes
                    }
                };
            }

            return ret;
        }

        // return service api
        return {
            getListOfLakesWithDescription: getListOfLakesWithDescription,
            getLakeLocationMarkers: getLakeLocationMarkers
        };
    });
