'use strict';


/**
 * Filter to use html tags
 *
 * @discussion Do not use with user input as it could be unsafe.
 */
angular.module('myApp.filters', [])
    .filter('trustHtml', ['$sce',
        function($sce) {
            return function(text) {
                return $sce.trustAsHtml(text);
            };
        }
    ]);
